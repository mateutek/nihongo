import React, { FunctionComponent, useState } from 'react';
import Box from '@mui/material/Box';
import { ButtonGroup, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import MinusIcon from '@mui/icons-material/Remove';
import PlusIcon from '@mui/icons-material/Add';
import { Link as RouterLink } from 'react-router-dom';

type NumberOfQuestionsProps = {
    maxQuestions: number;
};

const defaultQuestionsNumber = 40;
const minimumQuestions = 5;
const step = 5;

export const NumberOfQuestions: FunctionComponent<NumberOfQuestionsProps> = (props) => {
    const [questions, setQuestions] = useState(() => {
        return props.maxQuestions >= defaultQuestionsNumber ? defaultQuestionsNumber : props.maxQuestions;
    });

    function subtract() {
        const newQuestions = questions - step >= minimumQuestions ? questions - step : minimumQuestions;
        setQuestions(newQuestions);
    }

    function add() {
        const newQuestions = questions + step <= props.maxQuestions ? questions + step : props.maxQuestions;
        setQuestions(newQuestions);
    }

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'center' }}>
                <Typography>Limit pytań:</Typography>
                <Typography variant="h5" color="primary" sx={{ mx: 2 }}>
                    {questions}
                </Typography>
                <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                    <Button
                        disabled={questions === minimumQuestions}
                        onClick={() => {
                            subtract();
                        }}
                    >
                        <MinusIcon />
                    </Button>
                    <Button
                        disabled={questions === props.maxQuestions}
                        onClick={() => {
                            add();
                        }}
                    >
                        <PlusIcon />
                    </Button>
                </ButtonGroup>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'center' }}>
                <Typography color="text.secondary" variant="body2">
                    {questions} pytań / {props.maxQuestions} możliwych
                </Typography>
            </Box>
            <Button component={RouterLink} to="/quiz" variant="contained" size="small">
                Trenuj
            </Button>
        </>
    );
};