import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import { FlashcardItem } from '../components/FlashcardItem';
import { AnswersList, useData } from '../data/DataProvider';
import Flashcard from '../services/flashcard';
import _ from 'lodash';
import { Answers } from '../components/Answers';
import Timer from '../components/Timer';
import { Fab, Portal, Tooltip, useTheme, Zoom } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useLayout } from '../data/LayoutProvider';
import { Link as RouterLink } from 'react-router-dom';

export default function Quiz() {
    const [flashcardData, setFlashcardData] = useState<Flashcard | undefined>();
    const [answers, setAnswers] = useState<AnswersList>([]);
    const [cardActive, setCardActive] = useState(false);
    const data = useData();
    const { fabContainerRef } = useLayout();

    const theme = useTheme();

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    useEffect(() => {
        const { question, answers } = data.getRandom();
        setAnswers(answers);
        setFlashcardData(question);
        setCardActive(true);
    }, [data]);

    function pickNewQuestion() {
        setTimeout(() => {
            const { question, answers } = data.getRandom();
            setAnswers(answers);
            setFlashcardData(question);
            setCardActive(true);
        }, 500);
    }

    function checkAnswer(answerIndex: number) {
        const newAnswers = _.cloneDeep(answers);
        const clickedAnswer = newAnswers[answerIndex];
        clickedAnswer.clicked = true;
        setAnswers(newAnswers);
        if (clickedAnswer.isCorrect) {
            setCardActive(false);
            pickNewQuestion();
        }
    }

    return (
        <>
            <Grid container spacing={3} justifyContent="center" alignItems="center" direction="column">
                <Grid item>
                    <Timer isActive={cardActive} />
                </Grid>
                <Grid item>
                    <FlashcardItem data={flashcardData} />
                </Grid>
                <Answers answersList={answers} onClick={checkAnswer} onSkip={pickNewQuestion} />
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
