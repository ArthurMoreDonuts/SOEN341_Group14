import React from "react";
import styled from 'styled-components';
import { Switch, Route, Link, Redirect } from "react-router-dom";
import axios from "axios";
import { useState } from 'react';
import ques from "../../mock-data.json";
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
//function QuestionTable() {
render(){
  //const[ques, setQues] = useState(data);
  
    return(
        <>
        

        <Table celled structured>
        
        <Table.Body>

  {ques.map(el => {
    return (
      <>
      
      <QuestionTitleArea>
      <QuestionLink key={el.title}>
      </QuestionLink>

      <QuestionRow>
      <Table.Row>

      <Table.Cell textAlign = 'left'>
      <QuestionStat>0<span>votes</span></QuestionStat>
          <QuestionStat>0<span>answers</span></QuestionStat>
          <QuestionStat>0<span>comments</span></QuestionStat>
          </Table.Cell>
          
          <Table.Header>
          <Table.Row verticalAlign = 'top'>
          <Table.Cell className="four-hundred-width">
          {el.title}
          </Table.Cell>
          <br />
          <br />
          </Table.Row>
          </Table.Header>
          
          
          <Table.Row verticalAlign = 'top'>
          {el.description}
          <br />
          <br />
          </Table.Row> 
       

          <Table.Row>
        {el.answered}
        </Table.Row>
        </Table.Row>

    <Table.Footer>
      <Table.Row>
      <Table.Cell>
        <DateTime>
              Posted on {el.DateTime}
        </DateTime>
        </Table.Cell>
        <Table.Cell verticalAlign = 'right'>
        <DateTime>
       {el.author} 
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