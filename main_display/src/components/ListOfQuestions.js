import React from "react";
import DataService from "../services/question.service";
import axios from 'axios';
import './styling.css';
import PostButton from "./PostButton";
import styled from 'styled-components';
import {  Table } from "semantic-ui-react";

const Container = styled.div`
padding:10px 10px;
margin-top: 10px;
`;



export class listOfQuestions extends React.Component{
state = {
    questions: [],
     isempty:false
}

  componentDidMount() {
    axios.get('http://localhost:8080/api/Questions')
      .then(res => {
        const questions = res.data;
        this.setState({questions: questions });
        console.log(this.state.questions);
      })
        .catch(err => {
                console.log(err);
                this.setState({ isempty: true });
               });
  }
  

render()
    {
     if (this.state.isempty==true){
           return (<h1>WHAT IS EVEN LIFE(ERROR 404)</h1>);
           }

     return (
      



<Container>
<div><h1>Questions</h1></div>
           {this.state.questions.map(question =>
            <div class = "questBod">
           <div class = "questionTitle">
                     <a href={"/Questions/"+question.id}> {question.title} </a></div>
               <div className="AnswerDescription">
                      {question.description}</div>
                      <div class = "QAuthorArea"> 
                      Posted by: {question.author}</div>
                      </div>
            )}

            </Container>
    

    
          )




    }
}
export default listOfQuestions;
