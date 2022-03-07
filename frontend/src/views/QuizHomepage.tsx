import Grid from '@mui/material/Grid';
import React from 'react';
import { Paper, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { NumberOfQuestions } from '../components/NumberOfQuestions';

export default function QuizHomepage() {
    const [lessons, setLessons] = React.useState(() => [1, 2]);

    const handleFormat = (event: React.MouseEvent<HTMLElement>, newFormats: number[]) => {
        setLessons(newFormats);
    };
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={3}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                        Wybierz zakres
                    </Typography>
                    <Typography component="span" variant="subtitle1" color="error" textAlign="center" gutterBottom>
                        na razie nie działa
                    </Typography>
                    <ToggleButtonGroup
                        value={lessons}
                        onChange={handleFormat}
                        size="small"
                        color="primary"
                        orientation="vertical"
                    >
                        <ToggleButton value={1}>Lekcja 1</ToggleButton>
                        <ToggleButton value={2}>Lekcja 2</ToggleButton>
                        <ToggleButton value={3}>Lekcja 3</ToggleButton>
                        <ToggleButton value={4}>Lekcja 4</ToggleButton>
                        <ToggleButton value={5}>Lekcja 5</ToggleButton>
                        <ToggleButton value={6}>Lekcja 6</ToggleButton>
                        <ToggleButton value={7}>Lekcja 7</ToggleButton>
                    </ToggleButtonGroup>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={6}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <NumberOfQuestions maxQuestions={250} />
                </Paper>
            </Grid>
        </Grid>
    );
}
