import React, { FunctionComponent, useEffect } from "react";
import { Answer } from "../data/DataProvider";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import SkipNextIcon from "@mui/icons-material/SkipNext";

type AnswersProps = {
    answersList: Answer[];
    onClick: (answerIndex: number) => void,
    onSkip: () => void
};
export const Answers: FunctionComponent<AnswersProps> = (props) => {
    useEffect(() => {
        const handleKeypress = (event: KeyboardEvent) => {
            if (event.code.includes('Digit')) {
                const number = parseInt(event.code.split('Digit')[1]);
                if (number <=4) {
                   props.onClick(number - 1);
                }
            }

            if (event.code === 'Space') {
                props.onSkip()
            }

        };
        window.addEventListener('keydown', handleKeypress);

        return () => {
            window.removeEventListener('keydown', handleKeypress);
        };
    });

    const {onClick, onSkip, answersList} = props;

    return (
        <>
            <Grid item xs={12} md="auto" container rowSpacing={1} justifyContent="center" alignItems="center"
                  spacing={2}>
                {answersList && answersList.map((answer, index) => (
                    <Grid item xs={6} key={`answer-${index}`}>
                        <Button fullWidth={true} variant="contained"
                                color={answer.clicked ? answer.isCorrect ? "success" : "error" : "primary"}
                                onClick={() => onClick(index)}>{index+1}. {answer.text}</Button>
                    </Grid>
                ))}
            </Grid>
            <Grid xs="auto" item>
                <Button variant="contained" color="warning" onClick={() => onSkip()} size="small" endIcon={<SkipNextIcon />}>Następna karta</Button>
            </Grid>
        </>
    );
};

