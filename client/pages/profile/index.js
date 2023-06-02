import React, { useContext, useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import swal from 'sweetalert';
import { SocketContext } from '../socketContext';
import BasicData from '../../components/Profile/BasicData';
import styles from '../../styles/styles.module.scss';
import axios from 'axios';

const Index = () => {
    const [rateValue, setRateValue] = useState(null);
    const [rate, setRate] = useState(10.0);
    const [file, setFile] = useState(null);
    const socket = useContext(SocketContext);

    const ratingHandler = rate => {
        rate = parseFloat(rate);
        if (rate > 10 || rate < 0) swal('Rate should be between 0 and 10');
        else {
            fetch(process.env.BASE_URL + '/user/rate/' + rate, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    authorization:
                        'Bearer ' + getCookie(process.env.ACCESS_TOKEN)
                }
            })
                .then(r => r.json())
                .then(data => {
                    if (data.status) {
                        setRateValue(null);
                        setRate(data.rate);
                    } else {
                        swal(data.message, { icon: 'error' });
                    }
                })
                .catch(error => {
                    swal(error.message, { icon: 'error' });
                });
        }
    };

    const getRate = () => {
        fetch(process.env.BASE_URL + '/user/getRate')
            .then(r => r.json())
            .then(data => {
                if (data.status) {
                    setRate(data.rate);
                } else {
                    swal(data.message, { icon: 'error' });
                }
            })
            .catch(error => {
                swal(error.message, { icon: 'error' });
            });
    };

    const uploadFile = () => {
        if (!file) {
            swal('No file selected!', { icon: 'error' });
            return;
        }

        const fd = new FormData();
        fd.append('image', file);

        axios
            .post(process.env.BASE_URL + '/upload', fd, {
                onUploadProgress: ProgressEvent => {
                    console.log(ProgressEvent.progress * 100);
                },
                headers: {
                    authorization:
                        'Bearer ' + getCookie(process.env.ACCESS_TOKEN)
                }
            })
            .then(res => {
                console.log(res);
            })
            .catch(err => swal(err.message, { icon: 'error' }));
    };

    socket.off('updateRating').on('updateRating', d => {
        getRate();
    });

    useEffect(() => {
        getRate();
    }, []);

    return (
        <>
            <div className="mx-0 pb-2 bg-white flex flex-col items-center">
                <div className="lg:w-4/6 w-full sm:w-5/6 rounded overflow-hidden">
                    <div className="w-full items-center justify-center flex font-bold text-2xl py-3">
                        My Profile
                    </div>
                    <div className="space-y-1 mt-1">
                        {/* Basic Info Section */}
                        <div className="w-full items-center bg-gray-400 py-2">
                            <BasicData />
                        </div>

                        {/* Profile Picture Update Section */}
                        <div className="w-full items-center bg-gray-400 py-2 flex justify-between px-2 flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                            <span className="w-full bg-gray-400 rounded px-2 py-1 text-center">
                                Upload Profile Picture
                            </span>
                            <input
                                className="w-full bg-slate-200 rounded px-2 py-1"
                                type="file"
                                accept=".jpeg, .jpg, .png"
                                onChange={e => setFile(e.target.files[0])}
                            />
                            <input
                                className={[
                                    'w-full rounded px-2 py-1 cursor-pointer',
                                    styles.faceLoginBtn
                                ].join(' ')}
                                type="button"
                                value="Upload"
                                onClick={uploadFile}
                            />
                        </div>

                        <div className="w-full items-center bg-gray-400 py-2">
                            <div className="text-center text-xl font-bold text-gray-800">
                                Site Rating
                            </div>
                            <div className="items-center">
                                <div className="text-center">
                                    Current Rating: {rate.toFixed(2)}/10
                                </div>
                                <div className="items-center flex justify-center space-x-1">
                                    <input
                                        className="px-2 rounded text-center"
                                        type="text"
                                        placeholder="Input rating..."
                                        value={rateValue}
                                        onChange={e => {
                                            const rate = e.target.value;
                                            setRateValue(rate);
                                        }}
                                    />
                                    <input
                                        className={
                                            'px-2 rounded bg-slate-700 text-white cursor-pointer ' +
                                            styles.login_button
                                        }
                                        type="button"
                                        value="Rate Now"
                                        onClick={() => {
                                            ratingHandler(rateValue);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Index;
