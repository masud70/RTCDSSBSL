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

export default function index() {
    const openModal = useSelector(
        state => state.common.isUpdateCourseInfoModalOpen
    );
    const data = useSelector(state => state.common.updateCourseInfoData);
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({});

    const handleClose = () => {
        dispatch(updateCourseInfoModalToggle());
    };

    const submitForm = () => {
        const url = process.env.BASE_URL + '/employee/updateCourse';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer' + auth.token
            },
            body: JSON.stringify(formData)
        })
            .then(r => r.json())
            .then(res => {
                if (res.status) {
                    swal({
                        title: 'Success',
                        text:
                            res.message +
                            '\nPlease reload to see updated result.',
                        icon: 'success'
                    });
                    setFormData({});
                    handleClose();
                } else {
                    swal({
                        title: 'Error',
                        text: 'There is an error. Please check all the fields.',
                        icon: 'error'
                    });
                }
            })
            .catch(err => {
                swal({ title: 'Error', text: err.message, icon: 'error' });
            });
    };

    useEffect(() => {
        if (data.courseInfo) {
            setFormData(data.courseInfo);
        } else {
            setFormData({});
        }
        setFormData(pre => ({ ...pre, userId: data._id }));
    }, [data]);

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
                                    label="???????????????"
                                    value={formData.startDate}
                                    onChange={val => {
                                        setFormData(pre => ({
                                            ...pre,
                                            startDate: val.format('MM/DD/YYYY')
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
                                    label="???????????????"
                                    value={formData.endDate}
                                    onChange={val => {
                                        setFormData(pre => ({
                                            ...pre,
                                            endDate: val.format('MM/DD/YYYY')
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
                    <Button onClick={() => submitForm()}>Save Now</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
