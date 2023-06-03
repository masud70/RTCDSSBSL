import { gql } from '@apollo/client';

module.exports = {
    GET_USER_DATA: gql`
        query GetUserData($token: String!) {
            getUser(token: $token) {
                nameBn
                nameEn
                email
                phone
                dob
                avatar
                designation
                currentOffice
            }
        }
    `,

    GET_POST_BY_PAGE: gql`
        query getPostData($page: Int!) {
            getPosts(page: $page) {
                id
                body
                time
                User {
                    id
                    nameBn
                    nameEn
                    email
                    designation
                    avatar
                }
                Reactions {
                    id
                    type
                    UserId
                }
                Comments {
                    id
                    body
                    time
                    UserId
                }
            }
        }
    `,

    GET_PAGINATION: gql`
        query Pagination($page: Int!) {
            getPagination(page: $page) {
                groupA
                groupB
                current
                end
            }
        }
    `
};
