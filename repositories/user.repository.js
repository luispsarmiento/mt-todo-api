const db = require('./../config/db');
const { ObjectId } = require('mongodb');

const COLLECTION_NAME = "user"
const getLocaleDate = () => new Date(new Date().setHours(new Date().getHours() - 6));

class UserRepository {

    constructor(){}

    async find(id=''){
        const find = (coll) => id == '' ? coll.find().toArray() 
                                        : coll.find({_id: new ObjectId(id)}).toArray();

        let result = await db.execute(COLLECTION_NAME, find);

        return result;
    }
}

module.exports = UserRepository;