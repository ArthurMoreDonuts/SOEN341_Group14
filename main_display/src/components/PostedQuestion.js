import React from "react";
import DataService from "../services/question.service";
import { useHistory, useParams } from 'react-router-dom'
import { withRouter } from "react-router";
import axios from 'axios';
import PostButton from "./PostButton";
import './styling.css';
import './UserBestAnswer'
import Checkbox from "./checkbox";
import UserBestAnswer from "./UserBestAnswer";





export class postedQuestion extends React.Component{
state = {
    thisQuestionID:"",
    questions: [],
    isempty:false,
    hasanswers:true,
    answers: []



}
value = {
       thisQuestionID:"",
       newAnswer:""

}



componentDidMount() {
  const id = this.props.match.params.id;

  // FOR THE QUESTION ITSELF
    axios.get('http://localhost:8080/api/Questions/'+id)
      .then(res => {
        const questions = [];
        questions.push( res.data);
         this.setState({questions: questions,thisQuestionID: id });
        console.log(this.state.questions);
      })


       .catch(err => {
          console.log(err);
          this.setState({ isempty: true , thisQuestionID: id });
         });

         //FOR ANSWERS
        axios.get('http://localhost:8080/api/Questions/'+id+'/Answers')
              .then(res => {
                const answers = res.data;
                 this.setState({answers: answers });
                console.log(this.state.answers);
              })


               .catch(err => {
                  console.log(err);
                  this.setState({ hasanswers: false });
                 });

  }

populatingAnswers(){

if (this.state.hasanswers==false){
       return (<h1>No answers</h1>);
       }
       else{
       console.log("WE HAVE ANSWERS");
return(
      <div>
           {this.state.answers.map(answer =>
               <div class = "answerBody" >
                      <p>{answer.response}</p>
                      <p>{answer.author}</p>
                      <div class = "Checkbox" >                      
                      if({answer.author} == {thisQuestionID}){
                      <p>{UserBestAnswer}</p>  }
                        </div>
                </div>
            )}
    </div>
        )
  }
}

handleNewAnswerBox(event){
this.value={newAnswer: event , thisQuestionID: this.value.thisQuestionID };

}


handlePostNewAnswer() {

console.log(this.value.newAnswer);
console.log(this.value.thisQuestionID);


   var AnswerObject= {
                   questionId: this.state.thisQuestionID,
                   author: 'Anonymous',
                   response: this.value.newAnswer,

                   };
        const http = new XMLHttpRequest();


        http.open("POST","http://localhost:8080/api/Questions/Answers");
        http.setRequestHeader("Content-Type" , "application/json");

        console.log(AnswerObject);

        http.send(JSON.stringify(AnswerObject));

        //http.send(JSON.stringify(questionObject));
        http.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 201) {


              alert('Answer Posted! ');

               var question;
               question = JSON.parse(this.responseText);

                 //redirecting to the questions page


               window.location.href = "/Questions/"+question.questionId;



            }
          }


}

render()
    {
     if (this.state.isempty==true){
       return (<h1>WHAT IS EVEN LIFE(ERROR 404)</h1>);
       }

     return (

    <div>

           {this.state.questions.map(question =>

           <div class = "questionTitle">
                      <h1>{question.title}</h1>
               <div className="questionBody">


                      <p>{question.description}</p>
                      <p>{question.author}</p>

                </div>
            </div>

            )}



            {this.populatingAnswers()}




    //NEW ANSWER
    <React.Fragment>
<div>
<form onSubmit={console.log("form")}>
    <textarea
            className="answerBody"
             id="exampleFormControlTextarea1"
             onChange={e =>  this.handleNewAnswerBox(e.target.value)}



       />
    <PostButton type='button' onClick = {()=>this.handlePostNewAnswer()} >
    <s1>Post new Answer</s1>
    </PostButton>


        </form>

</div>
</React.Fragment>



</div>
          ) // END OF RETURN




    }
}
export default postedQuestion;
