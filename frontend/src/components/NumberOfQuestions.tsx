import React, { FunctionComponent, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { ButtonGroup, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import MinusIcon from '@mui/icons-material/Remove';
import PlusIcon from '@mui/icons-material/Add';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useData } from '../data/DataProvider';
import { useSettings } from '../data/SettingsProvider';

type NumberOfQuestionsProps = {
    maxQuestions: number;
};

const defaultQuestionsNumber = 40;
const minimumQuestions = 5;
const step = 5;

export const NumberOfQuestions: FunctionComponent<NumberOfQuestionsProps> = (props) => {
    const { userSettings } = useSettings();
    const { pickQuestions } = useData();
    const [questions, setQuestions] = useState(() => {
        return props.maxQuestions >= defaultQuestionsNumber ? userSettings.startingQuestions : props.maxQuestions;
    });

    useEffect(() => {
        setQuestions(userSettings.startingQuestions);
    }, [userSettings.startingQuestions]);

    useEffect(() => {
        if (questions > props.maxQuestions && props.maxQuestions > 0) {
            setQuestions(props.maxQuestions);
        }
        if (questions === 0 && props.maxQuestions > 0) {
            setQuestions(minimumQuestions);
        }
    }, [props.maxQuestions, questions]);

    function subtract() {
        const newQuestions = questions - step >= minimumQuestions ? questions - step : minimumQuestions;
        setQuestions(newQuestions);
    }

    function add() {
        const newQuestions = questions + step <= props.maxQuestions ? questions + step : props.maxQuestions;
        setQuestions(newQuestions);
    }

    function min() {
        setQuestions(minimumQuestions);
    }

    function max() {
        setQuestions(props.maxQuestions);
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
                        disabled={questions === minimumQuestions || props.maxQuestions === 0}
                        onClick={() => {
                            min();
                        }}
                    >
                        <FirstPageIcon />
                    </Button>
                    <Button
                        disabled={questions === minimumQuestions || props.maxQuestions === 0}
                        onClick={() => {
                            subtract();
                        }}
                    >
                        <MinusIcon />
                    </Button>
                    <Button
                        disabled={questions === props.maxQuestions || props.maxQuestions === 0}
                        onClick={() => {
                            add();
                        }}
                    >
                        <PlusIcon />
                    </Button>
                    <Button
                        disabled={questions === props.maxQuestions || props.maxQuestions === 0}
                        onClick={() => {
                            max();
                        }}
                    >
                        <LastPageIcon />
                    </Button>
                </ButtonGroup>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'center' }}>
                <Typography color="text.secondary" variant="body2">
                    {questions} pytań / {props.maxQuestions} możliwych
                </Typography>
            </Box>
            <Button
                onClick={() => pickQuestions(questions)}
                variant="contained"
                size="small"
                disabled={props.maxQuestions === 0 || questions === 0}
            >
                Trenuj
            </Button>
        </>
    );
};
