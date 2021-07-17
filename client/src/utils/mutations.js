import { gql } from "graphql-tag";

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
           token
           user {
               _id
               username
           } 
        }
    }
    `;

    export const ADD_USER = gql`
    mutation addUser($userName: String!, $email: String!, $password: String!) {
      addUser(userName: $userName, email: $email, password: $password) {
          token
          user {
              _id
              username
          }
      }  
    }
    `;

    export const SAVE_BOOK = gql`
    mutation saveBook($bookData: BookInput!) {
        saveBook(bookData: $bookData) {
            _id
            userName
            email
            savedBooks {
                bookId
                authors
                image
                description
                title
                link
            }         
        }
    }
    `;

    export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: ID!) {
        removeBook(bookId: $bookId) {
            _id
            userName
            email
            savedBooks {
                bookId
                authors
                image
                description
                title
                link
            }         

            
        }
    }
    `;
    