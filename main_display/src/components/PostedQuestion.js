import React from "react";
import DataService from "../services/question.service";
import { useHistory, useParams } from 'react-router-dom'
import { withRouter } from "react-router";
import axios from 'axios';
import PostButton from "./PostButton";
import './styling.css';





export class postedQuestion extends React.Component{
state = {
    thisQuestionID:"",
    questionAuthor:"",
    questions: [],
    isempty:false,
    hasanswers:true,
    answerSelected:false,
    selectedAnswerID:"",
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
        console.log("THE DATA:"+res.data.answered);

         this.setState({questions: questions,thisQuestionID: id ,answerSelected: res.data.answered , questionAuthor: res.data.author , answerSelected: res.data.answerSelected , selectedAnswerID : res.data.selectedAnswerID});
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

httpGetFunc(answerID){
                                   const user = JSON.parse(localStorage.getItem('user')); //how to get the username from login system.

                                   const http = new XMLHttpRequest();
                                    //GET
                                   http.open("POST","http://localhost:8080/api/Answers/Vote");
                                   http.setRequestHeader("Content-Type" , "application/json");
                                   const toSend = {
                                                          count: 0,
                                                          users: user.username,
                                                          answerId: answerID
                                                   }

                                   http.send(JSON.stringify(toSend));
                                   http.onreadystatechange = function() {
                                   console.log("returned get : "+this.responseText);
                                   if (this.readyState == 4 && this.status == 201) {
                                   console.log("GET RESPONSE : "+this.responseText);
                                   return this.responseText;
                                        }
                                    }
}
handleUpvote(answerID , voteObjectUsers)
{
const user = JSON.parse(localStorage.getItem('user')); //how to get the username from login system.
//WHAT TO DO WHEN UPVOTE IS PUSHED
    console.log("upvote clicked");


                             console.log("ANSWER ID: "+answerID)


                            const http = new XMLHttpRequest();
                             //POST
                             http.open("PUT","http://localhost:8080/api/Answers/Vote/");
                             http.setRequestHeader("Content-Type" , "application/json");

                            var toSend = {
                                count: 1,
                                users: user.username,
                                answerId: answerID
                                }


                             var questionID = this.state.thisQuestionID
                            console.log("STRINGIFY : "+JSON.stringify(toSend))
                            if(!voteObjectUsers.includes(user.username)){

                            http.send(JSON.stringify(toSend));

                            }
                            //http.send(JSON.stringify(toSend));

                             //http.send(JSON.stringify(questionObject));
                             http.onreadystatechange = function() {
                             console.log("returned : "+this.responseText);
                                 if (this.readyState == 4 && this.status == 200) {

                                    alert('voted!! ');
                                   // var userInfo;
                                    console.log(this.responseText);
                                    //userInfo = JSON.parse(this.responseText);
                                    window.location.href = "/Questions/"+questionID;

                                     }

                            }


}

handleDownvote(answerID , voteObjectUsers)
{
const user = JSON.parse(localStorage.getItem('user')); //how to get the username from login system.
//WHAT TO DO WHEN UPVOTE IS PUSHED
    console.log("upvote clicked");


                             console.log("ANSWER ID: "+answerID)
                            var upOrDownToggle;
                            upOrDownToggle= this.httpGetFunc(answerID);

                            const http = new XMLHttpRequest();
                             //POST
                             http.open("PUT","http://localhost:8080/api/Answers/Vote/");
                             http.setRequestHeader("Content-Type" , "application/json");

                            var toSend = {
                                count: -1,
                                users: user.username,
                                answerId: answerID
                                }


                            var questionID = this.state.thisQuestionID

                            console.log("STRINGIFY : "+JSON.stringify(toSend))


                            http.send(JSON.stringify(toSend));

                            //http.send(JSON.stringify(toSend));

                             //http.send(JSON.stringify(questionObject));
                             http.onreadystatechange = function() {
                             console.log("returned : "+this.responseText);
                                 if (this.readyState == 4 && this.status == 200) {

                                    alert('voted!! ');
                                   // var userInfo;
                                    console.log(this.responseText);
                                    //userInfo = JSON.parse(this.responseText);
                                  window.location.href = "/Questions/"+questionID;
                                     }

                            }
}
handleSelectAnswer(answerID)
{
//WHAT TO DO WHEN QUESTION POSTER SELECTS BEST ANSWER
    console.log("chose best answer clicked");

                         const http = new XMLHttpRequest();
                         http.open("POST","http://localhost:8080/api/Questions/"+this.state.thisQuestionID);
                         http.setRequestHeader("Content-Type" , "application/json");

                        const toSend = {
                            qid: this.state.thisQuestionID,
                            aid: answerID
                        }
                        var qid ;
                        qid = this.state.thisQuestionID;
                        var aid ;
                        aid = answerID;
                        http.send(aid.toString());
                        //http.send(JSON.stringify(toSend));
                        var questionID = this.state.thisQuestionID
                         //http.send(JSON.stringify(questionObject));
                         http.onreadystatechange = function() {
                         console.log(this.responseText);
                             if (this.readyState == 4 && this.status == 200) {

                                alert('Best answer chosen! ');
                               // var userInfo;
                                console.log(this.responseText);
                                //userInfo = JSON.parse(this.responseText);
                                window.location.href = "/Questions/"+questionID;
                                 }

                        }
}
selectBestAnswerButton(answerID){
return(

 <button onClick={()=>this.handleSelectAnswer(answerID)}>THIS ANSWERS MY QUESTION</button>

 )
}
upvoteButton(answerID, voteObjectUsers){

const user = JSON.parse(localStorage.getItem('user')); //how to get the username from login system.
console.log(voteObjectUsers);

if(user){ // only add upvote if we're logged in

if(voteObjectUsers.includes(user.username)){
    return(
    <button onClick={()=>this.handleDownvote(answerID,voteObjectUsers)}>DownVote</button>
    )
}
    return(
     <button onClick={()=>this.handleUpvote(answerID,voteObjectUsers)}>Upvote</button>
     )
 }

//GET THE VOTE for this answer for the specific user

}
populatingAnswers(){
const user = JSON.parse(localStorage.getItem('user')); //how to get the username from login system.
if (this.state.hasanswers==false){
       return (<h1>No answers</h1>);
       }
       console.log("WE HAVE ANSWERS");


    console.log("answer chosen already?" + this.state.answerSelected);


if(user && user.username == this.state.questionAuthor && this.state.answerSelected==false){

    return(
    //MODIFY THIS TO ADD STUFF TO ANSWER

               this.state.answers.map(answer =>

                   <div class = "answerBody" >
                          <p>{answer.response}</p>
                          <p>{answer.author}</p>
                            <div> Upvotes : {answer.voteObject.count} </div>
                            {this.selectBestAnswerButton(answer.id)}
                            {this.upvoteButton(answer.id,answer.voteObject.usersList)}
                    </div>
                )

            )

}



//MODIFY THIS TO ADD STUFF TO ANSWER
return (

            this.state.answers.map(answer => {
                if(answer.id == this.state.selectedAnswerID){

                console.log("YOOOO")

                    return( //if the answer id does not match the selected answer id
                                                            <div class = "answerBodySelectedByPoster" >
                                                                                  <p>{answer.response}</p>
                                                                                  <p>{answer.author}</p>
                                                                                    <div> Upvotes : {answer.voteObject.count} </div>
                                                                                    {this.upvoteButton(answer.id, answer.voteObject.usersList)}
                                                                            </div>
                                                   )
                }


               // answerBodySelectedByPoster
                else {
                  return( //if the answer id does not match the selected answer id
                                        <div class = "answerBody" >
                                                              <p>{answer.response}</p>
                                                              <p>{answer.author}</p>
                                                                <div> Upvotes : {answer.voteObject.count} </div>
                                                                {this.upvoteButton(answer.id,answer.voteObject.usersList)}
                                                        </div>
                            )
                  }


                       }
                    )


)


}

handleNewAnswerBox(event){
this.value={newAnswer: event , thisQuestionID: this.value.thisQuestionID };

}


handlePostNewAnswer() {

console.log(this.value.newAnswer);
console.log(this.value.thisQuestionID);


    const user = JSON.parse(localStorage.getItem('user')); //how to get the username from login system.
    if (user){
        var AnswerObject= {
                           questionId: this.state.thisQuestionID,
                           author: user.username,
                           response: this.value.newAnswer,

                           };

        }
        else{

        var AnswerObject= {
                           questionId: this.state.thisQuestionID,
                           author: 'Anonymous',
                           response: this.value.newAnswer,

                           };
        }

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
