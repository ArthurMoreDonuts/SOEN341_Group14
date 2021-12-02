import React, { Component } from "react";
import DataService from "../services/question.service";

export default class Question extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onChangeCreated = this.onChangeCreated.bind(this);
    this.getQuestion = this.getQuestion.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);

    this.state = {
      currentQuestion: {
        id: null,
        title: "",
        description: "",
        author: "",
        created: null,
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getQuestion(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentQuestion: {
          ...prevState.currentQuestion,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentQuestion: {
        ...prevState.currentQuestion,
        description: description
      }
    }));
  }

  onChangeAuthor(e) {
    const author = e.target.value;
    
    this.setState(prevState => ({
      currentQuestion: {
        ...prevState.currentQuestion,
        author: author
      }
    }));
  }

  onChangeCreated(e) {
    const created = e.target.value;
    
    this.setState(prevState => ({
      currentQuestion: {
        ...prevState.currentQuestion,
        created: created
      }
    }));
  }

  getQuestion(id) {
    DataService.get(id)
      .then(response => {
        this.setState({
          currentQuestion: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentQuestion.id,
      title: this.state.currentQuestion.title,
      description: this.state.currentQuestion.description,
      author: this.state.currentQuestion.author,
      created: this.state.currentQuestion.created,
      published: status
    };

  }

  

  deleteQuestion() {    
    DataService.delete(this.state.currentQuestion.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/Questions')
      })
      .catch(e => {
        console.log(e);
      });
  }
}