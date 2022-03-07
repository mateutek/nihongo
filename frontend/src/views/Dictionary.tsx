import Grid from '@mui/material/Grid';
import React from 'react';
import { Typography } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import questionsData from '../data/data';

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
        valueGetter: getColumnData,
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
];

export default function Dictionary() {
    const [pageSize, setPageSize] = React.useState<number>(25);
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
                                rows={questionsData}
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
