import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { Answer } from '../data/DataProvider';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useSettings } from '../data/SettingsProvider';
import SendIcon from '@mui/icons-material/Send';
import * as stringSimilarity from 'string-similarity';

type AnswersProps = {
    answersList: Answer[];
    onClick: (answerIndex: number) => void;
    onInput: (score: number, answer: string) => void;
    onSkip: (skipped?: boolean) => void;
};
export const Answers: FunctionComponent<AnswersProps> = (props) => {
    const [inputAnswer, setInputAnswer] = useState('');
    const { userSettings } = useSettings();
    const { onClick, onSkip, answersList, onInput } = props;

    const handleInputAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputAnswer(event.target.value);
    };

    const handleSendAnswer = useCallback(() => {
        if (inputAnswer) {
            const correctAnswer = answersList.filter((a) => a.isCorrect)[0].text;
            let score;
            if (correctAnswer.indexOf('/') > -1) {
                score = stringSimilarity.findBestMatch(inputAnswer, correctAnswer.split('/')).bestMatch.rating;
            } else {
                score = stringSimilarity.compareTwoStrings(correctAnswer, inputAnswer);
            }
            onInput(score, inputAnswer);
            setInputAnswer('');
        }
    }, [inputAnswer, answersList, onInput]);

    useEffect(() => {
        const handleKeypress = (event: KeyboardEvent) => {
            if (!userSettings.defaultInput) {
                if (event.code.includes('Digit')) {
                    const number = parseInt(event.code.split('Digit')[1]);
                    if (number <= 4) {
                        onClick(number - 1);
                    }
                }

                if (event.code === 'Space') {
                    onSkip(true);
                }
            } else {
                if (event.code.includes('Enter')) {
                    handleSendAnswer();
                }
            }
        };
        window.addEventListener('keydown', handleKeypress);

        return () => {
            window.removeEventListener('keydown', handleKeypress);
        };
    }, [userSettings.defaultInput, inputAnswer, handleSendAnswer, onClick, onSkip]);

    return (
        <>
            {!userSettings.defaultInput && (
                <Grid
                    item
                    xs={12}
                    md="auto"
                    container
                    rowSpacing={1}
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >
                    {answersList &&
                        answersList.map((answer, index) => (
                            <Grid item xs={6} key={`answer-${index}`}>
                                <Button
                                    fullWidth={true}
                                    variant="contained"
                                    color={answer.clicked ? (answer.isCorrect ? 'success' : 'error') : 'primary'}
                                    onClick={() => onClick(index)}
                                >
                                    {index + 1}. {answer.text}
                                </Button>
                            </Grid>
                        ))}
                </Grid>
            )}

            {userSettings.defaultInput && (
                <Grid item>
                    <TextField
                        sx={{ minWidth: 275 }}
                        id="filled-number"
                        label="Odpowiedź"
                        onChange={handleInputAnswer}
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleSendAnswer}
                                        edge="end"
                                    >
                                        <SendIcon fontSize="small" />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        value={inputAnswer}
                        variant="standard"
                    />
                </Grid>
            )}

            <Grid xs="auto" item>
                <Button
                    variant="contained"
                    color="warning"
                    onClick={() => onSkip(true)}
                    size="small"
                    endIcon={<SkipNextIcon />}
                >
                    Następne pytanie
                </Button>
            </Grid>
        </>
    );
};
