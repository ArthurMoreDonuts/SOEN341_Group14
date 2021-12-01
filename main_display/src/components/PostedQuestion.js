import React from "react";
import DataService from "../services/question.service";
import { useHistory, useParams } from 'react-router-dom'
import { withRouter } from "react-router";
import axios from 'axios';
import PostButton from "./PostButton";
import './styling.css';

import styled from 'styled-components';

const Container = styled.div`
padding:10px 10px;
margin-top: 10px;
`;




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
       newAnswer:"",
       newComment:""

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

handlePostNewComment(answerID,commentAuthor,commentBody)
{
    const user = JSON.parse(localStorage.getItem('user')); //how to get the username from login system.
    //WHAT TO DO WHEN UPVOTE IS PUSHED
        console.log("comment clicked");


                                console.log("ANSWER ID for comment: "+answerID)


                                const http = new XMLHttpRequest();
                                 //POST
                                 http.open("POST","http://localhost:8080/api/Answers/Comments");
                                 http.setRequestHeader("Content-Type" , "application/json");

                                var toSend = {
                                    answerId: answerID,
                                    author: commentAuthor,
                                    response: commentBody
                                    }


                                 var questionID = this.state.thisQuestionID
                                console.log("STRINGIFY : "+JSON.stringify(toSend))


                                http.send(JSON.stringify(toSend));


                                //http.send(JSON.stringify(toSend));

                                 //http.send(JSON.stringify(questionObject));
                                 http.onreadystatechange = function() {
                                 console.log("returned : "+this.responseText);
                                     if (this.readyState == 4 && this.status == 201) {

                                        alert('comment posted!! ');
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
populateComments(answerObjs)
{
console.log("POPULATING COMMENT");
console.log(answerObjs);

    if(answerObjs.commentsList!=null)
    {


        return(answerObjs.commentsList.map(commentObj => {

                           return(
                                       <div class = "answerBody" >
                                       <div class = "AuthorArea">
                                             {commentObj.author}:
                                        </div>
                                       <div class = "AnswerDescription">
                                            {commentObj.response}
                                       </div>
                                       </div>

                                   )


                        }))


   }
   else
   {
    return(<div class = "AnswerDescription"> no comments </div>)

   }

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
                      <div class = "AuthorArea">
                         {answer.author}:
                             </div>
                                    <div class = "AnswerDescription">
                                        {answer.response}
                                        </div>
                                                              
                                        <div class = "Stats">
                                        {answer.voteObject.count} Comments
                                        <p>{answer.voteObject.count} Upvotes </p>
                                        <div>
                                        {this.selectBestAnswerButton(answer.id)}
                                        {this.upvoteButton(answer.id,answer.voteObject.usersList)}
                                        </div>
                                        </div>

                            


<div class = "AnswerDescription">                                                            
<React.Fragment>
<div> 
<h6>Comment: </h6>

<form onSubmit={console.log("form")}>
    <textarea
            className="CommentBox"
             id="exampleFormControlTextarea1"
             onChange={e =>  this.handleNewCommentBox(e.target.value)}



       />

    <div class = "Stats">
    <PostButton type='button' onClick = {()=>this.handlePostNewComment(answer.id,user.username,this.value.newComment )} >
    <s1>Comment</s1>
    </PostButton>

    {this.populateComments(answer)}




    </div>


        </form>

</div>
</React.Fragment>



</div>

                    </div>

                    

                )
                
                

            )

}



//MODIFY THIS TO ADD STUFF TO ANSWER
return (

            this.state.answers.map(answer => {
                if(answer.id == this.state.selectedAnswerID){



                    return( //if the answer id does not match the selected answer id
                                                            <div class = "answerBodySelectedByPoster" >
                                                                 <div class = "AuthorArea">
                                                                        {answer.author}:
                                                                  </div>
                                                                   <div class = "AnswerDescription">
                                                                        {answer.response}
                                                                  </div>
                                                              
                                                              <div class = "Stats">
                                                                     {answer.voteObject.count} Comments
                                                                    <p>{answer.voteObject.count} Upvotes </p>
                                                              <div>
                                                                    {this.upvoteButton(answer.id,answer.voteObject.usersList)}
                                                                </div>
                                                              </div>

                                                                                    
                                        


                                                              
<div class = "AnswerDescription">                                                            
<React.Fragment>
<div> 
<h6>Comment: </h6>
<form onSubmit={console.log("form")}>
    <textarea
            className="CommentBox"
             id="exampleFormControlTextarea1"
             onChange={e =>  this.handleNewCommentBox(e.target.value)}



       />
    <div class = "Stats">
    <PostButton type='button' onClick = {()=>this.handlePostNewComment(answer.id,user.username,this.value.newComment )} >
    <s1>Comment</s1>
    </PostButton>
    </div>


        </form>
{this.populateComments(answer)}
</div>
</React.Fragment>


</div> 
</div>

 )
}


               // answerBodySelectedByPoster
                else {
                  return( //if the answer id does not match the selected answer id
                                        <div class = "answerBody" >
                                        <div class = "AuthorArea">
                                                              {answer.author}:
                                                              </div>
                                        <div class = "AnswerDescription">
                                                              {answer.response}
                                                              </div>
                                                              
                                                              <div class = "Stats">
                                                              {answer.voteObject.count} Comments
                                                              <p>{answer.voteObject.count} Upvotes </p>
                                                              <div>
                                                              {this.upvoteButton(answer.id,answer.voteObject.usersList)}
                                                                </div>
                                                              </div> 

                                                                
                                                                
                                                                
                                                                
                                                                
 
                                                              <div class = "AnswerDescription">                                                            
<React.Fragment>
<div> 
<h6>Comment: </h6>
<form onSubmit={console.log("form")}>
    <textarea
            className="CommentBox"
             id="exampleFormControlTextarea1"
             onChange={e =>  this.handleNewCommentBox(e.target.value)}



       />
    <div class = "Stats">
    <PostButton type='button' onClick = {()=>this.handlePostNewComment(answer.id,user.username,this.value.newComment )} >
    <s1>Comment</s1>
    </PostButton>
    </div>


        </form>

</div>
</React.Fragment>


 {this.populateComments(answer)}






</div>
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
handleNewCommentBox(event){
this.value={newComment: event , thisQuestionID: this.value.thisQuestionID };

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
<Container>
<h2>Question</h2>

           {this.state.questions.map(question =>
            
            <div class = "questBod">
            
           <div class = "questionTitle">
                      {question.title}
                      </div>
               <div class ="AnswerDescription">
                      {question.description}        
                </div>
                <div class = "QAuthorArea">
                      Posted by: {question.author}
                      </div>
                
            </div>

            
            )}
            




            <h4>Post a new answer: </h4>
    <React.Fragment>
<div>
<form onSubmit={console.log("form")}>
    <textarea
            className="CommentBox"
             id="exampleFormControlTextarea1"
             onChange={e =>  this.handleNewAnswerBox(e.target.value)}



       />
       <div class = "Stats">
    <PostButton type='button' onClick = {()=>this.handlePostNewAnswer()} >
    <s1>Post Answer</s1>
    </PostButton>
    </div>

        </form>

</div>
</React.Fragment>
            
            <div>
            <h2># of Answers : {this.state.answers.length} </h2>
            {this.populatingAnswers()}
            
            
            </div>

    


</Container>
</div>

          ) // END OF RETURN




    }
}
export default postedQuestion;
