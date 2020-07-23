import React from 'react';

import {connect} from "react-redux";
import {RootType} from "../reducers";
import {gql, useQuery} from "@apollo/client";
import styled from "styled-components";
import defaultAvatar from "../assets/user.png";
import heartIcon from "../assets/heart.png";
import checkIcon from "../assets/check.png";
import quizzesIcon from "../assets/quizzes.png";


const GET_USER = gql`
    query GetUser($username : String!) {
        user(username: $username){
            _id
            username
            about
        }
    }
`;
const GET_SELF = gql`
    query GetSelf {
        me{
            _id
            username
            about
        }
    }
`;

const ProfileHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-top: 100px;
  h1{
    color: #ffffff;
    font-size: 45px;
    font-weight: lighter;
    margin: 0;
  }
  img{
    height: 120px;
    width: 120px;
  }
`
const About = styled.div`
  margin-top: 30px;
  h2{
    color: #ffffff;
    font-size: 30px;
    font-weight: lighter;
    margin: 0;
  }
  p{
    color: #ffffff;
    margin: 0;
    font-size: 24px;
    font-weight: lighter;
  }
`
const Stats = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-weight: lighter;
  color: #fff;
  span:not(:last-of-type){
    margin-right: 30px;
  }
`

function Profile({token, username} : any) {
  let {loading, error, data} = useQuery(username ? GET_USER : GET_SELF, {
    variables: {
      username
    }
  })
  if(loading){
    return <div>Loading...</div>
  }
  if(error){
    return <div>Error :( </div>
  }
  data = username ? data.user : data.me;
  return (
    <div>
      <ProfileHeading>
        <h1>{data.username}'s Profile</h1>
        <img src={defaultAvatar} alt={"Avatar"}/>
      </ProfileHeading>
      <About>
        <h2>About:</h2>
        <p>{data.about.length > 0 ? data.about : "No description"}</p>
      </About>
      <Stats>
        <img src={heartIcon} alt={"hearts"}/>
        <span>123</span>
        <img src={checkIcon} alt={"done"}/>
        <span>123</span>
        <img src={quizzesIcon} alt={"quizzes"}/>
        <span>123</span>
      </Stats>
    </div>
  )
}
const mapStateToProps = (state : RootType) => ({
  token: state.auth.token
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);