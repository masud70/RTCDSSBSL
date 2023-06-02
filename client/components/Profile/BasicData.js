import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { GET_USER_DATA } from '../graphql/query';
import { getCookie } from 'cookies-next';

const BasicData = () => {
    const variables = {
        token: getCookie(process.env.ACCESS_TOKEN)
    };
    const { loading, error, data } = useQuery(GET_USER_DATA, { variables });

    const keyArray = {
        nameBn: 'নাম (বাংলা)',
        nameEn: 'নাম (ইংরেজী)',
        email: 'ই-মেইল',
        phone: 'মোবাইল',
        dob: 'জন্ম তারিখ',
        designation: 'পদবী',
        currentOffice: 'বর্তমান কর্মস্থল'
    };
    const convert = (key, value) => {
        if (keyArray[key]) {
            return (
                <div className="flex bg-slate-300 px-2 py-1 rounded-sm text-sm font-bold text-slate-700">
                    <div className='w-4/6'>{keyArray[key]}:</div>
                    <div className='w-full'>{value}</div>
                </div>
            );
        } else return null;
    };

    if (loading)
        return (
            <>
                <div className="w-full text-center font-bold text-xl text-gray-800">
                    Loading Data...
                </div>
            </>
        );
    if (error)
        return (
            <>
                <div className="w-full text-center font-bold text-xl text-gray-800">
                    An error occured!
                </div>
            </>
        );

    return (
        <>
            <div className="w-full p-2 flex flex-row space-x-1">
                <div className="w-full bg-slate-100 rounded p-1 items-center justify-center flex flex-col">
                    <img
                        className=" w-72 max-h-96 rounded"
                        src="http://localhost:5000/images/masud.jpg"
                    />
                    <span className="text-xl font-bold text-slate-700">
                        Md. Masud Mazumder
                    </span>
                    <span className="text-sm">
                        ({data.getUser.designation})
                    </span>
                </div>
                <div className="w-full md:px-24 bg-slate-100 rounded p-1 space-y-1">
                    <div className="font-bold w-full text-center text-lg">
                        Informations
                    </div>
                    {Object.keys(data.getUser).map(key => {
                        return convert(key, data.getUser[key]);
                    })}
                </div>
            </div>
        </>
    );
};

export default BasicData;
