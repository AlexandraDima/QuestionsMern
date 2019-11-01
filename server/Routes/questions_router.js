const { connectDb } = require("../Models/db");
const express = require("express");
const router = express.Router();

//Read questions
router.get("/api/questions", (request, response) => {
  connectDb.getQuestions().then(question => response.json(question));
});

//Read question id
router.get("/api/questions/:questionId", (request, response) => {
  const questionId = request.params.questionId;
  connectDb.getQuestion(questionId).then(question => response.json(question));
});

///Create question
router.post("/api/questions", (request, response) => {
  let question = {
    text: request.body.text,
    answers: []
  };
  connectDb
    .postQuestion(question)
    .then(newQuestion => response.json(newQuestion));
});

///Post a new answer for a specific question id
router.post("/api/questions/:questionId/answers", (request, response) => {
  // To add answers, we need the id of the question, and some answers text from the request body.
  connectDb
    .postAnswer(request.params.questionId, request.body) // request.body is an answer object
    .then(updatedQuestion => response.json(updatedQuestion));
});

//Update Vote
router.put(
  "/api/questions/:questionId/answers/:answerId/vote",
  (request, response) => {
    //Path parameter

    connectDb
      .putVote(request.params.questionId, request.params.answerId) // request.body is an answer object
      .then(updatedVote => response.json(updatedVote));
  }
);

module.exports = router;
