import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LoginPage } from './views/LoginPage';
import Homepage from './views/Homepage';
import { DashboardLayout } from './components/DashboardLayout';
import { AuthProvider, RequireAuth } from './services/AuthContext';
import Settings from './views/Settings';
import QuizHomepage from './views/QuizHomepage';
import Dictionary from './views/Dictionary';
import Tools from './views/Tools';
import Quiz from './views/Quiz';
import { LayoutProvider } from './data/LayoutProvider';
import Grammar from './views/Grammar';

function App() {
    return (
        <AuthProvider>
            <LayoutProvider>
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
                            <Route path="/quiz-select" element={<QuizHomepage />} />
                            <Route path="/quiz" element={<Quiz />} />
                            <Route path="/dictionary" element={<Dictionary />} />
                            <Route path="/tools" element={<Tools />} />
                            <Route path="/grammar" element={<Grammar />} />
                            <Route path="/*" element={<Homepage />} />
                        </Route>
                        <Route path="/login" element={<LoginPage />} />
                    </Route>
                </Routes>
            </LayoutProvider>
        </AuthProvider>
    );
}

export default App;
