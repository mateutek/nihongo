import React, { FunctionComponent, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Flashcard from '../services/flashcard';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button, Tooltip } from '@mui/material';
import { useSettings } from '../data/SettingsProvider';
import { renderRomaji } from '../helpers/helpers';

type FlashcardProps = {
    data?: Flashcard;
};

export const FlashcardItem: FunctionComponent<FlashcardProps> = (props) => {
    const { data } = props;
    const { userSettings } = useSettings();
    const [question, setQuestion] = useState({
        big: '',
        small: '',
    });

    useEffect(() => {
        if (data) {
            const isKatakana = data.front.kanji === '-' || data.front.kanji === '';
            let big, small;
            if (userSettings.kanjiPriority) {
                big = isKatakana ? data.front.kana : data.front.kanji;
                small = isKatakana ? '' : data.front.kana;
                setQuestion({ big, small });
            } else {
                big = data.front.kana;
                small = data.front.kanji;
                setQuestion({ big, small });
            }
        }
    }, [data, userSettings]);

    return data ? (
        <Card sx={{ minWidth: 275, minHeight: 150, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography align="center" variant="h6" color="text.secondary" gutterBottom>
                    {question.small}
                </Typography>
                <Typography align="center" variant="h4" mb={1} component="div">
                    {question.big}
                </Typography>
                {userSettings.showRomaji ? (
                    <Typography align="center" color="text.secondary">
                        {renderRomaji(data.front.romaji)}
                    </Typography>
                ) : (
                    <Tooltip disableFocusListener title={renderRomaji(data.front.romaji)}>
                        <Button variant="text" startIcon={<VisibilityIcon />}>
                            romaji
                        </Button>
                    </Tooltip>
                )}
            </CardContent>
        </Card>
    ) : null;
};
