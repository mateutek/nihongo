import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import { useData } from '../data/DataProvider';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import Typography from '@mui/material/Typography';
import { totalColor } from '../helpers/helpers';
import _ from 'lodash';
import {
    Button,
    Chip,
    Fab,
    FormControl,
    InputLabel,
    MenuItem,
    Portal,
    Select,
    SelectChangeEvent,
    Tooltip,
    useTheme,
    Zoom,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useLayout } from '../data/LayoutProvider';
import { useSnackbar } from 'notistack';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from '../services/AuthContext';
import { QuizAnswer } from '../components/QuizAnswer';

export default function QuizEnd() {
    const navigate = useNavigate();
    const { pickedFlashcards } = useData();
    const [filteredFlashcards, setFilteredFlashcards] = useState(() => pickedFlashcards);
    const [total, setTotal] = useState({ score: 0, time: 0, totalPercentage: 0, maxScore: 0 });
    const [sorting, setSorting] = useState('');
    const { fabContainerRef, setIsLoading } = useLayout();
    const { user } = useAuth();

    const { enqueueSnackbar } = useSnackbar();

    const theme = useTheme();

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    const handleChange = (event: SelectChangeEvent) => {
        setSorting(event.target.value);
    };

    useEffect(() => {
        setIsLoading(true);
        // const data: Array<any[]> = [['time_asc', 'time_desc', 'tries_asc', 'tries_desc']];
        const newData = [...pickedFlashcards].sort((a, b) => {
            // data.push([b.time - a.time, a.time - b.time, b.tries - a.tries, a.tries - b.tries]);
            switch (sorting) {
                case '-':
                default:
                    return 0;
                case 'time_asc':
                    return a.time - b.time;
                case 'time_desc':
                    return b.time - a.time;
                case 'tries_asc':
                    return a.tries - b.tries;
                case 'tries_desc':
                    return b.tries - a.tries;
            }
        });

        setFilteredFlashcards(newData);
        setIsLoading(false);
    }, [sorting, pickedFlashcards, setIsLoading]);

    useEffect(() => {
        setIsLoading(true);
        if (pickedFlashcards.length === 0) {
            navigate('/quiz-select');
        } else {
            const maxScore = pickedFlashcards.length * 4 - pickedFlashcards.length;
            const newTotal = pickedFlashcards.reduce(
                (total, question) => {
                    const tries = question.skipped ? 3 : question.tries - 1;
                    total.time += question.time;
                    total.score -= tries;
                    return total;
                },
                { score: maxScore, time: 0, totalPercentage: 0, maxScore },
            );
            newTotal.totalPercentage = _.round((newTotal.score / maxScore) * 100, 2);
            setTotal(newTotal);
            setIsLoading(false);
        }
    }, [pickedFlashcards, navigate, setIsLoading]);

    const saveQuiz = async () => {
        const questions = filteredFlashcards.map((card) => {
            const {
                time,
                tries,
                answers,
                skipped,
                userInput,
                question: { id, question },
            } = card;

            const parsedAnswers = answers.map((answer) => {
                const { text, isCorrect, clicked } = answer;
                return { text, isCorrect, clicked };
            });

            return {
                id,
                question,
                time,
                tries,
                answers: parsedAnswers,
                skipped,
                userInput,
            };
        });

        await addDoc(collection(db, 'quizHistory'), {
            owner: user.uid,
            total,
            questions,
            timestamp: serverTimestamp(),
        });

        setTimeout(() => {
            enqueueSnackbar('Zapisano pomyślnie', {
                variant: 'success',
                autoHideDuration: 3000,
            });
            navigate('/quiz-history');
        }, 500);
    };
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
                        <Tooltip title={`${total.score} / ${total.maxScore}`}>
                            <Chip
                                label={`${total.totalPercentage}%`}
                                color={totalColor(total.totalPercentage)}
                                variant="outlined"
                            />
                        </Tooltip>
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}
                >
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Sortuj wg.</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={sorting}
                            onChange={handleChange}
                            label="Sortowanie"
                        >
                            <MenuItem value="-">
                                <em>Domyślnie</em>
                            </MenuItem>
                            <MenuItem value="time_asc">Czas rosnąco</MenuItem>
                            <MenuItem value="time_desc">Czas malejąco</MenuItem>
                            <MenuItem value="tries_asc">Prób rosnąco</MenuItem>
                            <MenuItem value="tries_desc">Prób malejąco</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="success" onClick={saveQuiz}>
                        Zapisz wyniki
                    </Button>
                </Grid>
                {filteredFlashcards.map((flashcard) => (
                    <QuizAnswer data={flashcard} />
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
