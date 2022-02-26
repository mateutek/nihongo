import React, { useEffect } from 'react';

export type Settings = {
    showRomaji: boolean;
    kanjiPriority: boolean;
};

interface SettingsContextType {
    userSettings: Settings;
    saveSetting: (settings: Partial<Settings>) => void;
}

const defaultSettings: Settings = {
    kanjiPriority: false,
    showRomaji: true,
};

let SettingsContext = React.createContext<SettingsContextType>(null!);

const settingsKey = '@NIHONGO_SETTINGS';

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    let [userSettings, setUserSettings] = React.useState<Settings>(() => {
        const loadedSettings = localStorage.getItem(settingsKey) || '{}';
        return { ...defaultSettings, ...JSON.parse(loadedSettings) };
    });

    useEffect(() => {
        if (!localStorage.getItem(settingsKey)) {
            saveSetting(userSettings);
        }
    }, []);

    const saveSetting = (newSetting: Partial<Settings>) => {
        const newSettings = { ...userSettings, ...newSetting };
        setUserSettings(newSettings);
        localStorage.setItem(settingsKey, JSON.stringify(newSettings));
    };

    let value = { userSettings, saveSetting };

    return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
    return React.useContext(SettingsContext);
}
