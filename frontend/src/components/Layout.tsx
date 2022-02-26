import React, { FunctionComponent } from 'react';
import { Outlet } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

type LayoutProps = {};
const theme = createTheme();
export const Layout: FunctionComponent<LayoutProps> = (props) => {
    return (
        <ThemeProvider theme={theme}>
            <Outlet />
        </ThemeProvider>
    );
};
