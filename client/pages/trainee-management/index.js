import React, { useContext, useEffect, useState } from 'react';
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
import EditEmployeeData from './editEmployee';
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector
} from '@mui/x-data-grid';
import swal from 'sweetalert';
import { useMutation, useQuery } from '@apollo/client';
import {
    ALL_USER_QUERY,
    DELETE_USER_MUTATION
} from '../../components/graphql/query';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';

export default function Index() {
    const dispatch = useDispatch();
    const [rows, setRows] = useState([]);
    const socket = useContext(SocketContext);
    const [pageSize, setPageSize] = useState(10);
    const router = useRouter();

    const [
        deleteUser,
        { loading: deleteLoading, error: deleteError, data: deleteData }
    ] = useMutation(DELETE_USER_MUTATION);

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
                                    onClick={() =>
                                        router.push(
                                            '/trainee-management/editEmployee/' +
                                                data.row.id
                                        )
                                    }>
                                    <EditIcon className="text-green-700" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete" placement="top">
                                <IconButton
                                    onClick={() => deleteHandler(data.row.id)}>
                                    <DeleteIcon className="text-red-500" />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </>
                );
            }
        }
    ];

    const deleteHandler = id => {
        swal({
            text: 'Do you want to delete this employee?',
            buttons: {
                cancel: 'Cancel',
                delete: 'Delete'
            }
        }).then(data => {
            if (data === 'delete') {
                deleteUser({
                    variables: {
                        id: id,
                        token: getCookie(process.env.ACCESS_TOKEN)
                    }
                });
            } else {
                return swal('Deletion cancelled.', { icon: 'success' });
            }
        });
    };

    const { loading, error, data, refetch } = useQuery(ALL_USER_QUERY);

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
                    <Link
                        className="font-bold"
                        href="/trainee-management/addEmployee">
                        Add Employee
                    </Link>
                </Button>
            </GridToolbarContainer>
        );
    };

    if (deleteData) {
        swal({ text: deleteData.deleteUser.message, icon: 'success' });
        refetch();
    }
    if (deleteError) swal({ text: deleteError.message, icon: 'error' });

    return (
        <div className="bg-gray-700 min-h-screen py-1">
            <div className="w-full bg-gray-100 rounded">
                <Box sx={{ width: '100%' }}>
                    <DataGrid
                        rows={data.getAllUser}
                        columns={columns}
                        pageSize={pageSize}
                        getRowId={row => row.id}
                        rowsPerPageOptions={[10, 20, 50]}
                        checkboxSelection
                        autoHeight
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                        components={{
                            Toolbar: CustomToolbar
                        }}
                        onPageSizeChange={setPageSize}
                    />
                </Box>
                <AddEmployee />
                <EditEmployeeData />
            </div>
        </div>
    );
}
