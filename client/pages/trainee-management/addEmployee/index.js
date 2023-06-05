import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ADD_EMPLOYEE_MUTATION } from '../../../components/graphql/query';
import styles from '../../../styles/styles.module.scss';
import dayjs from 'dayjs';
import swal from 'sweetalert';
import { getCookie } from 'cookies-next';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

export default function AddEmployee() {
    const [phoneError, setPhoneError] = useState(0);
    const [mailOtp, setMailOtp] = useState(0);
    const router = useRouter();
    const [formData, setFormData] = useState({
        nameBn: '',
        nameEn: '',
        email: '',
        phone: '',
        designation: '',
        currentOffice: '',
        dob: dayjs().unix().toString(),
        currentOfficeJoinDate: dayjs().unix().toString(),
        dateOfPRL: dayjs().unix().toString(),
        token: getCookie(process.env.ACCESS_TOKEN)
    });

    const [submitForm, { loading, error, data }] = useMutation(
        ADD_EMPLOYEE_MUTATION
    );

    const handleSubmission = () => {
        console.log(formData);
        if (mailOtp === -1 && phoneError === -1) {
            submitForm({ variables: formData });
        }
    };

    const checkPhone = phone => {
        if (phone.length >= 11) {
            fetch(process.env.BASE_URL + '/user/checkPhone/' + phone)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    if (data.status) setPhoneError(1);
                    else setPhoneError(-1);
                })
                .catch(error => {
                    swal(error.message, { icon: 'error' });
                    setPhoneError(0);
                });
        } else {
            setPhoneError(0);
        }
    };

    const sendOtp = email => {
        fetch(process.env.BASE_URL + '/user/checkMail/' + email)
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.status) {
                    setMailOtp(1);
                    swal(data.message, { icon: 'success' });
                }
            })
            .catch(error => {
                swal(error.message, { icon: 'error' });
            });
    };

    const verifyOtp = (email, otp) => {
        fetch(process.env.BASE_URL + '/user/verifyOtp/' + email + '+' + otp)
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.status) {
                    setMailOtp(-1);
                    swal(data.message, { icon: 'success' });
                } else {
                    setMailOtp(2);
                }
            })
            .catch(error => {
                swal(error.message, { icon: 'error' });
            });
    };

    if (!loading && data) {
        swal({
            title: 'Success',
            text:
                data.createUser.message +
                '\nPlease wait a few seconds to be redirected.',
            icon: 'success'
        });
        setTimeout(() => {
            router.push('/trainee-management');
        }, 2000);
    } else if (error) {
        swal({ title: 'Error', text: error.createUser.message, icon: 'error' });
    }

    return (
        <>
            <div className="w-full flex flex-col justify-center">
                <div className="w-full p-2 font-bold text-3xl text-center text-gray-700">
                    Add New Employee
                </div>
                <div className="w-full flex flex-col justify-center items-center">
                    <div className="w-5/6 bg-slate-400 p-4 md:w-1/2 my-1 flex flex-col items-center space-y-2 rounded">
                        <TextField
                            className="w-full bg-white rounded"
                            label="নাম (বাংলা)"
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
                            className="w-full bg-white rounded"
                            id="nameEn"
                            label="নাম (ইংরেজী)"
                            onChange={e => {
                                const { id, value } = e.target;
                                setFormData(pre => ({
                                    ...pre,
                                    [id]: value
                                }));
                            }}
                        />
                        <div className="w-full flex space-x-2">
                            <TextField
                                className="w-5/6 bg-white rounded"
                                id="email"
                                label="ই-মেইল"
                                onChange={e => {
                                    const { id, value } = e.target;
                                    setFormData(pre => ({
                                        ...pre,
                                        [id]: value
                                    }));
                                }}
                            />
                            <Button
                                className="w-1/6 bg-white"
                                onClick={() => {
                                    if (mailOtp == 0) sendOtp(formData.email);
                                }}>
                                {mailOtp == 0
                                    ? 'Send OTP'
                                    : mailOtp > 0
                                    ? 'Resend OTP'
                                    : 'Email verified'}
                            </Button>
                        </div>

                        <div
                            className={`text-red-400 w-full text-xs ${
                                mailOtp < 1 && 'hidden'
                            }`}>
                            <TextField
                                className="w-full bg-white rounded"
                                label="OTP"
                                id="otp"
                                onChange={e => {
                                    const otp = e.target.value;
                                    if (otp.length == 6)
                                        verifyOtp(formData.email, otp);
                                }}
                            />
                            <div
                                className={`text-red-400 text-xs ${
                                    mailOtp < 2 && 'hidden'
                                }`}>
                                Incorrect OTP.
                            </div>
                        </div>
                        <TextField
                            className="w-full bg-white rounded"
                            id="phone"
                            label="মোবাইল নম্বর"
                            value={formData.phone}
                            onChange={e => {
                                let { id, value } = e.target;
                                value = value.replace(/\D/g, '');
                                checkPhone(value);
                                setFormData(pre => ({
                                    ...pre,
                                    [id]: value
                                }));
                            }}
                        />
                        <div
                            className={`text-red-400 text-xs w-full ${
                                phoneError <= 0 && 'hidden'
                            }`}>
                            This phone number is already in use.
                        </div>
                        <TextField
                            className="w-full bg-white rounded"
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
                            className="w-full bg-white rounded"
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
                                className="w-full bg-white rounded"
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
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                className="w-full bg-white rounded"
                                id="currentOfficeJoinDate"
                                label="Current Office Join Date"
                                value={dayjs
                                    .unix(
                                        parseInt(formData.currentOfficeJoinDate)
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
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                className="w-full bg-white rounded"
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
                        <input
                            type="button"
                            value="SUBMIT"
                            className={[
                                'py-1 px-3 text-lg rounded',
                                styles.login_button
                            ].join(' ')}
                            onClick={handleSubmission}
                        />
                    </div>
                </div>
            </div>
            {/* {!loader && (
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
                                    label="নাম (বাংলা)"
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
                                    label="নাম (ইংরেজী)"
                                    onChange={e => {
                                        const { id, value } = e.target;
                                        setFormData(pre => ({
                                            ...pre,
                                            [id]: value
                                        }));
                                    }}
                                />
                                <div className="w-full">
                                    <TextField
                                        className="w-5/6"
                                        id="email"
                                        label="ই-মেইল"
                                        onChange={e => {
                                            const { id, value } = e.target;
                                            setFormData(pre => ({
                                                ...pre,
                                                [id]: value
                                            }));
                                        }}
                                    />
                                    <Button
                                        className="w-1/6"
                                        onClick={() => {
                                            if (mailOtp == 0)
                                                sendOtp(formData.email);
                                        }}>
                                        {mailOtp == 0
                                            ? 'Send OTP'
                                            : mailOtp > 0
                                            ? 'Resend OTP'
                                            : 'Email verified'}
                                    </Button>
                                </div>

                                <div
                                    className={`text-red-400 text-xs ${
                                        mailOtp < 1 && 'hidden'
                                    }`}>
                                    <TextField
                                        className="w-full"
                                        label="OTP"
                                        id="otp"
                                        onChange={e => {
                                            const otp = e.target.value;
                                            if (otp.length == 6)
                                                verifyOtp(formData.email, otp);
                                        }}
                                    />
                                    <div
                                        className={`text-red-400 text-xs ${
                                            mailOtp < 2 && 'hidden'
                                        }`}>
                                        Incorrect OTP.
                                    </div>
                                </div>
                                <TextField
                                    className="w-full"
                                    id="phone"
                                    label="মোবাইল নম্বর"
                                    value={formData.phone}
                                    onChange={e => {
                                        let { id, value } = e.target;
                                        value = value.replace(/\D/g, '');
                                        checkPhone(value);
                                        setFormData(pre => ({
                                            ...pre,
                                            [id]: value
                                        }));
                                    }}
                                />
                                <div
                                    className={`text-red-400 text-xs ${
                                        !phoneError && 'hidden'
                                    }`}>
                                    This phone number is already in use.
                                </div>
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
            )} */}
            {/* <div className="absolute bg-slate-700 top-0 left-0 h-screen w-screen justify-center items-center flex">
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
            </div> */}
        </>
    );
}
