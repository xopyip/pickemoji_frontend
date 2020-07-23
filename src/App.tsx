import React from 'react';
import Navigation from "./components/Navigation";
import styled from 'styled-components'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Tops from "./components/Tops";
import LoginPage from "./pages/Login";
import {connect} from "react-redux";
import {RootType} from "./reducers";

const StyledApp = styled.div`
  display: grid;
  grid-template-columns: 2fr 5fr 3fr;
  height: 100%;
`;

const Main = styled.main`
  background: #04AB95;
  border-radius: 50px;
  padding: 50px;
`

function App({isLogged} : any) {
  return (
    <Router>
      <StyledApp>
        <Navigation/>
        <Main>
          <Switch>
            <Route path={"/"} exact>
              {!isLogged && <Redirect to={"/login"} />}
              home
            </Route>
            <Route path={"/login"} component={LoginPage}/>
          </Switch>
        </Main>
        <Tops/>
      </StyledApp>
    </Router>
  );
}

const mapStateToProps = (state : RootType) => ({
  isLogged: state.auth.token && state.auth.token.length > 0
});
const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(App);
