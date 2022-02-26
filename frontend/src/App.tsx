import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LoginPage } from './views/LoginPage';
import Homepage from './views/Homepage';
import { DashboardLayout } from './components/DashboardLayout';
import { AuthProvider, RequireAuth } from './services/AuthContext';
import Settings from './views/Settings';

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route element={<Layout />}>
                    <Route
                        element={
                            <RequireAuth>
                                <DashboardLayout />
                            </RequireAuth>
                        }
                    >
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/*" element={<Homepage />} />
                    </Route>
                    <Route path="/login" element={<LoginPage />} />
                </Route>
            </Routes>
        </AuthProvider>
    );
}

export default App;
