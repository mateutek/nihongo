import React, { FunctionComponent, useState } from 'react';
import { Box, Paper, TextField, Typography } from '@mui/material';
import convertNumber from '../services/numerals';

const defaultConversion = {
    hiragana: '',
    kanji: '',
    romaji: '',
};

type NumberConverterProps = {};
export const NumberConverter: FunctionComponent<NumberConverterProps> = (props) => {
    const [jap, setJap] = useState(defaultConversion);
    const convert = (event: React.ChangeEvent<HTMLInputElement>) => {
        const number = parseInt(event.target.value);
        // setName(event.target.value);
        if (!isNaN(number)) {
            const hiragana = convertNumber('Hiragana', event.target.value);
            const kanji = convertNumber('Kanji', event.target.value);
            const romaji = convertNumber('Hepburn', event.target.value);
            setJap({
                hiragana,
                kanji,
                romaji,
            });
        } else {
            setJap(defaultConversion);
        }
    };

    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Konwersja liczb
            </Typography>
            <TextField label="Arabskie" variant="standard" onChange={convert} margin="normal" />
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="caption">{jap.hiragana}</Typography>
                <Typography variant="h5">{jap.kanji}</Typography>
                <Typography variant="caption">{jap.romaji}</Typography>
            </Box>
        </Paper>
    );
};
