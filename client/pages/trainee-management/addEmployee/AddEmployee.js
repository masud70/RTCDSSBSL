import React, { useState } from 'react';
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
import { addEmployeeModalToggle } from '../../../redux/state/common/commonSlice';
import axios from 'axios';
import dayjs from 'dayjs';
import swal from 'sweetalert';

const visible = [
    [0, 0],
    [0, 0],
    [0, 0]
];

export default function AddEmployee() {
    const openModal = useSelector(state => state.common.isAddEmployeeModalOpen);
    const dispatch = useDispatch();
    const [timer, setTimer] = useState(null);
    const [visibility, setVisibility] = useState([0, 1, 1]);
    const [formData, setFormData] = useState({
        dob: dayjs().format('MM/DD/YYYY'),
        currentOfficeJoinDate: dayjs().format('MM/DD/YYYY'),
        dateOfPRL: dayjs().format('MM/DD/YYYY')
    });

    const handleClose = () => {
        dispatch(addEmployeeModalToggle());
    };
    const handleChange = data => {
        if (timer) {
            clearTimeout(timer);
            setTimer(null);
        }
        if (data.value === '') {
            data.idx.v = 0;
            const vis = calculateVisibility(data.idx);
            setVisibility(vis);
        } else {
            setTimer(
                setTimeout(() => {
                    axios
                        .post('http://localhost:5000/addEmployee/check', data)
                        .then(res => {
                            if (!res.data.status) {
                                console.log(res.data);
                                const vis = calculateVisibility(data.idx);
                                setVisibility(vis);
                            }
                        })
                        .catch(err => console.log(err));
                }, 3000)
            );
        }
    };

    const calculateVisibility = ({ i, j, v }) => {
        visible[i][j] = v;
        console.log(visible);
        let vis = visibility;
        for (let ii = 0; ii < visible.length - 1; ii++) {
            let sum = 0;
            for (let jj = 0; jj < visible[ii].length; jj++) {
                sum += visible[ii][jj];
            }
            vis[ii + 1] = !(sum === visible[ii].length) ? 1 : 0;
        }
        console.log('Visibility', visibility);
        return vis;
    };
    const submitForm = () => {
        console.log(formData);
        axios
            .post(process.env.BASE_URL + '/employee/register', formData)
            .then(res => {
                console.log(res);
                swal(res.data.message, {
                    icon: res.data.status ? 'success' : 'error'
                });
                handleClose();
            })
            .catch(err => {
                console.log(err);
                swal(err.message, { icon: 'error' });
                handleClose();
            });
    };

    return (
        <>
            <Dialog
                open={openModal}
                onClose={handleClose}
                // fullWidth={'sm'}
                maxWidth={'sm'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description">
                <DialogTitle className="w-full items-center flex justify-center font-bold">
                    Add New Employee
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
                                // hidden={visibility[0]}
                                onChange={e => {
                                    const { id, value } = e.target;
                                    setFormData(pre => ({
                                        ...pre,
                                        [id]: value
                                    }));
                                    // handleChange({
                                    //     type: 'nameBn',
                                    //     value: e.target.value,
                                    //     idx: { i: 0, j: 0, v: 1 }
                                    // });
                                }}
                            />
                            <TextField
                                className="w-full"
                                id="nameEn"
                                label="Name English"
                                // hidden={visibility[0]}
                                onChange={e => {
                                    const { id, value } = e.target;
                                    setFormData(pre => ({
                                        ...pre,
                                        [id]: value
                                    }));
                                    // handleChange({
                                    //     type: 'nameEn',
                                    //     value: e.target.value,
                                    //     idx: { i: 0, j: 1, v: 1 }
                                    // });
                                }}
                            />
                            <TextField
                                className="w-full"
                                id="email"
                                label="Email Address"
                                // hidden={visibility[1]}
                                onChange={e => {
                                    const { id, value } = e.target;
                                    setFormData(pre => ({
                                        ...pre,
                                        [id]: value
                                    }));
                                    // handleChange({
                                    //     type: 'email',
                                    //     value: e.target.value,
                                    //     idx: { i: 1, j: 0, v: 1 }
                                    // });
                                }}
                            />
                            <TextField
                                className="w-full"
                                id="mobile"
                                label="Mobile"
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
