import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import { useData } from '../data/DataProvider';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { renderRomaji } from '../helpers/helpers';
import _ from 'lodash';
import { Chip, Fab, Portal, Tooltip, useTheme, Zoom } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useLayout } from '../data/LayoutProvider';

function questionColor(total: number) {
    switch (total) {
        case 1:
        case 2:
            return 'success.main';
        case 3:
            return 'warning.main';
        case 4:
            return 'error.main';
        default:
            return 'info.main';
    }
}

type totalColors = 'error' | 'info' | 'success' | 'warning' | 'primary';

function totalColor(total: number) {
    let color: totalColors;
    if (total >= 0.3) {
        color = 'warning';
    } else if (total >= 0.5) {
        color = 'info';
    } else if (total >= 0.8) {
        color = 'success';
    } else {
        color = 'primary';
    }
    return color;
}

export default function QuizEnd() {
    const navigate = useNavigate();
    const { pickedFlashcards } = useData();
    const [total, setTotal] = useState({ score: 0, time: 0, totalPercentage: 0 });
    const { fabContainerRef } = useLayout();

    const theme = useTheme();

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    useEffect(() => {
        if (pickedFlashcards.length === 0) {
            navigate('/quiz-select');
        } else {
            const newTotal = pickedFlashcards.reduce(
                (total, currentValue) => {
                    total.time += currentValue.time;
                    total.score += currentValue.tries;
                    return total;
                },
                { score: 0, time: 0, totalPercentage: 0 },
            );
            newTotal.totalPercentage = _.round(pickedFlashcards.length / newTotal.score, 2) * 100;
            setTotal(newTotal);
        }
    }, [pickedFlashcards, navigate]);
    return (
        <>
            <Grid container spacing={3}>
                <Grid
                    item
                    xs={12}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}
                >
                    <Typography align="center" variant="h6" color="text.secondary" gutterBottom mr={2}>
                        Całkowity czas:{' '}
                        <Tooltip
                            title={`Średnio ${dayjs
                                .duration(total.time / pickedFlashcards.length, 'seconds')
                                .format('mm:ss')}`}
                        >
                            <Chip
                                label={dayjs.duration(total.time, 'seconds').format('mm:ss')}
                                color="primary"
                                variant="outlined"
                            />
                        </Tooltip>
                    </Typography>

                    <Typography align="center" variant="h6" color="text.secondary" gutterBottom>
                        Wynik:{' '}
                        <Tooltip title={`${total.score} / ${pickedFlashcards.length}`}>
                            <Chip
                                label={`${total.totalPercentage}%`}
                                color={totalColor(total.score)}
                                variant="outlined"
                            />
                        </Tooltip>
                    </Typography>
                </Grid>
                {pickedFlashcards.map((value) => (
                    <Grid item xs={12} md={4} key={value.question.id}>
                        <Card sx={{ minHeight: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography align="center" variant="h6" color="text.secondary" gutterBottom>
                                    {value.question.front.kanji}
                                </Typography>
                                <Typography align="center" variant="h4" mb={1} component="div">
                                    {value.question.front.kana}
                                </Typography>
                                <Typography align="center" color="text.secondary">
                                    {renderRomaji(value.question.front.romaji)}
                                </Typography>
                                <Typography
                                    align="center"
                                    component="span"
                                    color="text.secondary"
                                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    Odpowiedzi
                                    <Typography mx={1} color={questionColor(value.tries)}>
                                        {value.tries}
                                    </Typography>{' '}
                                    w czasie{' '}
                                    <Typography mx={1} color="info.main">
                                        {dayjs.duration(value.time, 'seconds').format('mm:ss')}
                                    </Typography>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Portal container={fabContainerRef.current}>
                <Zoom in timeout={transitionDuration} unmountOnExit>
                    <Tooltip title="Zakończ">
                        <Fab color="error" aria-label="add" component={RouterLink} to="/quiz-select">
                            <CloseIcon />
                        </Fab>
                    </Tooltip>
                </Zoom>
            </Portal>
        </>
    );
}
