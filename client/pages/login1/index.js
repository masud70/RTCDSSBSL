import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import LoginIcon from "@mui/icons-material/Login";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { login } from "../../actions/login";

export default function Index() {
    const [loading, setLoading] = React.useState(false);
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const isLogged = useSelector((state) => state.logger);
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const router = useRouter();

    const handleClickVariant = (message, variant) => {
        enqueueSnackbar(message, { variant });
    };
    const handleClick = () => {
        if (phone.length < 1 || password.length < 4) return;
        setLoading((state) => !state);
        dispatch(login(phone, password));
    };
    const onChangePhone = (val) => {
        if (val.length > 11) return false;
        for (let i = 0; i < val.length; i++) {
            if (!(val[i] >= "0" && val[i] <= "9")) {
                return false;
            }
        }
        setPhone(val);
        return true;
    };
    const onPasswordChange = (val) => {
        if (val.length <= 15) setPassword(val);
    };

    useEffect(() => {
        if (loading) {
            setTimeout(() => {
                setLoading(false);
                if (isLogged) {
                    handleClickVariant("Login success!", "success");
                    router.push("/");
                } else {
                    handleClickVariant("Login failed.", "error");
                }
            }, 1000);
        }
    }, [isLogged, loading]);

    return (
        <>
            <div className=" bg-slate-400 h-screen absolute top-0 w-full flex text-center justify-center align-middle items-center">
                <div className=" bg-slate-200 w-4/6 h-3/6 md:w-2/6 md:h-3/6 rounded-xl p-3 shadow-xl">
                    <div className="h-full bg-slate-600">
                        <div className="h-1/4 grid justify-center items-center text-slate-300">
                            <div className=" font-bold text-4xl h-full justify-center items-center flex">
                                RTCDSS-BSL
                            </div>
                            <div className="h-full justify-center items-center font-bold flex text-3xl">
                                SIGN IN
                            </div>
                        </div>
                        <div className="h-2/4 justify-center align-middle items-center flex">
                            <Box
                                component="form"
                                sx={{
                                    "& .MuiTextField-root": {
                                        m: 1,
                                        width: "30ch",
                                    },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <div className="">
                                    <TextField
                                        value={phone}
                                        onChange={(e) =>
                                            onChangePhone(e.target.value)
                                        }
                                        label="Phone"
                                        id="outlined-size-small"
                                        size="small"
                                    />
                                    <TextField
                                        value={password}
                                        onChange={(e) =>
                                            onPasswordChange(e.target.value)
                                        }
                                        label="Password"
                                        id="outlined-size-small"
                                        size="small"
                                    />
                                </div>
                            </Box>
                        </div>
                        <div className="h-1/4 pt-2 bg-slate-4009">
                            <LoadingButton
                                onClick={handleClick}
                                endIcon={<LoginIcon />}
                                loading={loading}
                                loadingPosition="end"
                                variant="contained"
                            >
                                Login
                            </LoadingButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
