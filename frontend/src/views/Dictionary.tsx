import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import LS from '../data/lowdb';
import Link from '@mui/material/Link';

function getColumnData(params: GridValueGetterParams) {
    return params.row.japanese[params.field] || '-';
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'kana',
        headerName: 'Kana',
        width: 150,
        valueGetter: getColumnData,
    },
    {
        field: 'kanji',
        headerName: 'Kanji',
        width: 150,
        renderCell: (params: GridRenderCellParams<Date>) =>
            params.row.japanese.kanji ? (
                <Link
                    href={`https://jisho.org/search/${params.row.japanese.kanji}%20%23kanji`}
                    underline="hover"
                    target="_blank"
                    rel="noreferrer"
                >
                    {params.row.japanese.kanji}
                </Link>
            ) : (
                <span> - </span>
            ),
    },
    {
        field: 'romaji',
        headerName: 'Romaji',
        width: 150,
        valueGetter: getColumnData,
    },
    {
        field: 'polish',
        headerName: 'Polski',
        width: 150,
    },
    {
        field: 'tags',
        headerName: 'Tagi',
    },
];

export default function Dictionary() {
    const [pageSize, setPageSize] = useState<number>(25);

    const [data] = useState(() => (LS.data?.flashcards ? LS.data?.flashcards : []));

    return (
        <Grid container>
            <Grid item xs={12} sx={{ minHeight: '70vh' }}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    Słownik
                </Typography>
                <div style={{ height: '100%', width: '100%' }}>
                    <div style={{ display: 'flex', height: '100%' }}>
                        <div style={{ flexGrow: 1 }}>
                            <DataGrid
                                rows={data}
                                columns={columns}
                                pageSize={pageSize}
                                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                rowsPerPageOptions={[25, 50, 100]}
                                disableSelectionOnClick
                                components={{ Toolbar: GridToolbar }}
                            />
                        </div>
                    </div>
                </div>
            </Grid>
        </Grid>
    );
}
