import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

function Index({ data }) {
    const [open, setOpen] = useState(false);
    const [item, setItem] = useState({});
    const [comment, setComment] = useState('');
    const auth = useSelector(state => state.auth);
    const [postData, setPostData] = useState({
        likeCount: 100,
        dislikeCount: 1,
        commentCount: 55,
        comments: [
            {
                userId: 'user1',
                commentId: 'comment1',
                commentBody: 'Here goes comment data.'
            },
            {
                userId: 'user2',
                commentId: 'comment2',
                commentBody: 'Here goes comment data.'
            },
            {
                userId: 'user3',
                commentId: 'comment3',
                commentBody: 'Here goes comment data.'
            },
            {
                userId: 'user4',
                commentId: 'comment4',
                commentBody: 'Here goes comment data.'
            }
        ]
    });

    const likeHandler = () => {};
    const dislikeHandler = () => {};
    const commentHandler = e => {
        if (e.keyCode == 13) {
            setComment(comment.replace('\n', ''));
            const url = process.env.BASE_URL + '/post/postComment';

            fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + auth.token
                },
                body: JSON.stringify({
                    commentBody: comment.replace('\n', ''),
                    commentTime: dayjs().unix().toString(),
                    postId: item.id
                })
            })
                .then(r => r.json())
                .then(res => {
                    if (res.status) {
                        setComment('');
                        setOpen(false);
                        swal(res.message, { icon: 'success' });
                    } else {
                        swal(res.message, { icon: 'error' });
                    }
                })
                .catch(err => {
                    swal(err.message, { icon: 'error' });
                });
        }
    };

    useEffect(() => {
        setItem(data);
        console.log(data);
    }, [data]);

    return (
        <>
            {item && (
                <div className="w-full bg-gray-100 rounded overflow-hidden p-1">
                    <div className="w-full bg-gray-600 p-1 font-bold text-gray-100 text-xl rounded">
                        {item.User && item.User.nameEn}
                    </div>
                    <pre className="w-full p-1 py-2">
                        {item && parse(item.body + '')}
                    </pre>
                    <div className="w-full p-1 flex divide-x divide-slate-500 border-t border-gray-500">
                        <div
                            className="text-center w-2/6 cursor-pointer"
                            onClick={likeHandler}>
                            Like ({postData.likeCount})
                        </div>
                        <div
                            className="text-center w-2/6 cursor-pointer"
                            onClick={dislikeHandler}>
                            Dislike ({postData.dislikeCount})
                        </div>
                        <div
                            className="text-center w-2/6 cursor-pointer"
                            onClick={() => setOpen(!open)}>
                            Comment ({item && item.comments && item.comments.length})
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
                            {item && item.comments &&
                                item.comments.map((item, id) => {
                                    return (
                                        <div
                                            className="flex space-x-2 items-center bg-slate-300 px-1 py-2 rounded"
                                            key={id}>
                                            <div className="w-1/12">
                                                <img
                                                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                                                    src="http://192.168.0.200:5000/images/profile.png"
                                                    alt="User"
                                                />
                                            </div>
                                            <div className="w-11/12">
                                                {item.body}
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Index;
