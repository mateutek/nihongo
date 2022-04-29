import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import { FlashcardItem } from '../components/FlashcardItem';
import { AnswersList, useData } from '../data/DataProvider';
import Flashcard from '../services/flashcard';
import _ from 'lodash';
import { Answers } from '../components/Answers';
import Timer from '../components/Timer';
import { Card, Portal, SpeedDial, SpeedDialAction, SpeedDialIcon, Typography, useTheme, Zoom } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useLayout } from '../data/LayoutProvider';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Pause, PlayArrow } from '@mui/icons-material';

export default function Quiz() {
    const navigate = useNavigate();
    const { pickedFlashcards } = useData();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [flashcardData, setFlashcardData] = useState<Flashcard | undefined>();
    const [answers, setAnswers] = useState<AnswersList>([]);
    const [cardActive, setCardActive] = useState(false);
    const [timeTaken, setTimeTaken] = useState(0);
    const [paused, setPaused] = useState(false);
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

    function pickNextQuestion(skipped?: boolean) {
        pickedFlashcards[currentQuestion].answers = answers;
        if (skipped) {
            pickedFlashcards[currentQuestion].skipped = true;
            pickedFlashcards[currentQuestion].time = timeTaken;
        }
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

    function onSkip() {
        setCardActive(false);
        pickNextQuestion(true);
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

    function checkInputAnswer(score: number, answer: string) {
        pickedFlashcards[currentQuestion].userInput.push({ answer, score });
        if (pickedFlashcards[currentQuestion].tries <= 3) {
            pickedFlashcards[currentQuestion].tries += 1;
        }
        if (score >= 0.7) {
            setCardActive(false);
            pickedFlashcards[currentQuestion].time = timeTaken;
            pickNextQuestion();
        }
    }

    function getTime(seconds: number) {
        setTimeTaken(seconds);
    }

    function handleQuizClose() {
        navigate('/quiz-select');
    }

    function handleQuizPause() {
        setPaused(!paused);
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
                    <Timer isActive={cardActive} getTime={getTime} paused={paused} />
                </Grid>
                <Grid item>
                    {paused ? (
                        <Card
                            sx={{
                                minWidth: 275,
                                minHeight: 150,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        />
                    ) : (
                        <FlashcardItem data={flashcardData} />
                    )}
                </Grid>
                {answers.length > 0 && !paused && (
                    <Answers answersList={answers} onClick={checkAnswer} onSkip={onSkip} onInput={checkInputAnswer} />
                )}
            </Grid>
            <Portal container={fabContainerRef.current}>
                <Zoom in timeout={transitionDuration} unmountOnExit>
                    <SpeedDial
                        FabProps={{ color: paused ? 'info' : 'warning' }}
                        ariaLabel=""
                        icon={paused ? <PlayArrow /> : <Pause />}
                        onClick={() => {
                            handleQuizPause();
                        }}
                    >
                        <SpeedDialAction
                            key="close"
                            icon={<CloseIcon />}
                            tooltipTitle="Zakończ"
                            onClick={handleQuizClose}
                        />
                    </SpeedDial>
                </Zoom>
            </Portal>
        </>
    );
}
