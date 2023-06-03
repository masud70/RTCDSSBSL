import React, { useState } from 'react';
import swal from 'sweetalert';
import parse from 'html-react-parser';
import dayjs from 'dayjs';
import { getCookie } from 'cookies-next';
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

function Index({ data }) {
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState('');

    const reactionHander = reactionType => {
        const url = process.env.BASE_URL + '/post/reaction';
        fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + getCookie(process.env.ACCESS_TOKEN)
            },
            body: JSON.stringify({ type: reactionType, postId: data.id })
        })
            .then(r => r.json())
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const commentHandler = e => {
        if (e.keyCode == 13) {
            setComment(comment.replace('\n', ''));
            const url = process.env.BASE_URL + '/post/postComment';

            fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    authorization:
                        'Bearer ' + getCookie(process.env.ACCESS_TOKEN)
                },
                body: JSON.stringify({
                    commentBody: comment.replace('\n', ''),
                    commentTime: dayjs().unix().toString(),
                    postId: data.id
                })
            })
                .then(r => r.json())
                .then(res => {
                    if (res.status) {
                        setComment('');
                    } else {
                        swal(res.message, { icon: 'error' });
                    }
                })
                .catch(err => {
                    swal(err.message, { icon: 'error' });
                });
        }
    };

    if (!data)
        return (
            <>
                <div>Loading...</div>
            </>
        );

    return (
        <>
            <div className="w-full bg-gray-100 rounded overflow-hidden p-1">
                <div className="w-full bg-gray-600 p-1 font-bold text-gray-100 text-xl rounded">
                    {data.User.nameEn}
                </div>
                <div className="w-full p-1 py-2 flex flex-wrap">
                    {parse(data.body + '')}
                </div>

                <div className="w-full p-1 flex divide-x divide-slate-500 border-t border-gray-500">
                    <div
                        className={`text-center w-2/6 cursor-pointer rounded-full`}
                        onClick={() => reactionHander('like')}>
                        Like (
                        {
                            data.Reactions.filter(
                                reaction => reaction.type === 'like'
                            ).length
                        }
                        )
                    </div>
                    <div
                        className="text-center w-2/6 cursor-pointer"
                        onClick={() => reactionHander('dislike')}>
                        Dislike (
                        {
                            data.Reactions.filter(
                                reaction => reaction.type === 'dislike'
                            ).length
                        }
                        )
                    </div>
                    <div
                        className="text-center w-2/6 cursor-pointer"
                        onClick={() => setOpen(!open)}>
                        Comment ({data.Comments.length})
                    </div>
                </div>
                <div
                    className={`w-full border-t border-gray-500 p-1 ${
                        open ? '' : 'hidden'
                    } ease-in-out duration-1000`}>
                    <div className="w-full">
                        <textarea
                            className="w-full p-1 rounded overflow-hidden focus:border-none target:border-none open:border-none"
                            rows={1}
                            placeholder="Write your comment here..."
                            onKeyUp={e => {
                                commentHandler(e);
                            }}
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                        />
                    </div>
                    <div className="w-full space-y-1">
                        {data.Comments.length > 0 &&
                            data.Comments.map((item, id) => {
                                return (
                                    <div
                                        className="flex space-x-2 items-center bg-slate-300 px-1 py-1 rounded"
                                        key={id}>
                                        <div className="w-[30px]">
                                            <img
                                                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                                                src="http://192.168.0.200:5000/uploads/images/profile.png"
                                                alt="User"
                                            />
                                        </div>
                                        <div className="w-full">
                                            {item.body}
                                            <br className="p-0 m-0" />
                                            <span className="text-[8px] text-gray-500">
                                                {dayjs
                                                    .unix(item.time)
                                                    .fromNow()}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Index;
