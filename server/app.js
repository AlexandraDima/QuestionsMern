//External libraries
const express = require("express");
const bodyParser = require("body-parser"); //useful to take data in from the request and send that data to a database
const cors = require("cors");
const morgan = require("morgan"); // Log out all http requests to the console

//Configuration
const appName = "Express API Template";
const app = express(); // Get the express app.
const hostname = "localhost";
const port = process.env.PORT || 8080; // Pick either port 8080 or the port in the PORT env variable.

//Using the depencies
//server.use(bodyParser.json()); // Parse JSON from the request body

app.use(bodyParser.json());
app.use(cors()); // Enable Cross Origin Resource Sharing across all routes. Basically open up your API to everyone.
app.use(morgan("combined"));
app.use(express.static("../client/build")); // Only needed when running build in production mode

//Routes
//Read questions
app.get("/api/questions", (request, response) => {
  db.getQuestions().then(question => response.json(question));
});

//Read question id
app.get("/api/questions/:questionId", (request, response) => {
  const questionId = request.params.questionId;
  db.getQuestion(questionId).then(question => response.json(question));
});

///Create question
app.post("/api/questions", (request, response) => {
  let question = {
    text: request.body.text,
    answers: []
  };
  db.postQuestion(question).then(newQuestion => response.json(newQuestion));
});

///Post a new answer for a specific question id
app.post("/api/questions/:questionId/answers", (request, response) => {
  // To add answers, we need the id of the question, and some answers text from the request body.
  db.postAnswer(request.params.questionId, request.body) // request.body is an answer object
    .then(updatedQuestion => response.json(updatedQuestion));
});

/*Update AnswerId
app.put('/api/questions/:questionId/answers/:answerId', (request, response) => {
    //Path parameter
    const question = questions.find(question => question.id === parseInt(request.params.questionId));
    const answer = question.answers.find(answer => answer.id === Number(request.params.answerId));
  
    answer.text = request.body.text;
  
    response.json({ msg: "Answer updated", answer});
    
});
*/

//Update Vote
app.put(
  "/api/questions/:questionId/answers/:answerId/vote",
  (request, response) => {
    //Path parameter

    db.putVote(request.params.questionId, request.params.answerId) // request.body is an answer object
      .then(updatedVote => response.json(updatedVote));
  }
);

/**** Start! ****/
let db = {}; //Empty DB object

// Require and connect the DB
require("./db")
  .connectDb()
  .then(async dbObject => {
    db = dbObject; // Save a copy of the db object for the routes above.
    await db.randomQuestions(); // Fill in test data if needed.

    // When DB connection is ready, let's open the API for access
    app.listen(port, hostname, () => {
      console.log(`${appName} API running on port ${port}!`);
    });
  })
  .catch(error => console.error(error));
