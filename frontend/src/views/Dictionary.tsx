import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import { Tooltip, tooltipClasses, TooltipProps, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar, GridValueGetterParams, plPL } from '@mui/x-data-grid';
import LS from '../data/lowdb';
import Link from '@mui/material/Link';
import styled from '@emotion/styled';
import ZoomInIcon from '@mui/icons-material/ZoomIn';

function getColumnJapaneseData(params: GridValueGetterParams) {
    return params.row.japanese[params.field] || '-';
}

function getColumnArrayData(params: GridValueGetterParams) {
    return params.row.tags.join(',') || '-';
}

const BigKanjiTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: 220,
        fontSize: 48,
    },
}));

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'kana',
        headerName: 'Kana',
        width: 150,
        valueGetter: getColumnJapaneseData,
    },
    {
        field: 'kanji',
        headerName: 'Kanji',
        width: 150,
        renderCell: (params: GridRenderCellParams<Date>) =>
            params.row.japanese.kanji !== '-' ? (
                <div style={{ display: 'flex', justifyContent: 'space-between', flex: 1 }}>
                    <Link
                        href={`https://jisho.org/search/${params.row.japanese.kanji}%20%23kanji`}
                        underline="hover"
                        target="_blank"
                        rel="noreferrer"
                    >
                        {params.row.japanese.kanji}
                    </Link>
                    <BigKanjiTooltip title={params.row.japanese.kanji}>
                        <ZoomInIcon />
                    </BigKanjiTooltip>
                </div>
            ) : (
                <span> - </span>
            ),
    },
    {
        field: 'romaji',
        headerName: 'Romaji',
        width: 150,
        valueGetter: getColumnJapaneseData,
    },
    {
        field: 'polish',
        headerName: 'Polski',
        width: 150,
    },
    {
        field: 'tags',
        headerName: 'Tagi',
        type: 'string',
        valueGetter: getColumnArrayData,
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
                                initialState={{
                                    sorting: {
                                        sortModel: [{ field: 'tags', sort: 'asc' }],
                                    },
                                }}
                                localeText={plPL.components.MuiDataGrid.defaultProps.localeText}
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
