import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Posts from '../components/Posts';
import Marquee from 'react-fast-marquee';
import LoadingButton from '@mui/lab/LoadingButton';
import { getCookie, hasCookie } from 'cookies-next';
import { login } from '../redux/state/auth/authSlice';
import { useDispatch } from 'react-redux';

export default function index() {
    const [loading, setLoading] = React.useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (hasCookie(process.env.COOKIE_KEY_TOKEN)) {
            const token = getCookie(process.env.COOKIE_KEY_TOKEN);
            dispatch(login({ isLoggedIn: true, token: token, userData: {} }));
        }
    }, []);

    return (
        <>
            <div className=" bg-gray-100 p-2">
                <div className="w-full h-56 rounded overflow-hidden">
                    <Carousel
                        autoPlay
                        infiniteLoop
                        dynamicHeight={false}
                        className="h-20">
                        <div>
                            <img src="./images/dss.jpg" className="h-56" />
                            <p className="legend">Legend 1</p>
                        </div>
                        <div>
                            <img src="./images/img1.png" className="h-56" />
                            <p className="legend">Legend 2</p>
                        </div>
                        <div>
                            <img src="./images/img2.png" className="h-56" />
                            <p className="legend">Legend 3</p>
                        </div>
                    </Carousel>
                </div>
                <div className="w-full mt-2 rounded overflow-hidden bg-green-100 flex p-1 space-x-2">
                    <div className="bg-white px-2 font-bold rounded">
                        <span>Updates</span>
                    </div>
                    <div className="w-full">
                        <Marquee gradient={false} className="bg-none w-full">
                            I can be a React component, multiple React
                            components, or just some text.
                        </Marquee>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row space-y-2 md:space-x-2">
                    <div
                        className="w-full md:w-4/6 bg-white mt-2 p-2 max-h-screen overflow-auto space-y-4"
                        style={{}}>
                        <Posts />
                        <Posts />
                        <Posts />
                        <Posts />
                        <div className="w-full items-center justify-center flex">
                            <LoadingButton
                                size="small"
                                onClick={() => setLoading(true)}
                                loading={loading}
                                variant="outlined">
                                Load More
                            </LoadingButton>
                        </div>
                    </div>
                    <div className="w-full md:w-2/6 flex flex-col space-y-2">
                        <div className="w-full bg-slate-400 rounded">
                            <div className="bg-green-100 w-full items-center justify-center flex h-10 font-bold">
                                Notice Board
                            </div>
                            <div className="w-full p-2">
                                <div>Notice</div>
                                <div>Notice</div>
                                <div>Notice</div>
                                <div>Notice</div>
                            </div>
                        </div>
                        <div className="w-full bg-slate-400 rounded">
                            <div className="bg-green-100 w-full items-center justify-center flex h-10 font-bold">
                                Important Links
                            </div>
                            <div className="w-full p-2">
                                <div>Link</div>
                                <div>Link</div>
                                <div>Link</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
