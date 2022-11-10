import React, {useState} from 'react';
import {io} from 'socket.io-client';

const socket = io("http://localhost:5000", {transports: ['websocket']})

export default function index() {
    const [name, setName] = useState("Nishat");
    const handlePost = () => {
        socket.emit("msg", {post: name});
    }
    socket.on("mmm", (data)=>{
        setName(data.data);
    })
    

    return (
        <>
            <div className=' bg-gray-200 h-screen'>
                Homepage
            </div>
        </>
    )
}
