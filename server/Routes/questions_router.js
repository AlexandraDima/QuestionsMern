module.exports = dbObject => {
  const express = require("express");
  const router = express.Router();

  //Read questions
  router.get("/", (request, response) => {
    dbObject.getQuestions().then(question => response.json(question));
  });

  //Read question id
  router.get("/:questionId", (request, response) => {
    const questionId = request.params.questionId;
    dbObject.getQuestion(questionId).then(question => response.json(question));
  });

  ///Create question
  router.post("/", (request, response) => {
    let question = {
      text: request.body.text,
      answers: []
    };
    dbObject
      .postQuestion(question)
      .then(newQuestion => response.json(newQuestion));
  });

  ///Post a new answer for a specific question id
  router.post("/:questionId/answers", (request, response) => {
    // To add answers, we need the id of the question, and some answers text from the request body.

    dbObject
      .postAnswer(request.params.questionId, request.body) // request.body is an answer object
      .then(updatedQuestion => response.json(updatedQuestion));
  });

  //Update Vote
  router.put("/:questionId/answers/:answerId/vote", (request, response) => {
    //Path parameter

    dbObject
      .putVote(request.params.questionId, request.params.answerId) // request.body is an answer object
      .then(updatedVote => response.json(updatedVote));
  });

  return router; // Really important to return the router back when this module is required.
};
