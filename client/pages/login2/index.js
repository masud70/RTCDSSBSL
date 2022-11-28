import Image from "next/image";
import React from "react";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const index = () => {
    return (
        <>
            <div className="absolute top-0 bg-slate-200 h-screen w-screen flex items-center justify-center">
                <div className="w-1/2 md:w-3/4 h-3/4 flex flex-row justify-between">
                    <div className="hidden md:flex w-full justify-center items-center">
                        skdhf
                    </div>
                    <div className="bg-slate-300 w-full flex justify-center items-center rounded md:rounded-r-lg md:rounded-l-none shadow-xl">
                        <div className="flex justify-center items-center flex-col space-y-5 w-full">
                            <div className="flex justify-center items-center flex-col">
                                <div className="flex justify-center items-center">
                                    <Image
                                        src="/images/logo-bd.png"
                                        width={100}
                                        height={100}
                                    />
                                </div>
                                <div className="font-bold text-3xl text-gray-800">
                                    WELCOME
                                </div>
                            </div>
                            <div className="w-3/4 space-y-2 items-center justify-center flex flex-col">
                                <TextField
                                    id="fullWidth"
                                    label="Phone"
                                    variant="outlined"
                                    fullWidth
                                    className="w-full"
                                />
                                <TextField
                                    id="fullWidth"
                                    label="Password"
                                    variant="outlined"
                                    fullWidth
                                    className="w-full"
                                />
                                <Button
                                    variant="contained"
                                    endIcon={<SendIcon />}
                                    className="bg-slate-600"
                                >
                                    Send
                                </Button>
                            </div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default index;
