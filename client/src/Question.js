import React, { Component } from "react";
import { Link } from "@reach/router";
import PostAnswer from "./PostAnswer";

class Question extends Component {
  constructor(props) {
    super(props);
    this.handleVote = this.handleVote.bind(this);
  }

  handleVote(event) {
    let answerId = event.currentTarget.dataset.id;
    //console.log(answerId);
    this.props.handleVote(this.props.id, answerId);
  }

  render() {
    let title = " ";
    let listAnswers = "";
    const question = this.props.getQuestion(this.props.id);
    if (question) {
      title = question.text;
      if (question.answers) {
        listAnswers = question.answers.map((answer, id) => (
          <div key={answer._id} id={answer._id}>
            <div>Votes: {answer.votes}</div>
            <div>{answer.text}</div>
            <button
              onClick={() => this.props.handleVote(this.props.id, answer._id)}
            >
              Vote up
            </button>
          </div>
        ));
      }
    }
    return (
      <React.Fragment>
        <h1>Question is:</h1>
        <h2>{title}</h2>

        <div>
          <h3>Answers</h3>
          <div>
            {listAnswers.length === 0 ? <p>No Answers!</p> : listAnswers}
          </div>
          <div>
            <PostAnswer
              qid={this.props.id}
              postAnswer={(questionId, text) =>
                this.props.postAnswer(questionId, text)
              }
            />
          </div>
        </div>

        <Link to="/">Go back</Link>
      </React.Fragment>
    );
  }
}

export default Question;
