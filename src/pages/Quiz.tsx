import React from 'react';

import {gql, useQuery} from "@apollo/client";
import styled from "styled-components";
import QuizListEntry from "../components/QuizListEntry";


const GET_QUIZ = gql`
    query GetQuiz($id: String) {
        quiz(id: $id){
            _id
            name
            desc
            likes
            doneCounter
            author{
                username
            }
            category{
                name
                icon
            }
            emojis{
                emoji
                desc
            }
            accepted
            createdAt
        }
    }
`;

function Quiz({match} : any) {

  let {loading, error, data} = useQuery(GET_QUIZ, {
    variables: {
      id: match.params.id
    }
  })
  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error :( </div>
  }
  console.log(data);
  return (
    <div>{data.quiz.name}</div>
  )
}


export default Quiz;