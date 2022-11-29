import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/login";
import { setWebSocket } from "../redux/state/webSocket/socketSlice";

export default function index() {
    const [name, setName] = useState("Nishat");
    const dispatch = useDispatch();

    useEffect(() => {
        const socket = io("http://localhost:5000", {
            transports: ["websocket"],
        });
    }, []);

    return (
        <>
            <div className=" bg-gray-200 h-screen">
                Homepage
                <button onClick={() => dispatch(login())}>Toggle</button>
            </div>
        </>
    );
}
