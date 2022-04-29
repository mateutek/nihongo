import Grid from '@mui/material/Grid';
import React from 'react';
import { Button, Divider, Paper, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { NumberOfQuestions } from '../components/NumberOfQuestions';
import { useData } from '../data/DataProvider';

export default function QuizHomepage() {
    const { tags, pickTags, maxQuestions, pickAllTags, deselectAllTags } = useData();
    const handleFormat = (event: React.MouseEvent<HTMLElement>, newTags: string[]) => {
        pickTags(newTags);
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
                    <ToggleButtonGroup
                        value={tags}
                        onChange={handleFormat}
                        size="small"
                        color="primary"
                        orientation="vertical"
                    >
                        <ToggleButton value="lesson 1">Lekcja 1</ToggleButton>
                        <ToggleButton value="lesson 2">Lekcja 2</ToggleButton>
                        <ToggleButton value="lesson 3">Lekcja 3</ToggleButton>
                        <ToggleButton value="lesson 4">Lekcja 4</ToggleButton>
                        <ToggleButton value="lesson 5">Lekcja 5</ToggleButton>
                        <ToggleButton value="lesson 6">Lekcja 6</ToggleButton>
                        <ToggleButton value="lesson 7">Lekcja 7</ToggleButton>
                        <ToggleButton value="lesson 8">Lekcja 8</ToggleButton>
                        <ToggleButton value="lesson 9">Lekcja 9</ToggleButton>
                        <ToggleButton value="lesson 10">Lekcja 10</ToggleButton>
                    </ToggleButtonGroup>
                    <Divider />
                    <Button
                        onClick={() => {
                            pickAllTags();
                        }}
                    >
                        Zaznacz wszystkie
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            deselectAllTags();
                        }}
                    >
                        Odznacz wszystkie
                    </Button>
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
                    <NumberOfQuestions maxQuestions={maxQuestions} />
                </Paper>
            </Grid>
        </Grid>
    );
}
