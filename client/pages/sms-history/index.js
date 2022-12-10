import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from "../socketContext";

const Index = () => {
    const [text, setText] = useState("Nishat");
    const [received, setReceived] = useState("Null");
    const socket = useContext(SocketContext);

    const onClick = () => {
        socket.emit("send", text);
    };

    const data = [
        {
            name: "Md. Masud Mazumder",
            address: "Barishal",
            time: "21/10/2022 9:30 AM",
            status: "success",
        },
        {
            name: "Md. Masud Mazumder",
            address: "Barishal",
            time: "21/10/2022 9:30 AM",
            status: "success",
        },
        {
            name: "Md. Masud Mazumder",
            address: "Barishal",
            time: "21/10/2022 9:30 AM",
            status: "failed",
        },
        {
            name: "Md. Masud Mazumder",
            address: "Barishal",
            time: "21/10/2022 9:30 AM",
            status: "success",
        },
    ];

    return (
        <>
            <div className="mx-2 pb-2">
                <div className="w-full items-center justify-center flex font-bold text-2xl py-3">
                    SMS History
                </div>
                <div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="">SL No</TableCell>
                                    <TableCell align="center">Name</TableCell>
                                    <TableCell align="center">
                                        Address
                                    </TableCell>
                                    <TableCell align="center">Time</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row, idx) => (
                                    <TableRow
                                        key={row.idx}
                                        sx={{
                                            "&:last-child td, &:last-child th":
                                                { border: 0 },
                                        }}
                                        className="hover:bg-slate-400 rounded transition-all"
                                    >
                                        <TableCell component="th" scope="row">
                                            {idx + 1}
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            component="th"
                                            scope="row"
                                        >
                                            {row.name}
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            component="th"
                                            scope="row"
                                        >
                                            {row.address}
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            component="th"
                                            scope="row"
                                        >
                                            {row.time}
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            component="th"
                                            scope="row"
                                        >
                                            <div
                                                className={`bg-slate-300 py-1 px-1 rounded font-bold ${
                                                    row.status === "success"
                                                        ? "bg-green-700"
                                                        : "bg-red-600"
                                                } text-white`}
                                            >
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
        </>
    );
};

export default Index;
