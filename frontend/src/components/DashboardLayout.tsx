import React, {FunctionComponent} from 'react';
import {Outlet} from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { DataProvider } from '../data/DataProvider';
import { Navigation } from "./Navigation";

const mdTheme = createTheme();

type DashboardLayoutProps = {};
export const DashboardLayout: FunctionComponent<DashboardLayoutProps> = (props) => {
  return (
    <DataProvider>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Navigation/>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Outlet/>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </DataProvider>
  );
}

