import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import LiLink from "./LiLink";
import logo from "../assets/pickemoji.png";

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  img{
    width: 50%;
    display: block;
    margin: 20px auto;
  }
`

const ListHolder = styled.div`
  flex-grow: 1;
  display: grid;
  place-items: center;
  ul{
    width: 100%;
    margin: 0;
    list-style: none;
    padding: 0 0 0 50px;
    box-sizing: border-box;
    li{
      padding: 0 30px;
      border-radius: 45px 0 0 45px;
      box-sizing: border-box;
      height: 90px;
      a{
        text-transform: uppercase;
        font-size: 25px;
        line-height: 90px;
        text-decoration: none;
        color: #434343;
      }
      &.active{
        background: #04AB95;
        a{
          color: #ffffff;
        }
      }
    }
  }
`

function Navigation() {
  return (
    <Nav>
      <Link to={"/"}>
        <img src={logo} alt={"PickEmoji"}/>
      </Link>
      <ListHolder>
        <ul>
          <LiLink to={"/"} exact>Account</LiLink>
          <LiLink to={"/categories"}>Categories</LiLink>
          <LiLink to={"/search"}>Search</LiLink>
          <LiLink to={"/create"}>Create</LiLink>
        </ul>
      </ListHolder>
    </Nav>
  )
}

export default Navigation;