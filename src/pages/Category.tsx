import React from 'react';

import {gql, useQuery} from "@apollo/client";
import styled from "styled-components";
import QuizListEntry from "../components/QuizListEntry";


const GET_CATEGORY = gql`
    query GetCategory($name: String) {
        category(name: $name){
            name
            icon
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
    }
`;

const StyledCategories = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  &>h1{
    grid-column: 1/3;
    text-align: center;
    font-weight: lighter;
    color: #ffffff;
    margin: 20px 0 60px 0;
    text-decoration: none;
  }
  a > div > div{
    text-align: right;
    //float:right;
    margin-top:-30px
  }
  a > div :after{
    display: table-cell;
    content: ' ';
    clear: both;
  }
`


function Category({match} : any) {

  let {loading, error, data} = useQuery(GET_CATEGORY, {
    variables: {
      name: match.params.name
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
    <StyledCategories>
      <h1>Category: {data.category.name}</h1>
      {data.category.quizzes.map((quiz: any) => <QuizListEntry key={quiz._id} quiz={quiz}/>)}
    </StyledCategories>
  )
}


export default Category;