import React from 'react';
import Navigation from "./components/Navigation";
import styled from 'styled-components'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Tops from "./components/Tops";
import LoginPage from "./pages/Login";

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

function App() {
  return (
    <Router>
      <StyledApp>
        <Navigation/>
        <Main>
          <Switch>
            <Route path={"/"} exact component={LoginPage}/>
          </Switch>
        </Main>
        <Tops/>
      </StyledApp>
    </Router>
  );
}

export default App;
