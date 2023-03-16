const logger = require("./logger");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { response } = require("../app");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const errorHandler = (error, request, response, next) => {
  console.log(error);
  if (error.name === "ValidationError") {
    return response.status(400).end();
  } else if (error.name === "CastError") {
    return response.status(404).end();
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).end();
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "token expired" });
  }
  next(error);
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    const token = authorization.replace("Bearer ", "");
    request.token = token;
  }
  next();
};

const userExtractor = async (request, resposne, next) => {
  if (request.method !== "GET") {
    const token = request.token;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" });
    }
    const user = await User.findById(decodedToken.id);
    request.user = user;
  }
  next();
};

module.exports = {
  requestLogger,
  errorHandler,
  unknownEndpoint,
  tokenExtractor,
  userExtractor,
};
