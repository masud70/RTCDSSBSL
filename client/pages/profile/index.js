import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from 'cookies-next';
import swal from 'sweetalert';

const Index = () => {
    const [rateValue, setRateValue] = useState(null);
    const [rate, setRate] = useState(10.0);

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

    useEffect(() => {
        getRate();
    }, []);

    return (
        <>
            <div className="mx-0 pb-2 bg-white">
                <div className="w-full items-center justify-center flex font-bold text-2xl py-3">
                    My Profile
                </div>
                <div className="space-y-1 mt-1">
                    <div className="w-full items-center bg-gray-400 py-2">
                        <div className="text-center text-xl font-bold text-gray-800">
                            Site Rating
                        </div>
                        <div className="items-center">
                            <div className="text-center">
                                Current Rating: {rate}/10
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
                                    className="px-2 rounded bg-slate-700 text-white cursor-pointer"
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
        </>
    );
};

export default Index;
