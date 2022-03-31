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

type totalColors = 'error' | 'info' | 'success' | 'warning' | 'primary';

export function totalColor(total: number) {
    let color: totalColors;
    if (total >= 80) {
        color = 'success';
    } else if (total >= 50) {
        color = 'info';
    } else if (total >= 30) {
        color = 'warning';
    } else {
        color = 'primary';
    }
    return color;
}

type totalColorsTypo = 'error.main' | 'info.main' | 'success.main' | 'warning.main' | 'primary';
export function totalColorTypo(total: number) {
    let color: totalColorsTypo;
    if (total >= 80) {
        color = 'success.main';
    } else if (total >= 50) {
        color = 'info.main';
    } else if (total >= 30) {
        color = 'warning.main';
    } else {
        color = 'primary';
    }
    return color;
}

export function questionColor(total: number) {
    switch (total) {
        case 1:
        case 2:
            return 'success.main';
        case 3:
            return 'warning.main';
        case 4:
            return 'error.main';
        default:
            return 'info.main';
    }
}
