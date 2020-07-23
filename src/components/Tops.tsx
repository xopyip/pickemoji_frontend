import React, {useState} from 'react';

import {gql, useQuery} from "@apollo/client";
import QuizListEntry from "./QuizListEntry";
import styled from "styled-components";
import heartIcon from "../assets/heart.png";
import timeIcon from "../assets/time.png";


const GET_QUIZZES = gql`
    query GetQuizzes {
        quizzes{
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

const StyledTops = styled.div`
  h1{
    font-weight: lighter;
    text-align: center;
  }
`
const TopCategorySelector = styled.div`
  background: #CBC9C9;
  margin: 0 50px;
  color: #707070;
  display: flex;
  border-radius: 10px;  
  div{
    padding: 10px 20px;
    border-radius: 10px;
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    cursor:pointer;
    img{
      height: 20px;
      filter: invert();
      opacity: 0.5;
    }
    &.active{
     background: #ECE8E8;
     border: 2px solid #CBC9C9;
    }
  }
`

function Tops() {
  let [category, setCategory] = useState("POPULAR");
  let {loading, error, data} = useQuery(GET_QUIZZES)
  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error :( </div>
  }

  return (
    <StyledTops>
      <h1>TOP LISTS</h1>
      <TopCategorySelector>
        <div onClick={() => setCategory("POPULAR")} className={category === "POPULAR" ? "active" : ""}>
          Most Popular
          <img src={heartIcon} alt={"heart"}/>
        </div>
        <div onClick={() => setCategory("NEWEST")} className={category === "NEWEST" ? "active" : ""}>
          Newest
          <img src={timeIcon} alt={"time"}/>
        </div>
      </TopCategorySelector>
      {category === "POPULAR" ?
        data.quizzes.slice(0, 10).sort((a: any, b: any) => b.likes - a.likes).map((quiz: any) => <QuizListEntry
          key={quiz._id} quiz={quiz}/>) :
        data.quizzes.slice(0, 10).sort((a: any, b: any) => b.createdAt - a.createdAt).map((quiz: any) => <QuizListEntry
          key={quiz._id} quiz={quiz}/>)
      }
    </StyledTops>
  )
}


export default Tops;