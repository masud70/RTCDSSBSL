import React, { useState } from 'react';
import swal from 'sweetalert';

function Index() {
    const [open, setOpen] = useState(false);
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
            swal({
                title: 'Success',
                type: 'success',
                text: 'Enter key clicked.'
            });
        }
    };
    return (
        <>
            <div className="w-full bg-gray-400 rounded overflow-hidden p-1">
                <div className="w-full bg-gray-600 p-1 font-bold text-gray-900 text-xl">
                    Here goes the heading part
                </div>
                <div className="w-full p-1">Here goes the body part</div>
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
                        Comment ({postData.comments.length})
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
                        />
                    </div>
                    <div className="w-full space-y-1">
                        {postData &&
                            postData.comments.map((item, id) => {
                                return (
                                    <div
                                        className="flex space-x-2 items-center bg-slate-400 px-1 py-2 rounded"
                                        key={id}>
                                        <div className="w-1/12">
                                            <img
                                                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                                                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                alt=""
                                            />
                                        </div>
                                        <div className="w-11/12">
                                            {item.commentBody}
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
