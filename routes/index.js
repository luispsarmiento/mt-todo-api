const express = require('express');

const tasksRouter = require('./tasks.router');
const authRouter = require('./auth.router');

function routerApi(app){
    const router = express.Router();
    app.use('/api', router);
  
    router.use('/auth', authRouter);
    router.use('/tasks', tasksRouter);
}

module.exports = routerApi;
