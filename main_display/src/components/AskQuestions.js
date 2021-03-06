//need to download react router to link to main page
//use '/ask' to access page
import styled from 'styled-components';
import PostButton from "./PostButton";
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import axios from 'axios';
import http from "../http-common";




const Container = styled.div`
padding:30px 20px;
`;

const QuestionTitle = styled.input`
background:none;
border: 1px solid #aaa;
border-radius: 3px;
display: #fff;
width: 100%;
padding: 10px;
margin-bottom: 20px;
box-sizing: border-box;
`;


const QuestionTextBox= styled.textarea`
background:none;
border: 1px solid #aaa;
border-radius: 3px;
display: #fff;
width: 100%;
min-height: 200px;
box-sizing: border-box;
padding: 10px;
margin-bottom: 20px;
`;

const StyledHeader= styled.h1`
font-size: 1.8rem;
padding:10px;
`;

export default function AskQuestions() {

const [questionTitleInput, setQuestionTitleInput] = useState('');
const [questionBody, setQuestionBody] = useState('');



    //To save questions/ post- to add to database with endpoint e.g /questions to send request to API
    //p4 1:35
    /*
    function sendQuestion(){
        //axios.questions(wtv the connection is)
        data:{ 
        title: questionTitleInput,
        description: questionBody,
        }
    }
*/

var questionID;
function postQuestion() {

    const user = JSON.parse(localStorage.getItem('user')); //how to get the username from login system.
    if (user){
    var questionObject= {
                       author: user.username,
                       title: questionTitleInput,
                       description: questionBody
                       };

    }
    else{

    var questionObject= {
                       author: 'Anonymous',
                       title: questionTitleInput,
                       description: questionBody
                       };
    }


        const http = new XMLHttpRequest();


        http.open("POST","http://localhost:8080/api/Questions");
        http.setRequestHeader("Content-Type" , "application/json");

        console.log(questionObject);

        http.send(JSON.stringify(questionObject));

        //http.send(JSON.stringify(questionObject));
        http.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 201) {
             var question;
             question = JSON.parse(this.responseText);
             questionID = question.id;
              console.log(questionID);

              alert('Question Posted! ');

              //redirecting to the questions page


              window.location.href = "/Questions/"+questionID;



            }
          }



return questionID;
    }
return(

<Container>
    <StyledHeader>Ask a question</StyledHeader>
    <form onSubmit={console.log("form")}>
    <QuestionTitle  type = "text"
                    value = {questionTitleInput} 
                    onChange={e => setQuestionTitleInput(e.target.value)}
                    placeholder="Title of your question" />

    <QuestionTextBox 
    onChange={e => setQuestionBody(e.target.value)}
    placeholder="Please type your question in detail.." value ={questionBody}/>
    
    <div>
    <ReactMarkdown plugins={[gfm]} children={''} />
    </div>

    <PostButton type='button'  onClick= {postQuestion} >Post</PostButton>
    </form>
   
</Container>

);


}