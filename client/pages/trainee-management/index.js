import React from 'react';
import Box from '@mui/material/Box';
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector
} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddEmployee from './addEmployee/AddEmployee';
import { useDispatch } from 'react-redux';
import { addEmployeeModalToggle } from '../../redux/state/common/commonSlice';

const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
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
        width: 150
    },
    {
        field: 'dateOfPRL',
        headerName: 'পিআরএল গমনের তারিখ',
        width: 100
    },
    {
        field: 'dob',
        headerName: 'জন্ম তারিখ',
        width: 100
    }
];

const rows = [
    {
        id: 1,
        nameBn: 'মোঃ মাসুদ মজুমদার',
        nameEn: 'Md. Masud Mazumder',
        email: 'mdmasud.csecu@gmail.com',
        mobile: '01710089091',
        designation: 'কম্পিউটার অপারেটর',
        currentOffice: 'আঞ্চলিক প্রশিক্ষন কেন্দ্র, বরিশাল',
        currentOfficeJoinDate: '22/10/2000',
        dateOfPRL: '22/12/2025',
        dob: '22/10/1988'
    }
];

export default function Index() {
    const dispatch = useDispatch();

    const handleClickOpen = () => {
        dispatch(addEmployeeModalToggle());
    };

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
                    onClick={handleClickOpen}
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
