import React, {useCallback} from 'react';

import {gql, useMutation, useQuery} from "@apollo/client";
import styled from "styled-components";
import Twemoji from "react-twemoji";


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

const CHALLENGE_FRIENDS = gql`
    mutation ChallengeFriend($id: String){
        requestQuiz(quizID: $id){
            _id
        }
    }
`;

const StyledQuiz = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
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
    &:hover{
      background: #078373;
      border-radius: 10px;
    }
  }
`

const ButtonGroup = styled.div`
  text-align: center;
  button{
    background: #078373;
    color: #fff;
    padding: 10px 20px;
    margin: 5px;
    border: 0;
    cursor: pointer;
  }
`


function Quiz({match} : any) {

  let [challengeFriend] = useMutation(CHALLENGE_FRIENDS)

  let onChallengeFriend = useCallback(() => {
    challengeFriend({variables: {id: match.params.id}}).then(ret => {
      alert("https://pickemoji.games/r/" + ret.data.requestQuiz._id);
    }).catch(error=> {
      console.log(error);
    });
  }, [challengeFriend, match]);

  let onExport = useCallback(() => {
    //TODO: to be implemented...
  }, []);

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

  return (
    <StyledQuiz>
      <div>
        <h1>{data.quiz.name}</h1>
        <p>Description: {data.quiz.desc}</p>
        <span>Author: {data.quiz.author.username}</span>
      </div>
      <Choices>
        {data.quiz.emojis.map((emoji : {emoji : string, desc : string}) => (
          <Twemoji>
            {emoji.emoji} - {emoji.desc}
          </Twemoji>
        ))}
      </Choices>
      <ButtonGroup>
        <button onClick={onChallengeFriend}>Challenge friend</button>
        <button onClick={onExport}>Export image</button>
      </ButtonGroup>
    </StyledQuiz>
  )
}


export default Quiz;