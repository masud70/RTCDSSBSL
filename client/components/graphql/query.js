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
    `,

    GET_COURSE_BY_USER_ID: gql`
        query GetCourseById($UserId: String!) {
            getCourseById(UserId: $UserId) {
                status
                message
                id
                courseName
                startDate
                endDate
            }
        }
    `,

    INSERT_UPDATE_COURSE_MUTATION: gql`
        mutation InsertOrUpdate(
            $UserId: String!
            $courseName: String!
            $startDate: String!
            $endDate: String!
        ) {
            insertOrUpdateCourse(
                UserId: $UserId
                courseName: $courseName
                startDate: $startDate
                endDate: $endDate
            ) {
                status
                message
                id
                UserId
                courseName
                startDate
                endDate
            }
        }
    `,

    ADD_EMPLOYEE_MUTATION: gql`
        mutation AddEmployee(
            $nameBn: String!
            $nameEn: String!
            $email: String!
            $phone: String!
            $designation: String!
            $currentOffice: String!
            $dob: String!
            $currentOfficeJoinDate: String!
            $dateOfPRL: String!
            $token: String!
        ) {
            createUser(
                nameBn: $nameBn
                nameEn: $nameEn
                email: $email
                phone: $phone
                designation: $designation
                currentOffice: $currentOffice
                dob: $dob
                currentOfficeJoinDate: $currentOfficeJoinDate
                dateOfPRL: $dateOfPRL
                token: $token
            ) {
                status
                message
                id
                nameEn
                phone
            }
        }
    `
};
