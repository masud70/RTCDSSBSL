import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import AllPosts from './AllPosts';
import dayjs from 'dayjs';
import swal from 'sweetalert';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_PAGINATION } from '../../components/graphql/query';
import { getCookie } from 'cookies-next';

function index() {
    const [postData, setPostData] = useState('');
    const [open, setOpen] = useState(false);
    const router = useRouter();
    var { page } = router.query;
    const [pg, setPg] = useState(0);

    const { loading, error, data, refetch } = useQuery(GET_PAGINATION, {
        variables: { page: parseInt(page) }
    });

    const postHander = () => {
        const url = process.env.BASE_URL + '/post/create';
        fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + getCookie(process.env.ACCESS_TOKEN)
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

    useEffect(() => {
        setPg(page);
    }, []);

    if (data)
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
                                                style={{
                                                    height: 170,
                                                    padding: 2
                                                }}
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
                                <AllPosts page={page} />
                            </div>
                            <div className="hidden lg:w-1/6"></div>
                        </div>

                        {/* Pegination */}
                        <div className="w-full mt-2 bg-gray-200 rounded p-1">
                            <div className="w-full flex flex-row items-center justify-center space-x-2">
                                <button
                                    className={`p-1 font-bold text-gray-50 text-sm text-center rounded min-w-[30px] ${
                                        parseInt(page) === 0
                                            ? 'bg-gray-700'
                                            : 'bg-green-700'
                                    }`}
                                    onClick={() => router.push('/timeline/0')}>
                                    Start
                                </button>

                                {parseInt(page) > 0 && (
                                    <button
                                        className="bg-green-700 p-1 font-bold text-gray-50 text-sm text-center rounded min-w-[30px]"
                                        onClick={() =>
                                            router.push(
                                                '/timeline/' +
                                                    (parseInt(page) - 1)
                                            )
                                        }>
                                        Prev
                                    </button>
                                )}

                                {parseInt(page) >
                                    3 && <span className="text-lg">. . .</span>}

                                {data &&
                                    data.getPagination.groupA.map(
                                        (item, id) => {
                                            return (
                                                <button
                                                    id={id}
                                                    className="p-1 font-bold text-gray-50 text-sm text-center rounded min-w-[30px] bg-green-700"
                                                    onClick={() =>
                                                        router.push(
                                                            '/timeline/' + item
                                                        )
                                                    }>
                                                    {item}
                                                </button>
                                            );
                                        }
                                    )}
                                {data.getPagination.current && (
                                    <button className="bg-gray-700 p-1 font-bold text-gray-50 text-sm text-center rounded min-w-[30px]">
                                        {data && data.getPagination.current}
                                    </button>
                                )}

                                {data &&
                                    data.getPagination.groupB.map(
                                        (item, id) => {
                                            return (
                                                <button
                                                    id={id}
                                                    className="bg-green-700 p-1 font-bold text-gray-50 text-sm text-center rounded min-w-[30px]"
                                                    onClick={() =>
                                                        router.push(
                                                            '/timeline/' + item
                                                        )
                                                    }>
                                                    {item}
                                                </button>
                                            );
                                        }
                                    )}
                                {data.getPagination.end - parseInt(page) >
                                    3 && <span className="text-lg">. . .</span>}

                                {parseInt(page) < data.getPagination.end && (
                                    <button
                                        className="bg-green-700 p-1 font-bold text-gray-50 text-sm text-center rounded min-w-[30px]"
                                        onClick={() =>
                                            router.push(
                                                '/timeline/' +
                                                    (data.getPagination
                                                        .current +
                                                        1)
                                            )
                                        }>
                                        Next
                                    </button>
                                )}

                                <button
                                    className={`p-1 font-bold text-gray-50 text-sm text-center rounded min-w-[30px] ${
                                        data.getPagination.end ===
                                        parseInt(page)
                                            ? 'bg-gray-700'
                                            : 'bg-green-700'
                                    }`}
                                    onClick={() =>
                                        router.push(
                                            '/timeline/' +
                                                data.getPagination.end
                                        )
                                    }>
                                    Last
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col">
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
                    </div>
                </div>
            </>
        );
}

export default index;
