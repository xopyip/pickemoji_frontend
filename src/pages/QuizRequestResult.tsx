import React from 'react';

import {gql, useQuery} from "@apollo/client";
import styled from "styled-components";
import Twemoji from "react-twemoji";


const GET_QUIZ_REQUEST_RESULT = gql`
    query GetQuizRequestResult($id: String) {
        getDoneQuiz(id: $id){
            _id
            choice
            challenge
            quizRequest{
                quiz{
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
        }
    }
`;

const StyledQuiz = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  height: 100%;
  h1{
    text-align: center;
    font-weight: lighter;
    color: #ffffff;
  }
  p{
    background: #078373;
    padding: 10px;
    color: #ffffff;
    border-radius: 10px;
  }
`
const Choices = styled.div`
  margin-top: 20px;
  div{
    padding: 10px;
    color: white;
    font-size: 24px;
    
    display: flex;
    align-items: center;
    img{
      margin-right: 20px;
    }
    &.active{
      background: #078373;
      border-radius: 10px;
    }
  }
`



function QuizRequestResult({match} : any) {

  let {loading, error, data} = useQuery(GET_QUIZ_REQUEST_RESULT, {
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

  return (
    <StyledQuiz>
      <div>
        <h1>{data.getDoneQuiz.quizRequest.quiz.name}</h1>
        <p>Description: {data.getDoneQuiz.quizRequest.quiz.desc}</p>
        <span>Author: {data.getDoneQuiz.quizRequest.quiz.author.username}</span>
      </div>
      <h1>There is yours challenge:</h1>
      <Choices>
        {data.getDoneQuiz.quizRequest.quiz.emojis.map((emoji : {emoji : string, desc : string}) => (
          <Twemoji className={emoji.emoji === data.getDoneQuiz.choice ? "active" : ""}>
            {emoji.emoji} - {emoji.desc}
          </Twemoji>
        ))}
      </Choices>
    </StyledQuiz>
  )
}


export default QuizRequestResult;