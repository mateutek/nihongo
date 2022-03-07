import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Paper, Stack, Typography } from '@mui/material';

export default function Homepage() {
    return (
        <Paper
            sx={{
                p: 2,
            }}
        >
            <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
                Nihongo
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
                Cobaltum, elogium, et historia.Fortis classiss ducunt ad vigil.Ubi est camerarius animalis? Est nobilis
                accola, cesaris.Luna albus humani generis est.
            </Typography>
            <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
                <Button component={RouterLink} to="/quiz-select" variant="contained">
                    Quiz
                </Button>
                <Button component={RouterLink} to="/dictionary" variant="outlined">
                    Słownik
                </Button>
            </Stack>
        </Paper>
    );
}
