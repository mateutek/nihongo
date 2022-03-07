import React, { FunctionComponent } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { DataProvider } from '../data/DataProvider';
import { Navigation } from './Navigation';
import { SettingsProvider } from '../data/SettingsProvider';
import { useLayout } from '../data/LayoutProvider';

const mdTheme = createTheme();

type DashboardLayoutProps = {};
export const DashboardLayout: FunctionComponent<DashboardLayoutProps> = (props) => {
    const location = useLocation();
    const { fabContainerRef } = useLayout();

    return (
        <SettingsProvider>
            <DataProvider>
                <ThemeProvider theme={mdTheme}>
                    <Box sx={{ display: 'flex' }}>
                        <CssBaseline />
                        <Navigation />
                        <Box
                            component="main"
                            sx={{
                                backgroundColor: (theme) =>
                                    location.pathname.indexOf('dictionary') > -1
                                        ? theme.palette.common.white
                                        : theme.palette.mode === 'light'
                                        ? theme.palette.grey[100]
                                        : theme.palette.grey[900],
                                flexGrow: 1,
                                minHeight: '100vh',
                                position: 'relative',
                            }}
                        >
                            <Toolbar />
                            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                                <Outlet />
                            </Container>
                            <Box
                                sx={{ position: 'absolute', bottom: 0, right: 0, mr: 4, mb: 4 }}
                                ref={fabContainerRef}
                            />
                        </Box>
                    </Box>
                </ThemeProvider>
            </DataProvider>
        </SettingsProvider>
    );
};
