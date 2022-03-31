import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { useLayout } from '../data/LayoutProvider';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { QuizHistoryItem } from '../data/data';
import { QuizHistoryAnswer } from '../components/QuizHistoryAnswer';

export default function QuizHistoryDetails() {
    const { setIsLoading } = useLayout();
    const [quiz, setQuiz] = useState<any>(null);
    const { id } = useParams();

    useEffect(() => {
        async function loadAsyncData(id: string) {
            const docRef = doc(db, 'quizHistory', id);
            const docSnap = await getDoc(docRef);
            setQuiz(docSnap.data());
        }

        setIsLoading(true);
        if (id) {
            loadAsyncData(id).then(() => {
                setIsLoading(false);
            });
        } else {
            //throw error that there is no such quiz
            setIsLoading(false);
        }
    }, [id, setIsLoading]);

    return quiz ? (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography
                    component="h2"
                    variant="h6"
                    color="primary"
                    gutterBottom
                    sx={{ display: 'flex', alignItems: 'center' }}
                >
                    <Button variant="text" component={RouterLink} to={`/quiz-history`}>
                        <ArrowBackIcon />
                    </Button>{' '}
                    Szczegóły Quizu ({id})
                </Typography>
            </Grid>
            {quiz.questions.map((question: QuizHistoryItem) => (
                <QuizHistoryAnswer data={question} key={question.question.id} />
            ))}
        </Grid>
    ) : null;
}
