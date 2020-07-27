import React, {useState} from 'react';

import {gql, useQuery} from "@apollo/client";
import styled from "styled-components";
import Twemoji from "react-twemoji";
import moment from "moment";


const GET_REQUESTS = gql`
    query GetRequests {
        myRequests{
            _id
            quiz{
                _id
                name
                desc
                emojis{
                    emoji
                    desc
                }
                accepted
                createdAt
            }
            done{
                user{
                    username
                }
                challenge
                choice
                createdAt
            }
        }
    }
`;

const StyledRequests = styled.div`
  ul{
    list-style: none;
    margin: 0;
    padding: 0;
    ul{
      height: 0;
      overflow: hidden;
      li{
        ::marker{
          content: '-';
        }
        span{
          float:right;
        }
        p{
          display: inline;
        }
        &:after{
          content: ' ';
          display: table-cell;
          clear: both;
        }
      }
    }
    li{
      margin: 20px 0;
      background: #078373;
      padding: 10px;
      color: #ffffff;
      border-radius: 10px;
    }
  }
  
  ul li.active ul{
    height: auto;
  }
`

const StyledRequestHeader = styled.div`
  display: flex;
  h2{
    flex-grow: 1;
  }
  div{
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-auto-flow: column;
    img{
      height: 40px;
    }
  }
`
const ListExpandButton = styled.div`
  text-align: center;
  padding: 10px;
  color: #ffffff;
  border-radius: 10px;
  &:hover{
    background: #076d60;
    cursor:pointer;
  }
`

function Requests() {

  let {loading, error, data} = useQuery(GET_REQUESTS);
  let [expanded, setExpanded] = useState<string[]>([]);
  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error :( </div>
  }


  let toggleExpand = (id: string) => {
    if(expanded.indexOf(id) < 0){
      setExpanded([...expanded, id]);
    }else{
      setExpanded(expanded.filter(n => n !== id));
    }
  }

  return (
    <StyledRequests>
      <ul>
        {data.myRequests.map((request: any) => (
          <li key={request._id} className={expanded.indexOf(request._id) < 0 ? "" : "active"}>
            <StyledRequestHeader>
              <h2>{request.quiz.name}</h2>
              <Twemoji>
                {request.quiz.emojis.map((emoji: { emoji: string }) => (
                  <span key={emoji.emoji}>{emoji.emoji}</span>
                ))}
              </Twemoji>
            </StyledRequestHeader>
            <ul>
              {request.done.sort((a: any, b: any) => b.createdAt - a.createdAt).map((doneQuiz: any) => (
                <li>
                  <p>"{doneQuiz.user.username}" has chosen "{doneQuiz.choice}" which means "{doneQuiz.challenge}"</p>
                  <span>{moment(doneQuiz.createdAt).fromNow()}</span>
                </li>
              ))}
            </ul>
            <ListExpandButton onClick={() => toggleExpand(request._id)}>
              <span>{expanded.indexOf(request._id) < 0 ? "v" : "^"}</span>
            </ListExpandButton>

          </li>
        ))}
      </ul>
    </StyledRequests>
  )
}


export default Requests;