import React, { FunctionComponent, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Flashcard from '../services/flashcard';
import { Box } from '@mui/material';
import { useSettings } from '../data/SettingsProvider';

type FlashcardProps = {
    data?: Flashcard;
};

const bull = (
    <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
        •
    </Box>
);

const renderRomaji = (romaji: string) => {
    let sylabbles = romaji.split('.');
    return sylabbles.map((syllable, index) => {
        return (
            <span key={`syllable-${index}`}>
                {syllable}
                {index >= sylabbles.length - 1 ? '' : bull}
            </span>
        );
    });
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
            <CardContent>
                <Typography align="center" variant="h6" color="text.secondary" gutterBottom>
                    {question.small}
                </Typography>
                <Typography align="center" variant="h4" mb={1} component="div">
                    {question.big}
                </Typography>
                {userSettings.showRomaji && (
                    <Typography align="center" color="text.secondary">
                        {renderRomaji(data.front.romaji)}
                    </Typography>
                )}
            </CardContent>
        </Card>
    ) : null;
};
