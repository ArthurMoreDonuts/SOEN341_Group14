import React, { Component } from "react";
import DataService from "../services/question.service";
import { Link } from "react-router-dom";

export default class QuestionsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveQuestions = this.retrieveQuestions.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveQuestion = this.setActiveQuestion.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      questions: [],
      currentquestion: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveQuestions();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveQuestions() {
      /*
    DataService.getAllQuestions()
      .then(response => {
        this.setState({
          questions: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
      */
  }

  refreshList() {
    this.retrieveQuestions();
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });
  }

  setActiveQuestion(question, index) {
    this.setState({
      currentquestion: question,
      currentIndex: index
    });
  }



  searchTitle() {
    DataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          questions: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    const { searchTitle, questions, currentquestion, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Questions List</h4>

          <ul className="list-group">
            {questions &&
              questions.map((question, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveQuestion(question, index)}
                  key={index}
                >
                  {question.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentquestion ? (
            <div>
              <h4>Question</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentquestion.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentquestion.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentquestion.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/tutorials/" + currentquestion.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Tutorial...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}