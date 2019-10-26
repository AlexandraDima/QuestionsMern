import React, { Component } from "react";
import { Link } from "@reach/router";
import AskQuestion from "./AskQuestion";

class Questions extends Component {
  render() {
    //Map the questions to the question component by using props
    //Pass the question id to the link path

    let contentQuestions = <li>tom</li>;
    if (this.props.questions) {
      console.log("i am going to render again");
      contentQuestions = this.props.questions.map(question => (
        <div key={question._id} className="card bg-cards text-center p-3">
          <h3 className="card-title">
            <Link to={`/question/${question._id}`}>{question.text}</Link>
          </h3>
        </div>
      ));
    }
    return (
      <div>
        <div className="titleWebsite col-lg-8 p-4">
          <h1>Recent questions</h1>
        </div>
        <div className="card-columns">{contentQuestions}</div>
        <div className="m-5">
          <AskQuestion askQuestion={text => this.props.askQuestion(text)} />
        </div>
      </div>
    );
  }
}

export default Questions;
