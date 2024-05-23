const express = require("express");
const cors = require("cors");
const cookie_parser = require("cookie-parser");

const applyMiddleWare = (app) => {
  app.use(
    cors({
      origin: [
        "http://localhost:5173",
        "https://webnewswave-client.web.app",
        "https://webnewswave-client.firebaseapp.com",
      ],
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(cookie_parser());
};

module.exports = applyMiddleWare;
