const tasksRouter = require('./tasks.router');

function routerApi(app){
    app.use('/tasks', tasksRouter);
}

module.exports = routerApi;