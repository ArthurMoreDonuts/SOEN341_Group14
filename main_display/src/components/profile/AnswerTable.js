import React from "react";
import styled from 'styled-components';
import { Switch, Route, Link, Redirect } from "react-router-dom";
import axios from "axios";
import { useState } from 'react';


//import sematic-ui-react
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
//function QuestionTable() {
render(){
  //const[ques, setQues] = useState(data);
  
  if (this.state.hasanswers==false){
    return (<h3>No answers</h3>);
    }
  
    
    

      
  
    return(
        <>
        

        <Table celled structured>
        
        <Table.Body>

  {this.state.answers.map(el => {
    return (
      <>
      
      <QuestionTitleArea>
      <QuestionLink key="Title">
      </QuestionLink>

      <QuestionRow>
      <Table.Row>

      <Table.Cell textAlign = 'left'>
      <QuestionStat>0<span>votes</span></QuestionStat>
      
          <QuestionStat>0<span>comments</span></QuestionStat>
          </Table.Cell>
          
          <Table.Header>
          <Table.Row verticalAlign = 'top'>
          <Table.Cell className="four-hundred-width">
            Response :           {el.response}

          </Table.Cell>
          <br />
          <br />
          </Table.Row>
          </Table.Header>
          
          
          <Table.Row verticalAlign = 'top'>
          <br />
          <br />
          <a href={"/Questions/"+el.questionId}> View question </a>
          <br />
          <br />
          </Table.Row> 
       

        
        </Table.Row>

    <Table.Footer>
      <Table.Row>
      <Table.Cell>
        <DateTime>
              Posted on {el.created}
        </DateTime>
        </Table.Cell>
        <Table.Cell verticalAlign = 'right'>
        <DateTime>
    
        </DateTime>
        </Table.Cell>

      </Table.Row>
      
    </Table.Footer>
    
          </QuestionRow>
          </QuestionTitleArea>

          
          
          <Container>
          <QuestionRow>
          <Table.Row>
          
          
          
          <MyAnswer>
          
          {el.author}:
           This is the answer to my questions
          {el.description}
          </MyAnswer>
          </Table.Row>
   </QuestionRow>
   </Container>
   
   
        </>
    );
  })}

  
          </Table.Body>
          
</Table>

        
          </>
    );

}
}

export default AnswerTable