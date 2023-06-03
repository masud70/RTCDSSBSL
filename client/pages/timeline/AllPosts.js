import { useQuery } from '@apollo/client';
import React, { useContext } from 'react';
import { GET_POST_BY_PAGE } from '../../components/graphql/query';
import { InfinitySpin } from 'react-loader-spinner';
import Post from './Post';
import { SocketContext } from '../socketContext';

function AllPosts({ page }) {
    const socket = useContext(SocketContext);

    const { loading, error, data, refetch } = useQuery(GET_POST_BY_PAGE, {
        variables: { page: parseInt(page) }
    });

    if (loading) {
        return (
            <div className="w-full flex flex-col items-center py-2">
                <InfinitySpin width="200" color="#4fa94d" />
                <span className="font-bold text-white text-lg">
                    Loading data...
                </span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full flex flex-col items-center py-2">
                <span className="font-bold text-white text-lg">
                    There is an error loading data.
                </span>
            </div>
        );
    }

    if (data.getPosts.length === 0) {
        return (
            <div className="w-full flex flex-col items-center py-2">
                <span className="font-bold text-white text-lg">
                    There is no more data.
                </span>
            </div>
        );
    }

    socket.off('updatePost').on('updatePost', d => {
        refetch();
    });

	console.log(data);

    return (
        <>
            {data.getPosts.map((item, id) => {
                return <Post data={item} key={id} />;
            })}
        </>
    );
}

export default AllPosts;
