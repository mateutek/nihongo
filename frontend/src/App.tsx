import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import {LoginPage} from './views/LoginPage';
import Homepage from './views/Homepage';
import {DashboardLayout} from './components/DashboardLayout';
import { AuthProvider, RequireAuth } from "./services/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<DashboardLayout />}>
            <Route
              path="/*"
              element={
                <RequireAuth>
                  <Homepage />
                </RequireAuth>
              }
            />
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
