import React, { Component } from "react";

class AskQuestion extends Component {
  constructor(props) {
    super(props); // This line is calling the constructor in the super class.

    this.state = {
      // When initializing the state in the constructor, we just create it as an object.
      input: "" // input is initialized to the empty string.
    };
  }

  ///Method used for the input
  onChange(event) {
    // We can only change state using this.setState() and replace the current state with something new.
    this.setState({
      input: event.target.value // Set the value in this.state to the current value of the input DOM element
      // The above event.target.value is vanilla JavaScript to get value from event DOM target
    });
  }

  //Method to make the button working
  onClick(event) {
    event.preventDefault();
    this.props.askQuestion(this.state.input); // Add the question to the state of questions in App.js
    // this.props.askQuestion is actually the arrow function in App.js (from the render method)
  }

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <form>
            <div className="form-group">
              <label htmlFor="questionObject">New question</label>
              <input
                onChange={event => this.onChange(event)}
                type="text"
                placeholder="Ask a new question"
              />
              <button onClick={event => this.onClick(event)}>
                Ask question
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AskQuestion;
