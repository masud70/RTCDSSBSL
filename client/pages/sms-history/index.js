import { Button, TextField } from "@mui/material";
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

    return (
        <>
            <div>
                <TextField
                    id="fullWidth"
                    label="Text Here"
                    variant="outlined"
                    onChange={(txt) => setText(txt.target.value)}
                />
                <Button variant="contained" onClick={onClick}>
                    Push
                </Button>
            </div>
            <div>
                <span>{text}</span> <br />
                <span>{received}</span>
            </div>
        </>
    );
};

export default Index;
