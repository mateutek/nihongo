import React, { useEffect, useMemo } from 'react';
import { auth, db } from '../services/firebase';
import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import { collection, query, updateDoc, where } from 'firebase/firestore';

export type Settings = {
    showRomaji: boolean;
    kanjiPriority: boolean;
    startingQuestions: number;
    defaultInput: boolean;
};

interface SettingsContextType {
    userSettings: Settings;
    saveSetting: (settings: Partial<Settings>) => void;
}

const defaultSettings: Settings = {
    kanjiPriority: false,
    showRomaji: true,
    startingQuestions: 40,
    defaultInput: false,
};

let SettingsContext = React.createContext<SettingsContextType>(null!);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    let [userSettings, setUserSettings] = React.useState<Settings>(defaultSettings);
    const uid = auth.currentUser?.uid;
    const userCollection = useMemo(() => (uid ? query(collection(db, 'users'), where('uid', '==', uid)) : null), [uid]);
    const [userData] = useCollectionOnce(userCollection);

    useEffect(() => {
        if (userData?.docs[0].data()) {
            setUserSettings(userData?.docs[0].data().settings);
        }
    }, [userData]);

    const saveSetting = async (newSetting: Partial<Settings>) => {
        if (userData) {
            await updateDoc(userData?.docs[0].ref, {
                settings: { ...userSettings, ...newSetting },
            });
            setUserSettings({ ...userSettings, ...newSetting });
        }
    };

    let value = { userSettings, saveSetting };

    return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
    return React.useContext(SettingsContext);
}
