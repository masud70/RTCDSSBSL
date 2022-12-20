import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddEmployee from './addEmployee/AddEmployee';
import { useDispatch } from 'react-redux';
import { addEmployeeModalToggle } from '../../redux/state/common/commonSlice';
import dayjs from 'dayjs';
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector
} from '@mui/x-data-grid';
import { SocketContext } from '../socketContext';

const columns = [
    { field: 'id', headerName: 'Sl No', width: 60 },
    {
        field: 'nameBn',
        headerName: 'নাম (বাংলা)',
        width: 200,
        editable: true
    },
    {
        field: 'nameEn',
        headerName: 'নাম (ইংরেজী)',
        width: 200,
        editable: true
    },
    {
        field: 'email',
        headerName: 'ইমেইল',
        type: 'string',
        width: 200
    },
    {
        field: 'mobile',
        headerName: 'মোবাইল',
        width: 150
    },
    {
        field: 'designation',
        headerName: 'পদবী',
        width: 200
    },
    {
        field: 'currentOffice',
        headerName: 'বর্তমান অফিস',
        width: 200
    },
    {
        field: 'currentOfficeJoinDate',
        headerName: 'বর্তমান অফিস যোগদানের তারিখ',
        width: 140,
        valueGetter: params =>
            dayjs(params.currentOfficeJoinDate).format('DD/MM/YYYY')
    },
    {
        field: 'dateOfPRL',
        headerName: 'পিআরএল গমনের তারিখ',
        width: 140,
        valueGetter: params => dayjs(params.dateOfPRL).format('DD/MM/YYYY')
    },
    {
        field: 'dob',
        headerName: 'জন্ম তারিখ',
        width: 110,
        valueGetter: params => dayjs(params.dob).format('DD/MM/YYYY')
    }
];

export default function Index() {
    const dispatch = useDispatch();
    const [rows, setRows] = useState([]);
    const [data, setData] = useState('Masud');
    const socket = useContext(SocketContext);

    useEffect(() => {
        fetch(process.env.BASE_URL + '/employee/getAll')
            .then(res => res.json())
            .then(data => {
                setRows(data.users);
            })
            .catch(err => console.error(err));
    }, []);

    socket.off('registered').on('registered', x => {
        setRows(pre => [...pre, x]);
    });

    function CustomToolbar() {
        return (
            <GridToolbarContainer className="flex justify-between">
                <GridToolbarColumnsButton className="font-bold" />
                <GridToolbarFilterButton className="font-bold" />
                <GridToolbarDensitySelector className="font-bold" />
                <GridToolbarExport
                    className="font-bold"
                    printOptions={{ disableToolbarButton: true }}
                />
                <Button
                    onClick={() => dispatch(addEmployeeModalToggle())}
                    className="bg-slate-600"
                    variant="contained"
                    endIcon={<AddCircleIcon />}>
                    <span className="font-bold">Add Employee</span>
                </Button>
            </GridToolbarContainer>
        );
    }

    return (
        <div>
            <Box sx={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={100}
                    getRowId={row => row._id}
                    rowsPerPageOptions={[25, 50, 100]}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    components={{
                        Toolbar: CustomToolbar
                    }}
                />
            </Box>
            <AddEmployee />
        </div>
    );
}
