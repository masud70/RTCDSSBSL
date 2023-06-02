import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import LoginIcon from '@mui/icons-material/Login';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import swal from 'sweetalert';
import { login } from '../../redux/state/authSlice';
import styles from '../../styles/styles.module.scss';
import { TweenMax, Power3 } from 'gsap';
import * as faceapi from 'face-api.js';

const index = () => {
    const [loading, setLoading] = React.useState(false);
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState(null);
    const [verifiedPhone, setVerifiedPhone] = useState(false);
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const router = useRouter();
    const [result, setResult] = useState();
    const videoRef = useRef();
    const canvasRef = useRef();
    const useTiny = true;
    const minConfidence = 0.6;

    let logoItem = useRef(null);
    let textItem = useRef(null);

    const dimensions = {
        width: 800,
        height: 600
    };

    const onChangePhone = val => {
        if (val.length > 11) return false;
        for (let i = 0; i < val.length; i++) {
            if (!(val[i] >= '0' && val[i] <= '9')) {
                return false;
            }
        }
        setPhone(val);
        setPhoneError(null);
        return true;
    };

    const onSubmit = phoneNumber => {
        setLoading(true);
        fetch(process.env.BASE_URL + '/user/getImageLink/' + phoneNumber)
            .then(r => r.json())
            .then(response => {
                console.log(response);
                if (response.status) {
                    setVerifiedPhone(true);
                    setPhoneError(null);
                    getVideo();
                    detect({ link: response.imageLink, phone: phone });
                } else {
                    setPhoneError(response.message);
                }
            })
            .catch(err => swal(err.message, { icon: 'error' }))
            .finally(() => {
                setLoading(false);
            });
    };

    const loadModels = async () => {
        const url = process.env.BASE_URL + '/models';
        await faceapi.loadTinyFaceDetectorModel(url);
        await faceapi.loadFaceLandmarkTinyModel(url);
        await faceapi.loadFaceExpressionModel(url);
        await faceapi.loadFaceRecognitionModel(url);
        console.log('Models loaded');
    };

    const getVideo = () => {
        navigator.mediaDevices
            .getUserMedia({ video: dimensions })
            .then(stream => {
                videoRef.current.srcObject = stream;
            })
            .catch(err => {
                console.error('error:', err);
            });
    };

    const detect = async data => {
        const refFace = await loadLabeledImages(data);
        const faceMatcher = new faceapi.FaceMatcher(refFace, minConfidence);

        setInterval(async () => {
            const detection = await faceapi
                .detectSingleFace(
                    videoRef.current,
                    new faceapi.TinyFaceDetectorOptions()
                )
                .withFaceLandmarks(useTiny)
                .withFaceExpressions()
                .withFaceDescriptor();

            if (detection) {
                const resizedDetections = faceapi.resizeResults(
                    detection,
                    dimensions
                );

                const detectionResult = faceMatcher.findBestMatch(
                    resizedDetections.descriptor
                );
                setResult(detectionResult);
            }
        }, 500);
    };

    const loadLabeledImages = ({ link, phone }) => {
        const labels = ['User'];

        return Promise.all(
            labels.map(async label => {
                const descriptions = [];
                const img = await faceapi.fetchImage(link);
                const detections = await faceapi
                    .detectSingleFace(
                        img,
                        new faceapi.TinyFaceDetectorOptions()
                    )
                    .withFaceLandmarks(useTiny)
                    .withFaceExpressions()
                    .withFaceDescriptor();

                if (detections) {
                    descriptions.push(detections.descriptor);
                }
                return new faceapi.LabeledFaceDescriptors(label, descriptions);
            })
        );
    };

    useEffect(() => {
        if (auth.status) {
            router.push('/');
        }

        TweenMax.fromTo(
            logoItem,
            1,
            {
                opacity: 0,
                y: -60,
                ease: Power3.easeOut
            },
            {
                y: -10,
                opacity: 5
            }
        );
        TweenMax.fromTo(
            textItem,
            1,
            {
                opacity: 0,
                y: 30
            },
            {
                y: 0,
                opacity: 5,
                delay: 0.5
            }
        );

        loadModels();
    }, []);

    return (
        <>
            <div className="absolute top-0 bg-slate-200 h-screen w-screen flex items-center justify-center  shadow-xl">
                <div className="w-5/6 sm:4/6 md:w-1/2 h-3/4 flex flex-row justify-between">
                    <div className="hidden md:flex w-full justify-center items-center overflow-hidden rounded-l-xl">
                        <Image
                            src="/images/gif.gif"
                            width={100}
                            height={100}
                            className="w-full min-h-full bg-cover"
                            alt="Logo"
                        />
                    </div>
                    <div className="bg-slate-300 w-full flex justify-center items-center rounded-xl md:rounded-r-xl md:rounded-l-none">
                        <div className="flex justify-center items-center flex-col space-y-8 w-full h-5/6">
                            {!verifiedPhone ? (
                                <>
                                    <div className="flex justify-center items-center flex-col">
                                        <div className="flex justify-center items-center">
                                            <img
                                                ref={el => {
                                                    logoItem = el;
                                                }}
                                                className="opacity-0"
                                                src="/images/logo-bd.png"
                                                width={100}
                                                height={100}
                                                alt="Logo"
                                            />
                                        </div>
                                        <div
                                            ref={el => {
                                                textItem = el;
                                            }}
                                            className={
                                                `font-bold text-3xl opacity-0 ` +
                                                styles.gray_medium
                                            }>
                                            WELCOME
                                        </div>
                                    </div>
                                    <div className="w-3/4 space-y-3 items-center justify-center flex flex-col">
                                        <TextField
                                            label="Phone"
                                            variant="outlined"
                                            fullWidth
                                            className="w-full"
                                            value={phone}
                                            onChange={e =>
                                                onChangePhone(e.target.value)
                                            }
                                        />
                                        <div
                                            className={`text-red-500 text-xs ${
                                                !phoneError && 'hidden'
                                            }`}>
                                            {phoneError}
                                        </div>
                                        <LoadingButton
                                            onClick={() => onSubmit(phone)}
                                            endIcon={<LoginIcon />}
                                            loading={loading}
                                            loadingPosition="end"
                                            variant="contained"
                                            className={styles.login_button}>
                                            Submit
                                        </LoadingButton>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="w-11/12 h-full rounded p-1 bg-gray-100">
                                        <div className="detection">
                                            <video
                                                autoPlay
                                                muted
                                                ref={videoRef}
                                                onPlay={detect}
                                            />
                                            <canvas ref={canvasRef} />
                                        </div>
                                    </div>
                                    <div className="text-xl">
                                        Scanning...{' '}
                                        {result && result.toString()}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default index;
