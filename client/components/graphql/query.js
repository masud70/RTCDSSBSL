import { gql } from '@apollo/client';

export const GET_USER_DATA = gql`
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
`;
