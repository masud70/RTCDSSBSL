import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddEmployee from './addEmployee/AddEmployee';
import { useDispatch } from 'react-redux';
import {
    addEmployeeModalToggle,
    editEmployeeModalToggle
} from '../../redux/state/common/commonSlice';
import { SocketContext } from '../socketContext';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import EditEmployeeData from './EditEmployeeData';
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector
} from '@mui/x-data-grid';
import swal from 'sweetalert';
import { useQuery } from '@apollo/client';
import { ALL_USER_QUERY } from '../../components/graphql/query';
import dayjs from 'dayjs';
import Link from 'next/link';

export default function Index() {
    const dispatch = useDispatch();
    const [rows, setRows] = useState([]);
    const socket = useContext(SocketContext);

    const columns = [
        {
            field: 'slNo',
            headerName: 'Sl No',
            width: 60
        },
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
            field: 'phone',
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
            valueGetter: x => dayjs.unix(x.value).format('DD/MM/YYYY')
        },
        {
            field: 'dateOfPRL',
            headerName: 'পিআরএল গমনের তারিখ',
            width: 140,
            valueGetter: x => dayjs.unix(x.value).format('DD/MM/YYYY')
        },
        {
            field: 'dob',
            headerName: 'জন্ম তারিখ',
            width: 110,
            valueGetter: x => dayjs.unix(x.value).format('DD/MM/YYYY')
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 110,
            renderCell: data => {
                return (
                    <>
                        <div>
                            <Tooltip title="Edit" placement="top">
                                <IconButton
                                    onClick={() => {
                                        dispatch(
                                            editEmployeeModalToggle({
                                                data: data.row
                                            })
                                        );
                                    }}>
                                    <EditIcon className="text-green-700" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete" placement="top">
                                <IconButton
                                    onClick={() => deleteHandler(data.row)}>
                                    <DeleteIcon className="text-red-500" />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </>
                );
            }
        }
    ];

    const deleteHandler = user => {
        swal({
            text: 'Do you want to delete this employee?',
            buttons: {
                cancel: 'Cancel',
                delete: 'Delete'
            }
        }).then(data => {
            if (data === 'delete') {
                fetch(process.env.BASE_URL + '/employee/delete', {
                    method: 'POST',
                    body: JSON.stringify({ id: user._id }),
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        return response.json();
                    })
                    .then(res => {
                        if (res.status === 'success') {
                            const newData = rows.filter(
                                row => row._id !== user._id
                            );
                            setRows(newData);
                        }
                        swal({ text: res.message, icon: res.status });
                    })
                    .catch(err => {
                        swal({
                            text: 'There was an error. Please try again.',
                            icon: 'error'
                        });
                    });
            } else {
                return swal('Deletion cancelled.', { icon: 'success' });
            }
        });
    };

    const { loading, error, data } = useQuery(ALL_USER_QUERY);

    if (loading || error) {
        return (
            <>
                <div className="w-full flex justify-center text-center font-bold text-lg p-4 text-slate-800">
                    Loading Data...
                </div>
            </>
        );
    }

    socket.off('registered').on('registered', x => {
        setRows(pre => [...pre, x]);
    });
    socket.off('updated').on('updated', x => {
        const newData = rows.filter(row => row._id !== x._id);
        setRows(pre => [x, ...newData]);
    });

    const CustomToolbar = () => {
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
                    className="bg-slate-600"
                    variant="contained"
                    endIcon={<AddCircleIcon />}>
                    <Link className="font-bold" href="/trainee-management/addEmployee">
                        Add Employee
                    </Link>
                </Button>
            </GridToolbarContainer>
        );
    };

    return (
        <div className="bg-gray-700 min-h-screen py-1">
            <div className="w-full bg-gray-100 rounded">
                <Box sx={{ height: 500, width: '100%' }}>
                    <DataGrid
                        rows={data.getAllUser}
                        columns={columns}
                        pageSize={25}
                        getRowId={row => row.id}
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
                <EditEmployeeData />
            </div>
        </div>
    );
}
