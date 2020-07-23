import React, {ChangeEvent, useCallback, useState} from 'react';
import loginImg from "../assets/login_bg.png";
import styled from "styled-components";
import {Link} from "react-router-dom";

const StyledLoginPage = styled.div`
  display: grid;
  height: 100%;
  place-items: center;
  img{
    width: 350px;
  }
  form{
    margin-top: 50px;
    width: 350px;
  }
`

const FormContainer = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 30px;
  input{
    width: 100%;
    display: block;
    background: #078373;
    color: #fff;
    border: 0;
    padding: 10px;
    box-sizing: border-box;
    font-size: 16px;
  }
  input:focus ~ label, input:valid ~ label{
    top: -25px;
    
    left: 0;
  }
  label{
    position: absolute;
    color: #ffffff;
    top: 10px;
    left: 10px;
    font-size: 16px;
    transition: all 0.5s ease-in-out;
  }
`

const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 10px;
  button{
    background: #5F93EC;
    color: #ffffff;
    text-transform: uppercase;
    border: 0;
    padding: 20px;
    box-sizing: border-box;
    cursor: pointer;
    &:nth-of-type(2){
      background: #EC5F5F;
    }
  }
`

function LoginPage() {
  let [login, setLogin] = useState("");
  let [password, setPassword] = useState("");
  let onLoginChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setLogin(e.target.value), []);
  let onPasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value), []);
  return (
    <StyledLoginPage>
      <div>
        <img src={loginImg} alt={""}/>
        <form autoComplete={"off"}>
          <FormContainer>
            <input type={"text"} id={"loginInput"} autoComplete={"off"} required={true} value={login} onChange={onLoginChange}/>
            <label htmlFor={"loginInput"}>Login:</label>
          </FormContainer>
          <FormContainer>
            <input type={"password"} id={"passwordInput"} autoComplete="new-password" required={true} value={password} onChange={onPasswordChange}/>
            <label htmlFor={"passwordInput"}>Password:</label>
          </FormContainer>
          <ButtonGroup>
            <button>Login</button>
            <button>Register</button>
          </ButtonGroup>

        </form>
      </div>
    </StyledLoginPage>
  )
}

export default LoginPage;