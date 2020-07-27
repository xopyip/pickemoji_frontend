import React from 'react';
import Navigation from "./components/Navigation";
import styled from 'styled-components'

import {
  Switch,
  Route,
  useLocation
} from "react-router-dom";

import Tops from "./components/Tops";
import LoginPage from "./pages/Login";
import {connect} from "react-redux";
import {RootType} from "./reducers";
import Profile from "./pages/Profile";
import Categories from "./pages/Categories";
import Category from "./pages/Category";
import Quiz from "./pages/Quiz";
import QuizRequest from "./pages/QuizRequest";
import QuizRequestResult from "./pages/QuizRequestResult";
import Requests from "./pages/Requests";

const StyledApp = styled.div`
  display: grid;
  grid-template-columns: 2fr 4fr 3fr;
  height: 100%;
`;

const Main = styled.main`
  background: #04AB95;
  border-radius: 50px;
  padding: 50px;
`

let restrictedPaths = [
  /^\/$/,
  /^\/r\//,
]

function App({shouldLogin} : any) {
  let location = useLocation();
  return (
      <StyledApp>
        <Navigation/>
        <Main>
          <Switch>
            {shouldLogin && restrictedPaths.find(r => r.test(location.pathname)) !== undefined && <Route component={LoginPage}/>}
            <Route path={"/login"} component={LoginPage}/>
            <Route path={"/"} exact component={Profile}/>
            <Route path={"/categories"} component={Categories}/>
            <Route path={"/category/:name"} component={Category}/>
            <Route path={"/quiz/:id"} component={Quiz}/>
            <Route path={"/r/:id"} component={QuizRequest}/>
            <Route path={"/result/:id"} component={QuizRequestResult}/>
            <Route path={"/requests"} component={Requests}/>
          </Switch>
        </Main>
        <Tops/>
      </StyledApp>
  );
}

const mapStateToProps = (state : RootType) => ({
  shouldLogin: !state.auth.token || state.auth.token.length === 0
});
const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(App);
