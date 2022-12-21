import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import LoginIcon from '@mui/icons-material/Login';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import swal from 'sweetalert';
import { login } from '../../redux/state/auth/authSlice';
import { setCookie } from 'cookies-next';

const index = () => {
    const [loading, setLoading] = React.useState(false);
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const isLoggedIn = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const router = useRouter();

    const onChangePhone = val => {
        if (val.length > 11) return false;
        for (let i = 0; i < val.length; i++) {
            if (!(val[i] >= '0' && val[i] <= '9')) {
                return false;
            }
        }
        setMobile(val);
        return true;
    };
    const onPasswordChange = val => {
        if (val.length <= 15) setPassword(val);
    };

    const onSubmit = async () => {
        if (mobile.length < 1 || password.length < 4) return;
        setLoading(state => !state);
        const response = await fetch(process.env.BASE_URL + '/user/login', {
            method: 'POST',
            body: JSON.stringify({ mobile, password }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        setLoading(false);
        swal(data.message, { icon: data.status });

        if (data.status === 'success') {
            setCookie(process.env.COOKIE_KEY_TOKEN, data.token);
            dispatch(
                login({
                    isLoggedIn: true,
                    token: data.token,
                    userData: data.userData
                })
            );
            router.push('/');
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            console.log(isLoggedIn);
            // router.push('/');
        } else {
            console.log(isLoggedIn);
        }
    }, []);

    return (
        <>
            <div className="absolute top-0 bg-slate-200 h-screen w-screen flex items-center justify-center  shadow-xl">
                <div className="w-1/2 md:w-3/4 h-3/4 flex flex-row justify-between">
                    <div className="hidden md:flex w-full justify-center items-center overflow-hidden rounded-l-xl">
                        <Image
                            src="/images/gif.gif"
                            width={100}
                            height={100}
                            className="w-full min-h-full bg-cover"
                            alt="Logo"
                        />
                    </div>
                    <div className="bg-slate-300 w-full flex justify-center items-center rounded-xl md:rounded-r-xl md:rounded-l-none">
                        <div className="flex justify-center items-center flex-col space-y-8 w-full">
                            <div className="flex justify-center items-center flex-col">
                                <div className="flex justify-center items-center">
                                    <Image
                                        src="/images/logo-bd.png"
                                        width={100}
                                        height={100}
                                        alt="Logo"
                                    />
                                </div>
                                <div className="font-bold text-3xl text-gray-700">
                                    WELCOME
                                </div>
                            </div>
                            <div className="w-3/4 space-y-3 items-center justify-center flex flex-col">
                                <TextField
                                    label="Phone"
                                    variant="outlined"
                                    fullWidth
                                    className="w-full"
                                    value={mobile}
                                    onChange={e =>
                                        onChangePhone(e.target.value)
                                    }
                                />
                                <TextField
                                    id="fullWidth"
                                    label="Password"
                                    variant="outlined"
                                    fullWidth
                                    className="w-full"
                                    value={password}
                                    onChange={e =>
                                        onPasswordChange(e.target.value)
                                    }
                                />
                                <LoadingButton
                                    onClick={onSubmit}
                                    endIcon={<LoginIcon />}
                                    loading={loading}
                                    loadingPosition="end"
                                    variant="contained"
                                    className="bg-slate-600">
                                    LOGIN
                                </LoadingButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default index;
