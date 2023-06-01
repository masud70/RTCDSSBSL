import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import { SocketContext } from '../socketContext';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import swal from 'sweetalert';
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector
} from '@mui/x-data-grid';
import { updateCourseInfoModalToggle } from '../../redux/state/common/commonSlice';
import AddTrainingInfo from '../../components/AddTrainingInfo';

export default function Index() {
    const dispatch = useDispatch();
    const [rows, setRows] = useState([]);
    const socket = useContext(SocketContext);

    const columns = [
        {
            field: 'id',
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
            width: 140
        },
        {
            field: 'dateOfPRL',
            headerName: 'পিআরএল গমনের তারিখ',
            width: 140
        },
        {
            field: 'dob',
            headerName: 'জন্ম তারিখ',
            width: 110
        },
        {
            field: 'courseName',
            headerName: 'প্রশিক্ষন কোর্সের নাম',
            width: 200,
            valueGetter: data =>
                data.row.courseInfo ? data.row.courseInfo.courseName : ''
        },
        {
            field: 'startDate',
            headerName: 'তারিখ',
            width: 100,
            valueGetter: data =>
                data.row.courseInfo ? data.row.courseInfo.startDate : ''
        },
        {
            field: 'endDate',
            headerName: 'মেয়াদ',
            width: 100,
            valueGetter: data =>
                data.row.courseInfo ? data.row.courseInfo.endDate : ''
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 70,
            renderCell: data => {
                return (
                    <>
                        <div className="w-full items-center justify-center flex">
                            <Tooltip title="Edit training data" placement="top">
                                <IconButton
                                    onClick={() => {
                                        dispatch(
                                            updateCourseInfoModalToggle({
                                                data: data.row
                                            })
                                        );
                                    }}>
                                    <EditIcon className="text-green-700" />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </>
                );
            }
        }
    ];

    const columnGroupingModel = [
        {
            groupId: 'courseInfo',
            headerName: 'প্রশিক্ষন গ্রহনের তথ্যাবলী',
            description: '',
            children: [
                { field: 'courseName' },
                { field: 'startDate' },
                { field: 'endDate' }
            ]
        }
    ];

    useEffect(() => {
        fetch(process.env.BASE_URL + '/employee/getAll')
            .then(res => res.json())
            .then(data => {
                setRows(data.data);
            })
            .catch(err => console.error(err));
    }, []);

    const CustomToolbar = () => {
        return (
            <GridToolbarContainer className="flex space-x-4">
                <GridToolbarColumnsButton className="font-bold" />
                <GridToolbarFilterButton className="font-bold" />
                <GridToolbarDensitySelector className="font-bold" />
                <GridToolbarExport
                    className="font-bold"
                    printOptions={{ disableToolbarButton: true }}
                />
            </GridToolbarContainer>
        );
    };

    return (
        <div>
            <Box sx={{ width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={100}
                    getRowId={row => row.id}
                    rowsPerPageOptions={[25, 50, 100]}
                    checkboxSelection
                    autoHeight
                    disableSelectionOnClick
                    experimentalFeatures={{
                        newEditingApi: true,
                        columnGrouping: true
                    }}
                    columnGroupingModel={columnGroupingModel}
                    components={{
                        Toolbar: CustomToolbar
                    }}
                />
            </Box>
            <AddTrainingInfo />
        </div>
    );
}
