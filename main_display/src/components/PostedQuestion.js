import React from "react";
import DataService from "../services/question.service";
import { useHistory, useParams } from 'react-router-dom'
import { withRouter } from "react-router";
import axios from 'axios';
import './styling.css';

export class postedQuestion extends React.Component{
state = {
    questions: []
}

componentDidMount() {
  const id = this.props.match.params.id;
    axios.get('http://localhost:8080/api/Questions/'+id)
      .then(res => {
        const questions = [];
        questions.push( res.data);
         this.setState({questions });
        console.log(this.state.questions);
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
export default postedQuestion;
