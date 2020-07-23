import React from "react";
import styled from "styled-components";
import Twemoji from "react-twemoji";
import {Link} from "react-router-dom";

const Element = styled.div`
  margin: 5px;
  border: 2px solid #078373;
  background: #04AB95;
  border-radius: 10px;
  padding: 10px;
  box-sizing: border-box;
  color: #ffffff;
`

function CategoryListEntry({category} : any){

  return (
    <Link to={"/category/" + category.name}>
      <Element>
        <h1>{category.name}</h1>
        <Twemoji>
          {category.icon}
        </Twemoji>
      </Element>
    </Link>
  )
}

export default CategoryListEntry;