import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import { updateCourseInfoModalToggle } from '../../redux/state/common/commonSlice';
import dayjs from 'dayjs';
import { useMutation } from '@apollo/client';
import { INSERT_UPDATE_COURSE_MUTATION } from '../graphql/query';
import { useRouter } from 'next/router';

export default function index() {
    const openModal = useSelector(
        state => state.common.isUpdateCourseInfoModalOpen
    );

    const dataPrev = useSelector(state => state.common.updateCourseInfoData);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({});
    const router = useRouter();

    const handleClose = () => {
        dispatch(updateCourseInfoModalToggle());
    };

    const [insertOrUpdate, { loading, error, data }] = useMutation(
        INSERT_UPDATE_COURSE_MUTATION
    );

    useEffect(() => {
        if (dataPrev.Course) {
            setFormData({
                courseName: dataPrev.Course.courseName,
                startDate: dataPrev.Course.startDate,
                endDate: dataPrev.Course.endDate
            });
        } else {
            setFormData({});
        }
        setFormData(pre => ({ ...pre, UserId: dataPrev.id }));
    }, [dataPrev]);

    if (!loading && data) {
        swal({
            title: 'Success',
            text:
                data.insertOrUpdateCourse.message +
                '\nPlease wait a few second.',
            icon: 'success'
        });
        setTimeout(() => {
            router.reload(window.location.pathname);
        }, 3000);
    }
    if (error) {
        swal({
            title: 'Error',
            text: error.message,
            icon: 'error'
        });
    }

    return (
        <>
            <Dialog
                open={openModal}
                onClose={handleClose}
                maxWidth={'sm'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description">
                <DialogTitle className="w-full items-center flex justify-center font-bold">
                    Update Training Information
                </DialogTitle>
                <DialogContent>
                    <DialogContentText tabIndex={-1}>
                        <form
                            onSubmit={e => console.log(e)}
                            className="my-2 space-y-2">
                            <TextField
                                className="w-full"
                                label="Course Name"
                                id="courseName"
                                value={
                                    formData.courseName
                                        ? formData.courseName
                                        : ''
                                }
                                onChange={e => {
                                    const { id, value } = e.target;
                                    setFormData(pre => ({
                                        ...pre,
                                        [id]: value
                                    }));
                                }}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    className="w-full"
                                    id="startDate"
                                    label="তারিখ"
                                    value={parseInt(formData.startDate)}
                                    onChange={val => {
                                        setFormData(pre => ({
                                            ...pre,
                                            startDate: (
                                                dayjs(val).unix() * 1000
                                            ).toString()
                                        }));
                                    }}
                                    renderInput={params => (
                                        <TextField {...params} />
                                    )}
                                />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    className="w-full"
                                    id="endDate"
                                    label="মেয়াদ"
                                    value={parseInt(formData.endDate)}
                                    onChange={val => {
                                        setFormData(pre => ({
                                            ...pre,
                                            endDate: (
                                                dayjs(val).unix() * 1000
                                            ).toString()
                                        }));
                                    }}
                                    renderInput={params => (
                                        <TextField {...params} />
                                    )}
                                />
                            </LocalizationProvider>
                        </form>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        onClick={() => {
                            console.log(formData);
                            insertOrUpdate({ variables: formData });
                        }}>
                        Save Now
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
