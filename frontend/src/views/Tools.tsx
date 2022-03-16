import Grid from '@mui/material/Grid';
import React from 'react';
import { NumberConverter } from '../components/NumberConverter';
import { Links } from '../components/Links';

export default function Tools() {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
                <NumberConverter />
            </Grid>
            <Grid item xs={12} md={4}>
                <Links />
            </Grid>
        </Grid>
    );
}
