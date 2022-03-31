import React, { FunctionComponent } from 'react';
import { Outlet } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Backdrop, CircularProgress } from '@mui/material';
import { useLayout } from '../data/LayoutProvider';

type LayoutProps = {};
const theme = createTheme();
export const Layout: FunctionComponent<LayoutProps> = (props) => {
    const { isLoading } = useLayout();
    return (
        <ThemeProvider theme={theme}>
            <Outlet />
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </ThemeProvider>
    );
};
