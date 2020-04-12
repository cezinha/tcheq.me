import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Navbar,
  Nav
} from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Home';
import About from './About';
import MyLocation from './MyLocation';
import Step1 from './register/Step1';
import Step2a from './register/Step2a';
import Step2b from './register/Step2b';
import Step2c from './register/Step2c';
import Step3 from './register/Step3';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar bg="light" variant="light">
        <Navbar.Brand href="/">
          <img
            src="/logo.svg"
            className="d-inline-block align-top logo"
            alt="checkCOVID.me"
          />
        </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/my-location">
            <MyLocation />
          </Route>
          <Route exact path="/register">
            <Step1 />
          </Route>
          <Route exact path="/register/step2a">
            <Step2a />
          </Route>
          <Route exact path="/register/step2b">
            <Step2b />
          </Route>
          <Route exact path="/register/step2c">
            <Step2c />
          </Route>
          <Route exact path="/register/step3">
            <Step3 />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
