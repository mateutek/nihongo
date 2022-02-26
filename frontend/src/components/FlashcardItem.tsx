import React, { FunctionComponent } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Flashcard from '../services/flashcard';
import { Box } from '@mui/material';

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
    return data ? (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography align="center" sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {data.front.kanji}
                </Typography>
                <Typography align="center" variant="h5" component="div">
                    {data.front.kana}
                </Typography>
                <Typography align="center" sx={{ mb: 1.5 }} color="text.secondary">
                    {renderRomaji(data.front.romaji)}
                </Typography>
            </CardContent>
        </Card>
    ) : null;
};
