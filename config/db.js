const { MongoClient } = require("mongodb");
const boom = require('@hapi/boom');

// Reference about this https://www.mongodb.com/docs/drivers/node/current/quick-start/connect-to-mongodb/
// Replace the uri string with your connection string.
//const uri = "<connection string uri>";
const uri = process.env.MONGO_URI;

//const client = new MongoClient(uri);

let _db;

const connectDB = callback => {
    if(_db){
        return callback(null, _db);
    }

    MongoClient.connect(uri, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        .then(client => {
            _db = client.db();
            callback(null, _db);
        })
        .catch(err => {
            callback(err);
        })
};

const getDB = () => {
    if(!_db){
        throw boom.internal("Cannot establish a connection with the database.")
    }

    return _db;
};

module.exports = { connectDB, getDB };

/*async function run() {
  try {
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');

    // Query for a movie that has the title 'Back to the Future'
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);

    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);*/