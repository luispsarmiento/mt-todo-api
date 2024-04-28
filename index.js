const express = require('express');
const app = express();
const dotenv = require('dotenv');
const db = require('./config/db');
const routerApi = require('./routes');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const xss = require('xss-clean');
const cors = require('cors');
const {errorHandler, boomErrorHandler} = require('./middleware/error');
const auth = require('./utils/auth');
const cache = require('./utils/cache');

// Load env vars
dotenv.config({ path: './config/.env' });

db.setUri(process.env.MONGO_URI);
db.setDB(process.env.MONGO_DB);
//cache.init();

auth.getApiKeys();

app.use(express.json());

// Sanitize data

// Security headers
app.use(helmet());

// To prevent XSS attacks
app.use(xss());

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes,
  max: 500,
  validate: {
    xForwardedForHeader: false
  }
});

app.use(limiter);

// Prevent http param pllution
app.use(hpp());

app.use(cors());

app.get('/', (req, res) => {
  res.send('MT To-Do will be amazing!');
})

routerApi(app);

//app.use(logError) it will to send errors to a log
app.use(boomErrorHandler);
app.use(errorHandler)

const port = process.env.PORT;
app.listen(port, () => {
  console.log('Mi port ' +  port);
});