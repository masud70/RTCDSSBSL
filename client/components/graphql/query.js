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
    `,

    FACELOGIN_QUERY: gql`
        query FaceLogin($phone: String!, $result: Float!) {
            faceLogin(phone: $phone, result: $result) {
                status
                message
                token
                user {
                    id
                    nameEn
                    nameBn
                    designation
                    phone
                    avatar
                }
            }
        }
    `,

    ALL_USER_QUERY: gql`
        query GetAllUser {
            getAllUser {
                slNo
                id
                nameEn
                nameBn
                email
                phone
                designation
                currentOffice
                dob
                avatar
                currentOfficeJoinDate
                dateOfPRL
                role
                Course {
                    id
                    courseName
                    startDate
                    endDate
                }
            }
        }
    `
};
