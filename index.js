const express = require('express');
const app = express();
const port = 3000;
const routerApi = require('./routes');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('MT To-Do will be amazing!');
})

routerApi(app);

app.listen(port, () => {
  console.log('Mi port' +  port);
});
