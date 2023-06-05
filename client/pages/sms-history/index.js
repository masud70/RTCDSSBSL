import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import React, { useState } from 'react';
import styles from '../../styles/styles.module.scss';

const Index = () => {
    const [smsState, setSmsState] = useState(1);
    const [smsData, setSmsData] = useState({});

    const onChangeData = (val, field) => {
        if (field === 'phone') {
            val = val.replace(/\D/g, '');
            setSmsData(pre => ({ ...pre, phone: val }));
            if (val.length === 11 && smsData.body && smsData.body.length >= 5)
                setSmsState(3);
            else if (val.length === 11) setSmsState(2);
            else setSmsState(1);
            return;
        }
        if (field === 'body') {
            setSmsData(pre => ({ ...pre, body: val }));
            if (val.length >= 5) setSmsState(3);
            else setSmsState(2);
            return;
        }
    };

    const data = [
        {
            name: 'Md. Masud Mazumder',
            address: 'Barishal',
            time: '21/10/2022 9:30 AM',
            status: 'success'
        },
        {
            name: 'Md. Masud Mazumder',
            address: 'Barishal',
            time: '21/10/2022 9:30 AM',
            status: 'success'
        },
        {
            name: 'Md. Masud Mazumder',
            address: 'Barishal',
            time: '21/10/2022 9:30 AM',
            status: 'failed'
        },
        {
            name: 'Md. Masud Mazumder',
            address: 'Barishal',
            time: '21/10/2022 9:30 AM',
            status: 'success'
        }
    ];

    return (
        <>
            <div className="w-full pb-2">
                <div className="w-full items-center justify-center flex font-bold text-2xl py-3">
                    SMS History
                </div>
                <div className="w-full flex justify-center">
                    <div className="w-5/6 space-y-2">
                        <div className="w-full bg-white rounded p-2 items-center flex flex-col">
                            <div className="w-full text-center text-gray-700 font-bold border-b-2 mb-2">
                                Send SMS
                            </div>
                            <div className="w-full md:w-4/6 flex-col sm:flex-row flex justify-between bg-slate-100 p-2 rounded">
                                <div className="w-full sm:w-1/2 pr-1">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Maxime mollitia, molestiae
                                    quas vel sint commodi repudiandae
                                    consequuntur voluptatum laborum numquam
                                    blanditiis harum quisquam eius sed odit
                                    fugiat iusto fuga praesentium optio, eaque
                                    rerum! Provident similique accusantium nemo
                                    autem. Veritatis obcaecati tenetur iure eius
                                    earum ut molestias architecto voluptate
                                    aliquam nihil, eveniet aliquid culpa officia
                                    aut!
                                </div>
                                <div className="w-full sm:w-1/2">
                                    <div className="w-full flex flex-col space-y-1">
                                        <div
                                            className={`w-full bg-gray-300 rounded p-1 ${
                                                smsState < 1 && 'hidden'
                                            }`}>
                                            <input
                                                className="w-full rounded text-center text-gray-800 text-bold"
                                                type="text"
                                                value={smsData.phone}
                                                placeholder="Phone number"
                                                onChange={val =>
                                                    onChangeData(
                                                        val.target.value,
                                                        'phone'
                                                    )
                                                }
                                            />
                                        </div>
                                        <div
                                            className={`w-full bg-gray-300 rounded p-1 ${
                                                smsState < 2 && 'hidden'
                                            }`}>
                                            <textarea
                                                className="w-full px-1 rounded text-gray-800 text-bold disabled"
                                                id="smsBody"
                                                name="smsBody"
                                                rows="8"
                                                cols="50"
                                                maxlength="200"
                                                value={smsData.body}
                                                placeholder="Write your message here..."
                                                onChange={val =>
                                                    onChangeData(
                                                        val.target.value,
                                                        'body'
                                                    )
                                                }
                                            />
                                        </div>
                                        <div
                                            className={`w-full bg-gray-300 rounded p-1 ${
                                                smsState < 3 && 'hidden'
                                            }`}>
                                            <input
                                                type="button"
                                                value="Send Now"
                                                className={[
                                                    'w-full text-center rounded text-lg',
                                                    styles.login_button
                                                ].join(' ')}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <TableContainer component={Paper}>
                            <Table
                                sx={{ minWidth: 650 }}
                                aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="">SL No</TableCell>
                                        <TableCell align="center">
                                            Name
                                        </TableCell>
                                        <TableCell align="center">
                                            Address
                                        </TableCell>
                                        <TableCell align="center">
                                            Time
                                        </TableCell>
                                        <TableCell align="center">
                                            Status
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((row, idx) => (
                                        <TableRow
                                            key={row.idx}
                                            sx={{
                                                '&:last-child td, &:last-child th':
                                                    { border: 0 }
                                            }}
                                            className="hover:bg-slate-400 rounded transition-all">
                                            <TableCell
                                                component="th"
                                                scope="row">
                                                {idx + 1}
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                component="th"
                                                scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                component="th"
                                                scope="row">
                                                {row.address}
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                component="th"
                                                scope="row">
                                                {row.time}
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                component="th"
                                                scope="row">
                                                <div
                                                    className={`bg-slate-300 py-1 px-1 rounded font-bold ${
                                                        row.status === 'success'
                                                            ? 'bg-green-700'
                                                            : 'bg-red-600'
                                                    } text-white`}>
                                                    {row.status}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Index;
