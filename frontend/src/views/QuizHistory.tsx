import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import { Button, Tooltip, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useLayout } from '../data/LayoutProvider';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from '../services/AuthContext';
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar, GridValueGetterParams, plPL } from '@mui/x-data-grid';
import { totalColorTypo } from '../helpers/helpers';
import dayjs from 'dayjs';

function getTotalData(params: GridValueGetterParams) {
    return params.row.total[params.field] || '-';
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },
    {
        field: 'score',
        headerName: 'Wynik',
        width: 150,
        valueGetter: getTotalData,
        renderCell: (params: GridRenderCellParams<number>) => (
            <Tooltip title={`${params.row.total.score} / ${params.row.total.maxScore}`}>
                <Typography color={totalColorTypo(params.row.total.totalPercentage)}>
                    {params.row.total.totalPercentage}%
                </Typography>
            </Tooltip>
        ),
    },
    {
        field: 'time',
        headerName: 'Całkowity czas',
        width: 150,
        valueGetter: getTotalData,
        renderCell: (params: GridRenderCellParams<number>) => (
            <Tooltip
                title={`Średnio ${dayjs
                    .duration(params.row.total.time / params.row.questions.length, 'seconds')
                    .format('mm:ss')}`}
            >
                <Typography>{dayjs.duration(params.row.total.time, 'seconds').format('mm:ss')}</Typography>
            </Tooltip>
        ),
    },
    {
        field: 'timestamp',
        headerName: 'Data',
        type: 'dateTime',
        width: 200,
        renderCell: (params: GridRenderCellParams<number>) => (
            <Typography>{dayjs(params.row.timestamp.seconds * 1000).format('DD-MM-YYYY HH:mm:ss')}</Typography>
        ),
    },
    {
        field: 'questions',
        headerName: 'Ilość pytań',
        type: 'number',
        width: 100,
        valueGetter: (params: GridValueGetterParams) => {
            return params.row.questions.length;
        },
    },
    {
        field: 'actions',
        headerName: '',
        type: 'number',
        flex: 1,
        sortable: false,
        filterable: false,
        hideable: false,
        renderCell: (params: GridRenderCellParams<number>) => (
            <Button component={RouterLink} to={`/quiz-history/${params.row.id}`}>
                Szczegóły
            </Button>
        ),
    },
];

export default function QuizHistory() {
    const { user } = useAuth();
    const { setIsLoading } = useLayout();
    const [quizzes, setQuizzes] = useState<any[]>([]);
    const [pageSize, setPageSize] = useState<number>(25);

    useEffect(() => {
        async function loadAsyncData() {
            const quizRef = collection(db, 'quizHistory');

            // Create a query against the collection.
            const q = query(quizRef, where('owner', '==', user.uid));
            const querySnapshot = await getDocs(q);
            const data: any[] = [];
            querySnapshot.forEach((doc) => {
                data.push({ ...doc.data(), id: doc.id });
            });
            setQuizzes(data);
        }

        setIsLoading(true);

        loadAsyncData().then(() => {
            setIsLoading(false);
        });
    }, [setIsLoading, user.uid]);

    return (
        <Grid container>
            <Grid item xs={12} sx={{ minHeight: '70vh' }}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    Poprzednie quizy
                </Typography>
                <div style={{ height: '100%', width: '100%' }}>
                    <div style={{ display: 'flex', height: '100%' }}>
                        <div style={{ flexGrow: 1 }}>
                            <DataGrid
                                localeText={plPL.components.MuiDataGrid.defaultProps.localeText}
                                rows={quizzes}
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
