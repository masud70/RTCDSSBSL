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
import { editEmployeeModalToggle } from '../../../redux/state/common/commonSlice';
import axios from 'axios';
import dayjs from 'dayjs';
import swal from 'sweetalert';

export default function index() {
    const openModal = useSelector(
        state => state.common.isEditEmployeeModalOpen
    );
    const data = useSelector(state => state.common.editModalData);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({});

    const handleClose = () => {
        dispatch(editEmployeeModalToggle());
    };

    const submitForm = () => {
        axios
            .post(process.env.BASE_URL + '/employee/update', formData)
            .then(res => {
                console.log(res);
                swal(res.data.message, {
                    icon: res.data.status
                });
                handleClose();
            })
            .catch(err => {
                console.log(err);
                swal(err.message, { icon: 'error' });
                handleClose();
            });
    };

    useEffect(() => {
        setFormData(data);
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
                    Edit Employee Data
                </DialogTitle>
                <DialogContent>
                    <DialogContentText tabIndex={-1}>
                        <form
                            onSubmit={e => console.log(e)}
                            className="my-2 space-y-2">
                            <TextField
                                className="w-full"
                                label="Name Bangla"
                                id="nameBn"
                                value={formData.nameBn}
                                onChange={e => {
                                    const { id, value } = e.target;
                                    setFormData(pre => ({
                                        ...pre,
                                        [id]: value
                                    }));
                                }}
                            />
                            <TextField
                                className="w-full"
                                id="nameEn"
                                label="Name English"
                                value={formData.nameEn}
                                onChange={e => {
                                    const { id, value } = e.target;
                                    setFormData(pre => ({
                                        ...pre,
                                        [id]: value
                                    }));
                                }}
                            />
                            <TextField
                                className="w-full"
                                id="email"
                                label="Email Address"
                                value={formData.email}
                                onChange={e => {
                                    const { id, value } = e.target;
                                    setFormData(pre => ({
                                        ...pre,
                                        [id]: value
                                    }));
                                }}
                            />
                            <TextField
                                className="w-full"
                                id="mobile"
                                label="Mobile"
                                value={formData.mobile}
                                onChange={e => {
                                    const { id, value } = e.target;
                                    setFormData(pre => ({
                                        ...pre,
                                        [id]: value
                                    }));
                                }}
                            />
                            <TextField
                                className="w-full"
                                id="designation"
                                label="পদবী"
                                value={formData.designation}
                                onChange={e => {
                                    const { id, value } = e.target;
                                    setFormData(pre => ({
                                        ...pre,
                                        [id]: value
                                    }));
                                }}
                            />
                            <TextField
                                className="w-full"
                                id="currentOffice"
                                label="Current Office"
                                value={formData.currentOffice}
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
                                    id="dob"
                                    label="Date of Birth"
                                    value={formData.dob}
                                    onChange={val => {
                                        setFormData(pre => ({
                                            ...pre,
                                            dob: val.format('MM/DD/YYYY')
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
                                    id="currentOfficeJoinDate"
                                    label="Current Office Join Date"
                                    value={formData.currentOfficeJoinDate}
                                    onChange={val => {
                                        setFormData(pre => ({
                                            ...pre,
                                            currentOfficeJoinDate:
                                                val.format('MM/DD/YYYY')
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
                                    id="dateOfPRL"
                                    label="PRL Date"
                                    value={formData.dateOfPRL}
                                    onChange={val => {
                                        setFormData(pre => ({
                                            ...pre,
                                            dateOfPRL: val.format('MM/DD/YYYY')
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
                    <Button onClick={() => submitForm()}>Add Now</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

/*
dob: dayjs().format('MM/DD/YYYY'),
        currentOfficeJoinDate: dayjs().format('MM/DD/YYYY'),
        dateOfPRL: dayjs().format('MM/DD/YYYY')
*/
