import React, { FunctionComponent, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { renderRomaji } from '../helpers/helpers';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid';
import { CardActions, IconButton, Theme, Tooltip } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { QuizHistoryItem } from '../data/data';

type QuizAnswerProps = {
    data: QuizHistoryItem;
};
export const QuizHistoryAnswer: FunctionComponent<QuizAnswerProps> = (props) => {
    const { data } = props;
    const [showAnswers, setShowAnswers] = useState(false);
    return (
        <Grid item xs={12} md={4} key={data.question.id}>
            <Card
                sx={{
                    minHeight: 200,
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    bgcolor: (theme: Theme) =>
                        data.skipped ? `${theme.palette.warning.light}30` : theme.palette.background.paper,
                }}
            >
                <CardContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        minHeight: 180,
                    }}
                >
                    {!showAnswers ? (
                        <>
                            <Typography align="center" variant="h6" color="text.secondary" gutterBottom>
                                {data.question.japanese.kanji}
                            </Typography>
                            <Typography align="center" variant="h4" mb={1} component="div">
                                {data.question.japanese.kana}
                            </Typography>
                            <Typography align="center" color="text.secondary">
                                {renderRomaji(data.question.japanese.romaji)}
                            </Typography>
                            <Typography align="center" color="text.main" variant="h6">
                                {data.question.polish}
                            </Typography>
                        </>
                    ) : (
                        <>
                            <Typography align="center" color="text.main" variant="h6">
                                Odpowiedzi:
                            </Typography>
                            <Grid container spacing={2}>
                                {data.userInput.length > 0
                                    ? data.userInput.map((input, index) => (
                                          <Grid item key={index}>
                                              <Typography>
                                                  {index + 1}. {input.answer} ({input.score})
                                              </Typography>
                                          </Grid>
                                      ))
                                    : data.answers.map((answer, index) => (
                                          <Grid item key={index}>
                                              <Typography
                                                  sx={{
                                                      textDecoration:
                                                          answer.clicked || answer.isCorrect ? 'underline' : '',
                                                  }}
                                              >
                                                  {index + 1}. {answer.text}
                                              </Typography>
                                          </Grid>
                                      ))}
                            </Grid>
                        </>
                    )}
                </CardContent>
                <CardActions>
                    <Typography
                        align="center"
                        component="span"
                        color="text.secondary"
                        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        Odpowiedzi
                        <Typography mx={1} color="info.main">
                            {data.tries}
                        </Typography>{' '}
                        w czasie{' '}
                        <Typography mx={1} color="info.main">
                            {dayjs.duration(data.time, 'seconds').format('mm:ss')}
                        </Typography>
                    </Typography>
                    <Tooltip disableFocusListener title={showAnswers ? 'Ukryj odpowiedzi' : 'Pokaż odpowiedzi'}>
                        <IconButton
                            onClick={() => {
                                setShowAnswers(!showAnswers);
                            }}
                            edge="end"
                        >
                            {showAnswers ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </Tooltip>
                </CardActions>
            </Card>
        </Grid>
    );
};
