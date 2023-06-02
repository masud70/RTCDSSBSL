import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import Post from './post';
import dayjs from 'dayjs';
import swal from 'sweetalert';
import { InfinitySpin } from 'react-loader-spinner';
import { SocketContext } from '../socketContext';

function index() {
    const [postData, setPostData] = useState('');
    const [data, setData] = useState({});
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const auth = useSelector(state => state.auth);
    const socket = useContext(SocketContext);

    const postHander = () => {
        const url = process.env.BASE_URL + '/post/create';
        fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + auth.token
            },
            body: JSON.stringify({
                body: postData,
                time: dayjs().unix().toString()
            })
        })
            .then(r => r.json())
            .then(res => {
                if (res.status) {
                    setPostData('');
                    setOpen(false);
                    swal(res.message, { icon: 'success' });
                } else {
                    swal(res.message, { icon: 'error' });
                }
            })
            .catch(err => {
                swal(err.message, { icon: 'error' });
            });
    };
    const formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'color'
    ];

    const fetchData = () => {
        const url = process.env.BASE_URL + '/post/getAll';
        fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + auth.token
            }
        })
            .then(r => r.json())
            .then(res => {
                if (res.status) {
                    setData(res.data);
                }
            })
            .catch(err => {})
            .finally(() => setLoading(false));
    };

    socket.off('updatePost').on('updatePost', d => {
        fetchData();
    });

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className="w-full bg-gray-700 min-h-screen px-2 pb-4">
                <div className="w-full flex flex-col">
                    <div className="bg-gray-800 p-2 font-bold text-white text-2xl text-center my-1">
                        Your Timeline
                    </div>
                    <div className="flex flex-row space-x-2 overflow-auto scrollbar-hide">
                        <div className="hidden lg:block w-1/6"></div>
                        <div className="w-full lg:w-4/6 space-y-1">
                            <div className="w-full bg-gray-400 rounded overflow-hidden p-1">
                                <button
                                    className="w-full bg-green-700 p-1 font-bold text-gray-50 text-xl text-center rounded cursor-pointer"
                                    onClick={() => {
                                        setOpen(p => !p);
                                    }}>
                                    Write a new post
                                </button>
                                <div
                                    className={`w-full ${
                                        !open && 'hidden'
                                    } flex flex-col justify-between`}>
                                    <div className="w-full p-1 block bg-gray-100 rounded overflow-hidden">
                                        <ReactQuill
                                            style={{ height: 170, padding: 2 }}
                                            className="block mb-10"
                                            theme="snow"
                                            value={postData}
                                            onChange={setPostData}
                                            formats={formats}
                                        />
                                    </div>
                                    <div className="w-full p-1 text-right">
                                        <button
                                            className="px-2 py-1 font-bold bg-green-600 text-white rounded"
                                            onClick={postHander}>
                                            Post Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {loading ? (
                                <div className="w-full flex flex-col items-center py-2">
                                    <InfinitySpin width="200" color="#4fa94d" />
                                    <span className="font-bold text-white text-lg">
                                        Loading data...
                                    </span>
                                </div>
                            ) : data.length > 0 ? (
                                data.map((item, id) => {
                                    return <Post data={item} key={id} />;
                                })
                            ) : (
                                <div>No Data Found</div>
                            )}
                        </div>
                        <div className="hidden lg:w-1/6"></div>
                    </div>

                    {/* Pegination */}
                    {/* <div className="w-full mt-2 bg-gray-200 rounded p-1">
                        <div className='w-full flex flex-row items-center justify-center space-x-2'>
                            <button className='bg-green-700 p-1 font-bold text-gray-50 text-sm text-center rounded min-w-[30px]'>Start</button>
                            <button className='bg-green-700 p-1 font-bold text-gray-50 text-sm text-center rounded min-w-[30px]'>Pre</button>
                            <button className='bg-green-700 p-1 font-bold text-gray-50 text-sm text-center rounded min-w-[30px]'>1</button>
                            <button className='bg-green-700 p-1 font-bold text-gray-50 text-sm text-center rounded min-w-[30px]'>2</button>
                            <button className='bg-green-700 p-1 font-bold text-gray-50 text-sm text-center rounded min-w-[30px]'>3</button>
                            <span className='text-lg'>. . .</span>
                            <button className='bg-green-700 p-1 font-bold text-gray-50 text-sm text-center rounded min-w-[30px]'>Next</button>
                            <button className='bg-green-700 p-1 font-bold text-gray-50 text-sm text-center rounded min-w-[30px]'>Last</button>
                        </div>
                    </div> */}
                </div>
                {/* <div className="w-full flex flex-col">
                    <div className="bg-gray-800 p-2 font-bold text-white text-2xl text-center my-1">
                        YouTube Videos
                    </div>
                    <div className="flex flex-row space-x-2 overflow-auto scrollbar-hide">
                        <iframe
                            width="560"
                            height="315"
                            src="https://www.youtube.com/embed/rGEOEM5ATdk"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen></iframe>
                        <iframe
                            width="560"
                            height="315"
                            src="https://www.youtube.com/embed/8klqIM9UvAc"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen></iframe>
                        <iframe
                            width="560"
                            height="315"
                            src="https://www.youtube.com/embed/CQjGqtH-2YI"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen></iframe>
                    </div>
                </div>
                <div className="w-full flex flex-col">
                    <div className="bg-gray-800 p-2 font-bold text-white text-2xl text-center my-1">
                        Google Map Embeding
                    </div>
                    <div>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d118103.45687625333!2d91.81986775!3d22.32593435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1673414719236!5m2!1sen!2sbd"
                            width="600"
                            height="450"
                            allowfullscreen={true}
                            loading="lazy"
                            className="w-full"
                            referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div> */}
            </div>
        </>
    );
}

export default index;
