import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { auth, db } from './firebase';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

interface AuthContextType {
    user: any;
    loading: boolean;
    error: any;
    signInWithGoogle: () => Promise<void>;
    signin: (username: string, password: string, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);
const googleProvider = new GoogleAuthProvider();

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, loading, error] = useAuthState(auth);

    const signInWithGoogle = async () => {
        try {
            const res = await signInWithPopup(auth, googleProvider);
            const user = res.user;
            const q = query(collection(db, 'users'), where('uid', '==', user.uid));
            const docs = await getDocs(q);
            if (docs.docs.length === 0) {
                const cardsStorage = await addDoc(collection(db, 'cardsStorage'), {
                    owner: user.uid,
                    levels: {
                        0: [],
                        1: [],
                        2: [],
                        3: [],
                        4: [],
                        5: [],
                    },
                });
                await addDoc(collection(db, 'users'), {
                    uid: user.uid,
                    name: user.displayName,
                    authProvider: 'google',
                    email: user.email,
                    cardsStorageId: cardsStorage.id,
                    settings: {
                        showRomaji: false,
                        kanjiPriority: false,
                        startingQuestions: 40,
                    },
                });
            }
        } catch (err: any) {
            console.error(err);
            alert(err.message);
        }
    };

    let signin = async (username: string, password: string, callback: VoidFunction) => {
        try {
            await signInWithEmailAndPassword(auth, username, password);
            callback();
        } catch (err: any) {
            console.error(err);
            alert(err.message);
        }
    };

    let signout = (callback: VoidFunction) => {
        signOut(auth);
        callback();
    };

    let value = { user, signin, signout, signInWithGoogle, loading, error };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return React.useContext(AuthContext);
}

export function RequireAuth({ children }: { children: JSX.Element }) {
    let { user } = useAuth();
    let location = useLocation();

    if (!user) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}
