import React, { Component } from "react";
import DataService from "../services/question.service";

export default class AddQuestion extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.saveQuestion = this.saveQuestion.bind(this);
    this.newQuestion = this.newQuestion.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "", 
      author: "",
      published: false,

      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }
  onChangeAuthor(e) {
    this.setState({
      author: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  saveQuestion() {
    var question = {
      title: this.state.title,
      description: this.state.description,
      author: this.state.author
    };

    DataService.createQuestion(question)
      .then(response => {
        this.setState({
          id: response.question.id,
          title: response.question.title,
          description: response.question.description,
          published: response.question.published,

          submitted: true
        });
        console.log(response.question);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newQuestion() {
    this.setState({
      id: null,
      title: "",
      description: "",
      author: "",
      published: false,

      submitted: false
    });
  }

  
  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newQuestion}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                className="form-control"
                id="author"
                required
                value={this.state.author}
                onChange={this.onChangeAuthor}
                name="author"
              />
            </div>

            <button onClick={this.saveQuestion} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }

}
