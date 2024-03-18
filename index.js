const express = require('express');
const app = express();
const port = 3000;
const routerApi = require('./routes');
const {errorHandler, boomErrorHandler} = require('./middleware/error');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('MT To-Do will be amazing!');
})

routerApi(app);

//app.use(logError) it will to send errors to a log
app.use(boomErrorHandler);
app.use(errorHandler)

app.listen(port, () => {
  console.log('Mi port' +  port);
});
