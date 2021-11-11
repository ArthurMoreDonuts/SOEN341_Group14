import React from "react";
import styled from 'styled-components';
import { Switch, Route, Link, Redirect } from "react-router-dom";
import axios from "axios";
import { useState } from 'react';

import {  Table } from "semantic-ui-react";
import '../styling.css';


const Container = styled.div`
padding:0px 20px;
`;

const QuestionRow = styled.div`
background-color: #708090;
padding: 15px 10px ;
display: block;
border: 1px solid ;
margin-bottom: 2px;
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

const QuestionTitleArea = styled.div`
padding: 0px 20px;

`;

const QuestionLink = styled.a`
text-decoration: none;
font-size: 1.1rem;
color: #00008B;

`;

const DateTime = styled.div`
display: inline-block;
color: #C0C0C0;
font-size: 1.0rem;
float:right;
margin-top:20px;


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
        <>
        <Table celled structured>
        
        <Table.Body>

        {this.state.questions.map((question) => {
          return (
      <>
      
      <QuestionTitleArea>
      <QuestionLink key={question.title}>
    
      </QuestionLink>

      <QuestionRow>
      <Table.Row>

      <Table.Cell textAlign = 'left'>
      
          <QuestionStat>0<span>answers</span></QuestionStat>
          
          </Table.Cell>
          
          <Table.Header>
          <Table.Row verticalAlign = 'top'>
          <Table.Cell className="four-hundred-width">
           <h4>Title : {question.title} </h4>
          </Table.Cell>
          </Table.Row>
          </Table.Header>
          <Table.Row verticalAlign = 'top'>
         <h5> Description :</h5>  {question.description}
          <br />
          <br />
          <br />
          </Table.Row> 
       

          <Table.Row>
       
        </Table.Row>
        </Table.Row>

    <Table.Footer>
      <Table.Row>
      <Table.Cell>
        <DateTime>
              Posted on {question.created}
        </DateTime>
        </Table.Cell>
        <Table.Cell verticalAlign = 'right'>
        <DateTime>
        <a href={"/Questions/"+question.id}> Go to this question </a> 
        </DateTime>
        </Table.Cell>

      </Table.Row>
      
    </Table.Footer>

          </QuestionRow>
          </QuestionTitleArea>
        </>
    );
  })}
  
          </Table.Body>
          
</Table>

          
          </>
    );
  }

}

export default QuestionTable