import React, { FunctionComponent } from 'react';
import { Divider, ListItemButton, ListItemText, Paper, Typography } from '@mui/material';
import List from '@mui/material/List';

type LinksProps = {};

const usefulLinks = [
    {
        id: 1,
        href: 'https://jisho.org/',
        primary: 'jisho.org',
        secondary: 'Słownik Ang <-> Jap',
    },
];

export const Links: FunctionComponent<LinksProps> = (props) => {
    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Przydatne linki
            </Typography>
            <List sx={{ width: '100%' }}>
                {usefulLinks.map((link) => (
                    <>
                        <ListItemButton component="a" href={link.href} rel="nofollow noreferrer" target="_blank">
                            <ListItemText primary={link.primary} secondary={link.secondary} />
                        </ListItemButton>
                        <Divider component="li" />
                    </>
                ))}
            </List>
        </Paper>
    );
};
