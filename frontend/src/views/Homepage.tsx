import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import { FlashcardItem } from '../components/FlashcardItem';
import { AnswersList, useData } from '../data/DataProvider';
import Flashcard from '../services/flashcard';
import _ from 'lodash';
import { Answers } from '../components/Answers';

export default function Homepage() {
    const [flashcardData, setFlashcardData] = useState<Flashcard | undefined>();
    const [answers, setAnswers] = useState<AnswersList>([]);

    const data = useData();

    useEffect(() => {
        const { question, answers } = data.getRandom();
        setAnswers(answers);
        setFlashcardData(question);
    }, [data]);

    function pickNewQuestion() {
        setTimeout(() => {
            const { question, answers } = data.getRandom();
            setAnswers(answers);
            setFlashcardData(question);
        }, 500);
    }

    function checkAnswer(answerIndex: number) {
        const newAnswers = _.cloneDeep(answers);
        const clickedAnswer = newAnswers[answerIndex];
        clickedAnswer.clicked = true;
        setAnswers(newAnswers);
        if (clickedAnswer.isCorrect) {
            pickNewQuestion();
        }
    }

    return (
        <Grid container spacing={3} justifyContent="center" alignItems="center" direction="column">
            <Grid item>
                <FlashcardItem data={flashcardData} />
            </Grid>
            <Answers answersList={answers} onClick={checkAnswer} onSkip={pickNewQuestion} />
        </Grid>
    );
}
