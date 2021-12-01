import React from "react";
import styled from 'styled-components';
import { Switch, Route, Link, Redirect } from "react-router-dom";
import axios from "axios";
import { useState } from 'react';
import DataService from "../../services/question.service";
import { useHistory, useParams } from 'react-router-dom'

import {  Table } from "semantic-ui-react";
import '../styling.css';


const Container = styled.div`
padding:10px 10px;
margin-top: 10px;
`;



const QuestionStat = styled.div`
text-align: center;
font-size: 1.2 rem;
span{
  font-size: .8rem;
  display: block;
  font-weight: 500;
  margin-top: 4px;
  padding: 5px;
}
`;

      

class QuestionTable extends React.Component {
  state = {
    questions: [],
     isempty:true
}

componentDidMount() {
const user = JSON.parse(localStorage.getItem('user')); //how to get the username from login system.

  axios.get('http://localhost:8080/api/Questions/auth/' +user.username)
    .then(res => {
      const questions = res.data;
      this.setState({questions: questions });
      console.log(user.username);
      console.log(this.state.questions);
      if (this.state.questions.length != 0){
      this.setState({ isempty: false });
      }
    })
      .catch(err => {
              console.log(err);
              this.setState({ isempty: true });
             });
}

//function QuestionTable() {
render(){
  //const[ques, setQues] = useState(data);
  console.log(this.state.isempty);
  if (this.state.isempty==true){
    console.log("returning");
    return (<h3>No questions</h3>);
    }
  
  return(
    
        
        
    <Container>
    

        {this.state.questions.map((question) => {
          return (
      <>
      
      <div class = "questBod">
           <div class = "questionTitle">
      {question.title}
      </div>

      <div className="AnswerDescription">
         {question.description}
         </div>
      
         
                      
            
          <div class = "Stats">
          <p>0 Answers </p>
          <p>0 Votes</p>
          </div>
          <div class = "QAuthorArea"> 
                      Posted by: {question.author}</div>

                      <div class = "Stats">
                      Posted on {question.created}
                      </div>
          <a href={"/Questions/"+question.id}> Go to this question </a> 
          </div>
        </>
    );
  })}
  
  </Container>
          



          
          
    );
  }

}

export default QuestionTable