import React from "react";
import DataService from "../services/question.service";
import axios from 'axios';
import './styling.css';

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

    <ul>

           {this.state.questions.map(question =>

           <div class = "questionTitle">
                     <a href={"/Questions/"+question.id}> <h1>{question.title}</h1> </a>
               <div className="questionBody">


                      <p>{question.description}</p>
                      <p>{question.author}</p>

                </div>
            </div>

            )}
    </ul>
          )




    }
}
export default listOfQuestions;
