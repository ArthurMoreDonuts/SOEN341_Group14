import React from "react";
import styled from 'styled-components';
import { Switch, Route, Link, Redirect } from "react-router-dom";
import axios from "axios";
import { useState } from 'react';
import QuestionTable from './QuestionTable';
import AnswerTable from './AnswerTable';
import {  Table } from "semantic-ui-react";


//import ReactMarkdown from 'react-markdown';
//import gfm from 'remark-gfm';
//import axios from 'axios';
//import http from "../http-common";
//import NavBar from './components/navbar';
import PostButton from "../PostButton";
//import { Login } from '../login';


const HeaderRow = styled.div `
display: grid;
grid-template-columns: 1fr min-content;
font-size: 1.5rem;
padding: 20px 20px;
color: #00008B;

;`

const StyledHeader= styled.h1`
font-size: 1.5rem;
padding:0px 20px;
`;


 


function ProfilePage() {

  const user = JSON.parse(localStorage.getItem('user')); //how to get the username from login system.

      return (
        <>
        
        
        <HeaderRow>
        
        {user ?  user.username : "Please Sign in"}
        <button class="btn btn-outline-success me-2" type="button">
                        <Link to={"/Login"} className="nav-link">{user ? "Logout" : "Login"}
                        </Link></button>

        </HeaderRow>
        <StyledHeader>My Questions</StyledHeader>
     
        <QuestionTable />
  
        <listOfQuestions />

        <StyledHeader>My Answers</StyledHeader>
        <AnswerTable />
        
        
        
        </>
          

    );
    
}


export default ProfilePage;