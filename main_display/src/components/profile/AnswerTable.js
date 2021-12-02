import React from "react";
import styled from 'styled-components';
import { Switch, Route, Link, Redirect } from "react-router-dom";
import axios from "axios";
import { useState } from 'react';


import DataService from "../../services/question.service";
import { useHistory, useParams } from 'react-router-dom'
import { withRouter } from "react-router";

import PostButton from "../PostButton";
import PostedQuestion from "../PostedQuestion";



//import sematic-ui-react
import {  Table } from "semantic-ui-react";
import '../styling.css';


const Container = styled.div`
padding:10px 10px;
margin-top: 10px;
`;



          
const MyAnswer = styled.div`
display: inline-block;
font-weight:bold;
font-size: 1.0rem;
float:right;
margin-top:0px;
`;


class AnswerTable extends React.Component {

  state = {
    hasanswers:false,
    answers: []

  }

  

componentDidMount() {
const user = JSON.parse(localStorage.getItem('user')); //how to get the username from login system.
 if(user != null)
        {
            axios.get('http://localhost:8080/api/Answers/auth/'+ user.username)
                .then(res => {
                  const answers = res.data;
                  this.setState({answers: answers });
                  console.log(this.state.answers);
                  if (this.state.answers.length != 0){

                  this.setState({ hasanswers: true });
                  }
                })
                  .catch(err => {
                          console.log(err);
                          this.setState({ hasanswers: false });
                         });
        }


             
}
//function QuestionTable() {
render(){
  //const[ques, setQues] = useState(data);
  
  if (this.state.hasanswers==false){
    return (<h3>No answers</h3>);
    }
  
    
    
    return(
    
        
        
      <Container>
      
  
      {this.state.answers.map(el => {
    return (
        <>
        
        <div class = "questBod">
             
  
        <div className="AnswerDescription">
           {el.response}
           </div>
        
           
                        
              
            <div class = "Stats">
            <p>0 Comments </p>
            <p>0 Votes</p>
            </div>
            <div class = "QAuthorArea"> 
                        Posted by: {el.author}</div>
  
                        <div class = "Stats">
                        Posted on {el.created}
                        </div>
                        <a href={"/Questions/"+el.questionId}> View question </a>
            </div>
          </>
      );
    })}
    
    </Container>
            
  
  
  
            
            
      );
      
  
   

}
}

export default AnswerTable