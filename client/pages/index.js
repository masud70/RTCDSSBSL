import React, {useEffect, useState} from 'react';
import {io} from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/login';
import { increment } from '../actions/increment';
import { useRouter } from 'next/router';

const socket = io("http://localhost:5000", {transports: ['websocket']})

export default function index() {
    const [name, setName] = useState("Nishat");
    const isLogged = useSelector(state => state.logger);
    const counter = useSelector(state=>state.counter);
    const router = useRouter();
    const dispatch = useDispatch();

    const handlePost = () => {
        socket.emit("msg", {post: name});
    }
    socket.on("mmm", (data)=>{
        setName(data.data);
    })

    useEffect(()=>{
        // if(isLogged){
        //     router.push("/login")
        // }
    }, [isLogged])

    return (
        <>
            <div className=' bg-gray-200 h-screen'>
                Homepage {isLogged ? "OK" : "NOK"} {counter}<br />
                <button onClick={()=>dispatch(login())}>Toggle</button>
            </div>
        </>
    )
}
