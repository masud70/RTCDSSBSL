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
      <div style={{margin: 50}}>
        <h1>{name}</h1>
        <input type="text" onChange={e=>setName(e.target.value)} />
        <button onClick={handlePost} >Post Now</button>
      </div>
    </>
  )
}
