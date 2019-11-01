//External libraries
const express = require("express");
const bodyParser = require("body-parser"); //useful to take data in from the request and send that data to a database
const cors = require("cors");
const morgan = require("morgan"); // Log out all http requests to the console
const checkJwt = require("express-jwt"); // Check for access tokens automatically
const bcrypt = require("bcryptjs"); // Used for hashing passwords!

//Configuration
const appName = "Express API Template";
const app = express(); // Get the express app.
const port = process.env.PORT || 8080; // Pick either port 8080 or the port in the PORT env variable.

//Using the depencies
//server.use(bodyParser.json()); // Parse JSON from the request body
app.use(bodyParser.json());
app.use(cors()); // Enable Cross Origin Resource Sharing across all routes. Basically open up your API to everyone.
app.use(morgan("combined"));
app.use(express.static("../client/build")); // Only needed when running build in production mode

/***************************Users middlewares ***********************************************/
// Open paths that do not need login. Any route not included here is protected!
let openPaths = [{ url: "/api/users/authenticate", methods: ["POST"] }];

// Validate the user using authentication. checkJwt checks for auth token.
const secret = "question is useful";
app.use(checkJwt({ secret: secret }).unless({ path: openPaths }));

// This middleware checks the result of checkJwt
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    // If the user didn't authorize correctly
    res.status(401).json({ error: err.message }); // Return 401 with error message.
  } else {
    next(); // If no errors, send request to next middleware or route handler
  }
});

/*************************** Users **********************************************************/
// It is recommended that you store users in MongoDB using Mongoose instead of this.
const users = [
  // These are just some test users with passwords.
  // The passwords are in clear text for testing purposes. (don't do this in production)
  { id: 0, username: "ale", password: "123" },
  { id: 1, username: "john", password: "qwert" },
  { id: 2, username: "maria", password: "password" }
];

// Creating more test data: We run through all users and add a hash of their password to each.
// Again, this is only for testing. In practice, you should hash only when adding new users.
users.forEach(user => {
  bcrypt.hash(user.password, 10, function(err, hash) {
    user.hash = hash; // The hash has been made, and is stored on the user object.
    delete user.password; // The clear text password is no longer needed
    console.log(`Hash generated for ${user.username}`, user); // For testing purposes
  });
});

/**********************Questions********************************************************/
/*
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

//Update Vote
app.put(
  "/api/questions/:questionId/answers/:answerId/vote",
  (request, response) => {
    //Path parameter

    db.putVote(request.params.questionId, request.params.answerId) // request.body is an answer object
      .then(updatedVote => response.json(updatedVote));
  }
);
*/
/**** Start! ****/
let db = {}; //Empty DB object
//let db = require("./Models/db");

/****************Routes */
let usersRouter = require("./Routes/users_router")(users, secret);
app.use("/api/users", usersRouter);

let questionsRouter = require("./Routes/questions_router");
app.use("/api/questions", questionsRouter);

// Require and connect the questions
require("./Models/db")
  .connectDb()
  .then(async dbObject => {
    db = dbObject; // Save a copy of the db object for the routes above.
    await db.randomQuestions(); // Fill in test data if needed.

    // When DB connection is ready, let's open the API for access
    app.listen(port, () => {
      console.log(`${appName} API running on port ${port}!`);
    });
  })
  .catch(error => console.error(error));
