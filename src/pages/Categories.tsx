import React from 'react';

import {gql, useQuery} from "@apollo/client";
import CategoryListEntry from "../components/CategoryListEntry";
import styled from "styled-components";


const GET_CATEGORIES = gql`
    query GetCategories {
        categories{
            name
            icon
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


function Categories() {
  let {loading, error, data} = useQuery(GET_CATEGORIES)
  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error :( </div>
  }
  return (
    <StyledCategories>
      <h1>Categories:</h1>
      {data.categories.map((category: any) => <CategoryListEntry key={category.name} category={category}/>)}
    </StyledCategories>
  )
}


export default Categories;