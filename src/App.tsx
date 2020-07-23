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
  grid-template-columns: 1fr 1fr 1fr;
`;

function App() {
  return (
    <Router>
      <StyledApp>
        <Navigation/>
        <main>
          <Switch>
            <Route path={"/"} exact component={LoginPage}/>
          </Switch>
        </main>
        <Tops/>
      </StyledApp>
    </Router>
  );
}

export default App;
