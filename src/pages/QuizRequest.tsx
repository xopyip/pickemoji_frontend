import React, {useCallback} from 'react';

import {gql, useMutation, useQuery} from "@apollo/client";
import styled from "styled-components";
import Twemoji from "react-twemoji";
import {connect} from "react-redux";
import {RootType} from "../reducers";
import {Redirect, useHistory} from 'react-router-dom';


const GET_QUIZREQUEST = gql`
    query GetQuizRequest($id: String) {
        quizRequest(id: $id){
            _id
            user{
                _id
                username
            }
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
                }
                accepted
                createdAt
            }
            done{
                user{
                    username
                }
                choice
                challenge
                createdAt
            }
        }
    }
`;

const DONE_QUIZ = gql`
    mutation DoneQuiz($id: String, $choice: String){
        doneQuiz(requestID: $id, choice: $choice){
            _id
        }
    }
`


const StyledQuiz = styled.div`
  display: flex;
  flex-flow: column;
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
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-auto-flow: column;
  grid-template-columns: repeat(auto-fit, minmax(100px, max-content));
  justify-content: center;
  height: 100%;
  div{
    height: 100px;
    width: 100px;
    display: grid;
    place-items: center;
    &:hover{
      background: #078373;
      border-radius: 10px;
      cursor: pointer;
    }
  }
`


function QuizRequest({match, token}: any) {

  let {loading, error, data} = useQuery(GET_QUIZREQUEST, {
    variables: {
      id: match.params.id
    }
  })
  let [doneQuiz] = useMutation(DONE_QUIZ);
  let history = useHistory();
  let pickEmoji = useCallback((emoji) => {
    doneQuiz({variables: {id: match.params.id, choice: emoji}}).then(ret => {
      history.push("/result/" + ret.data.doneQuiz._id);
    }).catch(error => {
      console.log(error);
    })
  }, [history, doneQuiz, match]);

  if (!token || token.length === 0) {
    return <Redirect push to={"/login"}/>
  }
  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error :( </div>
  }


  return (
    <StyledQuiz>
      <div>
        <h1>{data.quizRequest.quiz.name}</h1>
        <p>Description: {data.quizRequest.quiz.desc}</p>
        <span>Author: {data.quizRequest.quiz.author.username}</span>
      </div>
      {data.quizRequest.done === null ? (
        <>
          <h1>You have challenge from: {data.quizRequest.user.username}. Just pick an emoji!</h1>
          <Choices>
            {data.quizRequest.quiz.emojis.map((emoji: { emoji: string }) => (
              <Twemoji key={emoji.emoji} onClick={() => pickEmoji(emoji.emoji)}>
                {emoji.emoji}
              </Twemoji>
            ))}
          </Choices>
        </>
      ) : (
        <>
          <h1>{data.quizRequest.done.length === 0 ? "No one has finished yet" : "There are results of this quiz request!"}</h1>
          {data.quizRequest.done.sort((a: any, b: any) => b.createdAt - a.createdAt).map((doneQuiz: any) => (
            <p>
              "{doneQuiz.user.username}" has chosen "{doneQuiz.choice}" which means "{doneQuiz.challenge}"
            </p>
          ))}
        </>
      )}

    </StyledQuiz>
  )
}

const mapStateToProps = (state: RootType) => ({
  token: state.auth.token
})

export default connect(mapStateToProps, {})(QuizRequest);