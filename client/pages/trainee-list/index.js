import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
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
import { useQuery } from '@apollo/client';
import { ALL_USER_QUERY } from '../../components/graphql/query';
import dayjs from 'dayjs';

export default function Index() {
    const [pageSize, setPageSize] = useState(10);
    const dispatch = useDispatch();

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
            field: 'courseName',
            headerName: 'প্রশিক্ষন কোর্সের নাম',
            width: 200,
            valueGetter: data =>
                data.row.Course ? data.row.Course.courseName : ''
        },
        {
            field: 'startDate',
            headerName: 'তারিখ',
            width: 100,
            valueGetter: data =>
                data.row.Course
                    ? dayjs(parseInt(data.row.Course.startDate)).format(
                          'DD/MM/YYYY'
                      )
                    : ''
        },
        {
            field: 'endDate',
            headerName: 'মেয়াদ',
            width: 100,
            valueGetter: data =>
                data.row.Course
                    ? dayjs(parseInt(data.row.Course.endDate)).format(
                          'DD/MM/YYYY'
                      )
                    : ''
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

    return (
        <div>
            <Box sx={{ width: '100%' }}>
                <DataGrid
                    rows={data.getAllUser}
                    columns={columns}
                    pageSize={pageSize}
                    getRowId={row => row.id}
                    rowsPerPageOptions={[10, 20, 50]}
                    onPageSizeChange={setPageSize}
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
