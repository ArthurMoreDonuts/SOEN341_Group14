/*
import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddQuestion from "./components/add-question";

import QuestionsList from "./components/questions-list";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/Questions" className="navbar-brand">
            bezKoder
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/Questions"} className="nav-link">
                Questions
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/Questions"]} component={QuestionsList} />
            <Route exact path="/add" component={AddQuestion} />
            
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;


*/

import React, {Component} from 'react';
import NavBar from './components/navbar';
import Counters from './components/counters';
import './App.css';
import AskQuestions from "./components/AskQuestions";
import { Switch, Route, Link } from "react-router-dom";

class App extends Component {
  
  render() {
    return(
      <React.Fragment>
        {/* Needed due to having multiple class Components */}
        <NavBar
          />
         
          
      </React.Fragment>
    );

    

    

  }
 
 
}

export default App;


