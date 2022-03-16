import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import { FlashcardItem } from '../components/FlashcardItem';
import { AnswersList, useData } from '../data/DataProvider';
import Flashcard from '../services/flashcard';
import _ from 'lodash';
import { Answers } from '../components/Answers';
import Timer from '../components/Timer';
import { Fab, Portal, Tooltip, Typography, useTheme, Zoom } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useLayout } from '../data/LayoutProvider';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';

export default function Quiz() {
    const navigate = useNavigate();
    const { pickedFlashcards } = useData();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [flashcardData, setFlashcardData] = useState<Flashcard | undefined>();
    const [answers, setAnswers] = useState<AnswersList>([]);
    const [cardActive, setCardActive] = useState(false);
    const [timeTaken, setTimeTaken] = useState(0);

    const { fabContainerRef } = useLayout();

    const theme = useTheme();

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    useEffect(() => {
        if (pickedFlashcards.length > 0) {
            setFlashcardData(pickedFlashcards[currentQuestion].question);
            setAnswers(pickedFlashcards[currentQuestion].answers);
            setCardActive(true);
        } else {
            navigate('/quiz-select');
        }
    }, [pickedFlashcards, currentQuestion, navigate]);

    function pickNextQuestion() {
        setTimeout(() => {
            const nextQuestionNumber = currentQuestion + 1;
            if (nextQuestionNumber < pickedFlashcards.length) {
                setCurrentQuestion(nextQuestionNumber);
                setFlashcardData(pickedFlashcards[nextQuestionNumber].question);
                setAnswers(pickedFlashcards[nextQuestionNumber].answers);
                setCardActive(true);
            } else {
                navigate('/quiz-end');
            }
        }, 500);
    }

    function checkAnswer(answerIndex: number) {
        const newAnswers = _.cloneDeep(answers);
        const clickedAnswer = newAnswers[answerIndex];
        if (!clickedAnswer.clicked) {
            pickedFlashcards[currentQuestion].tries += 1;
        }
        clickedAnswer.clicked = true;
        setAnswers(newAnswers);

        if (clickedAnswer.isCorrect) {
            setCardActive(false);
            pickedFlashcards[currentQuestion].time = timeTaken;
            pickNextQuestion();
        }
    }

    function getTime(seconds: number) {
        setTimeTaken(seconds);
    }

    return (
        <>
            <Grid container spacing={3} justifyContent="center" alignItems="center" direction="column">
                <Grid item>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'center' }}>
                        <Typography color="text.secondary" variant="body2">
                            {currentQuestion + 1} / {pickedFlashcards.length}
                        </Typography>
                    </Box>
                    <Timer isActive={cardActive} getTime={getTime} />
                </Grid>
                <Grid item>
                    <FlashcardItem data={flashcardData} />
                </Grid>
                <Answers answersList={answers} onClick={checkAnswer} onSkip={pickNextQuestion} />
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
