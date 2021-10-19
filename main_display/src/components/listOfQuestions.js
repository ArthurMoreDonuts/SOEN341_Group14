import React from "react";
import DataService from "../services/question.service";
import axios from 'axios';
import './styling.css';

export class listOfQuestions extends React.Component{
state = {
    questions: []
}

  componentDidMount() {
    axios.get('http://localhost:8080/api/Questions')
      .then(res => {
        const questions = res.data;
        this.setState({ questions });
      })
  }

render()
    {
     return (

    <ul>

           {this.state.questions.map(question =>

           <div class = "questionTitle">
                      <h1>{question.title}</h1>
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
