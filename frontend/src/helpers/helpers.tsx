import React from 'react';
import { Box } from '@mui/material';

const bull = (
    <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
        •
    </Box>
);

export function renderRomaji(romaji: string) {
    let sylabbles = romaji.split('.');
    return sylabbles.map((syllable, index) => {
        return (
            <span key={`syllable-${index}`}>
                {syllable}
                {index >= sylabbles.length - 1 ? '' : bull}
            </span>
        );
    });
}
