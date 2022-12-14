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
import { BallTriangle } from 'react-loader-spinner';
import dayjs from 'dayjs';
import swal from 'sweetalert';
import { getCookie } from 'cookies-next';

export default function AddEmployee() {
    const [loader, setLoader] = useState(false);
    const openModal = useSelector(state => state.common.isAddEmployeeModalOpen);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        dob: dayjs().unix().toString(),
        currentOfficeJoinDate: dayjs().unix().toString(),
        dateOfPRL: dayjs().unix().toString()
    });

    const handleClose = () => {
        dispatch(addEmployeeModalToggle());
    };

    const submitForm = () => {
        setLoader(true);
        fetch(process.env.BASE_URL + '/employee/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + getCookie(process.env.ACCESS_TOKEN)
            },
            body: JSON.stringify(formData)
        })
            .then(r => r.json())
            .then(res => {
                if (res.status) {
                    swal(res.message, { icon: 'success' });
                } else {
                    swal(res.message, { icon: 'error' });
                }
            })
            .catch(err => {
                swal(err.message, { icon: 'error' });
            })
            .finally(() => {
                setLoader(false);
            });
    };

    return (
        <>
            {!loader && (
                <Dialog
                    open={openModal}
                    onClose={handleClose}
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
                                    label="????????? (???????????????)"
                                    id="nameBn"
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
                                    label="????????? (??????????????????)"
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
                                    label="???-????????????"
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
                                    id="phone"
                                    label="?????????????????? ???????????????"
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
                                    label="????????????"
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
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        className="w-full"
                                        id="dob"
                                        label="Date of Birth"
                                        value={dayjs
                                            .unix(parseInt(formData.dob))
                                            .format('MM/DD/YYYY')}
                                        onChange={val => {
                                            setFormData(pre => ({
                                                ...pre,
                                                dob: val.unix().toString()
                                            }));
                                        }}
                                        renderInput={params => (
                                            <TextField {...params} />
                                        )}
                                    />
                                </LocalizationProvider>
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        className="w-full"
                                        id="currentOfficeJoinDate"
                                        label="Current Office Join Date"
                                        value={dayjs
                                            .unix(
                                                parseInt(
                                                    formData.currentOfficeJoinDate
                                                )
                                            )
                                            .format('MM/DD/YYYY')}
                                        onChange={val => {
                                            setFormData(pre => ({
                                                ...pre,
                                                currentOfficeJoinDate: val
                                                    .unix()
                                                    .toString()
                                            }));
                                        }}
                                        renderInput={params => (
                                            <TextField {...params} />
                                        )}
                                    />
                                </LocalizationProvider>
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        className="w-full"
                                        id="dateOfPRL"
                                        label="PRL Date"
                                        value={dayjs
                                            .unix(parseInt(formData.dateOfPRL))
                                            .format('MM/DD/YYYY')}
                                        onChange={val => {
                                            setFormData(pre => ({
                                                ...pre,
                                                dateOfPRL: val.unix().toString()
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
            )}
            <div className="absolute bg-slate-700 top-0 left-0 h-screen w-screen justify-center items-center flex">
                <BallTriangle
                    height={120}
                    width={120}
                    radius={5}
                    color="#4fa94d"
                    ariaLabel="ball-triangle-loading"
                    wrapperClass={{}}
                    wrapperStyle=""
                    visible={loader}
                    className="absolute top-0 left-0"
                />
            </div>
        </>
    );
}
