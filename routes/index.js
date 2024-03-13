const express = require('express');

const tasksRouter = require('./tasks.router');

function routerApi(app){
    const router = express.Router();
    app.use('/api', router);
  
    router.use('/tasks', tasksRouter);
}

module.exports = routerApi;
