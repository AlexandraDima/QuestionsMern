import React, { Component } from "react";
import { Router } from "@reach/router";
import Question from "./Question";
import Questions from "./Questions";

class App extends Component {
  //Initialize the state data of questions
  API_URL = process.env.REACT_APP_API_URL;

  constructor(props) {
    //This helps building the state
    super(props);

    //Actual data
    this.state = {
      questions: []
    };
  }

  componentDidMount() {
    this.getData();
  }

  //Using async await
  async getData() {
    let url = `${this.API_URL}/questions`; // URL of the API.
    let result = await fetch(url); // Get the data
    let json = await result.json(); // Turn it into json
    return this.setState({
      // Set it in the state
      questions: json
    });
  }

  //Function to get the question ID
  getQuestion(id) {
    //  go over all elements in 'this.state.question' and find the element
    // that matches 'e.id === Number(id)' where 'e' is one of the objects in 'this.state.questions'
    return this.state.questions.find(e => e._id === id); // And then return it
  }

  //Function to vote the answers
  async putVote(questionId, answerId) {
    let url = `${this.API_URL}/questions/`
      .concat(questionId)
      .concat("/answers/")
      .concat(answerId)
      .concat("/vote");
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log("Result of posting a new question:");
        console.log(json);
        this.getData();
      }); // Get the data
    //let json = await result.json(); // Turn it into json
    //return this.setState({
    // Set it in the state
    //questions: json
    //});
  }

  /*
  putVote(questionId, answerId) {
    const url = "http://localhost:8080/api/questions/"
      .concat(questionId)
      .concat("/answers/")
      .concat(answerId)
      .concat("/vote");
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log("Result of posting a new question:");
        console.log(json);
        this.getData();
      });
  }
  */

  handleVote(questionId, answerId) {
    //PUT
    this.putVote(questionId, answerId);
    console.log("The link was clicked.");
  }

  //Function to ask new question
  askQuestion(text) {
    // This is the question object that will be saved to the list of questions
    //miss posting new answers
    this.postData(text);
  }

  //Post method to post a new question
  postData(text) {
    let url = `${this.API_URL}/questions/`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        text: text
        //answers:[]
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log("Result of posting a new question:");
        console.log(json);
        this.getData();
      });

    // TODO: And then use getData again to update contents
  }

  //Function to post new answer
  postAnswer(questionId, text) {
    let url = `${this.API_URL}/questions/`
      .concat(questionId)
      .concat("/answers");

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        text: text
        //answers:[]
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log("Result of posting a new answer:");
        console.log(json);
        this.getData();
      });
  }

  render() {
    return (
      <React.Fragment>
        <h1>QA website</h1>

        <Router>
          {/*
            Find the question id and return the path
            GetQuestion() function has to be called from inside the Question state component
             */}
          <Question
            path="/question/:id"
            getQuestion={id => this.getQuestion(id)}
            handleVote={(questionId, answerId) =>
              this.handleVote(questionId, answerId)
            }
            postAnswer={(questionId, text) => this.postAnswer(questionId, text)}
          />
          <Questions
            path="/"
            questions={this.state.questions}
            askQuestion={text => this.askQuestion(text)}
          ></Questions>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
