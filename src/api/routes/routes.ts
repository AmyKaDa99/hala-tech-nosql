import express from "express";

import auth from "./auth"

import position from './position'

import player from './player'

import match from './match'

const isAuth = require('../../middlewares/user-is-auth')

console.log(isAuth)

const app = express();

app.use('/auth', auth);

app.use(isAuth)

app.use('/position', position);

app.use('/player', player);

app.use('/match', match);

app.use((req, res, next) => {
    res
      .status(404)
      .send("<h1> you must not get this routes, trying to see different </h1>");
  });

export default app;
