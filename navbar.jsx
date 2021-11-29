import React, { Component } from 'react';
import { Switch, Route, Link } from "react-router-dom";
import AskQuestions from "./AskQuestions";
import Counters from './counters';
import { Login } from './login';
import { Register } from './login';
import listOfQuestions from './listOfQuestions';
import postedQuestion from './PostedQuestion';
import ProfilePage from "./profile/ProfilePage";
import listOfAnswers from './listOfAnswers';

import styled from 'styled-components';

import axios from "axios";
import { useState } from 'react';

const align = styled.div`

text-align: right;
`;


class NavBar extends Component {

    
    render() { 
        const user = JSON.parse(localStorage.getItem('user')); //how to get the username from login system.
        return (
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <span className = "badge m-1 badge-pill badge-primary">
                            {this.props.totalCounters}
                        </span>
                        
                        <button class="btn btn-outline-success me-2" type="button">
                        <Link to={"/MainPage"} className="nav-link">
                            Main Page</Link></button>
                        <button class="btn btn-outline-success me-2" type="button">
                        <Link to={"/Profile"} className="nav-link">
                              Profile
                            </Link>
                            </button>
                        <button class="btn btn-outline-success me-2" type="button">
                            <Link to={"/Questions"} className="nav-link">
                                    All Questions
                            </Link>
                        </button>

                        <button class="btn btn-outline-success me-2" type="button">
                        <Link to={"/Answers"} className="nav-link">
                                    Answers
                            </Link>
                        
                        </button>


                        <button class="btn btn-outline-success me-2" type="button">
                        <Link to={"/Ask"} className="nav-link">
                         Ask Question
                        </Link></button>
                        <button class="btn btn-outline-success me-2" type="button">
                        <Link to={"/Login"} className="nav-link">Login
                        </Link></button>
                        <button class="btn btn-outline-success me-2" type="button">
                        <Link to={"/Register"} className="nav-link">   Sign-Up </Link></button>
                    </a>
                    <a>
                    <align>
                    Logged in as: <Link to={"/Profile"} className="nav-link">
                    {user.username}
                        </Link>
                    </align>
                    </a>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
                <div className="container mt-3">
          <Switch>
            <Route exact path="/ask" component={AskQuestions} />
            <Route exact path="/MainPage" component={Counters} />
            <Route exact path="/Login" component={Login} />
            <Route exact path="/Register" component={Register} />
            <Route exact path="/Questions" component={listOfQuestions} />
            <Route exact path="/Profile" component={ProfilePage} />
            <Route exact path="/Answers" component={listOfAnswers} />
            <Route path="/Questions/:id" component = {postedQuestion}/>
          </Switch>
        </div>
            </nav>
        );
    }
}
 
export default NavBar;