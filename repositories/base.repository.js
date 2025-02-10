const { ObjectId } = require('mongodb');
const db = require('../config/db');

class BaseRepository{

    constructor(collectionName){
        this.collectionName = collectionName;
    }

    async find(userId, id=''){
        const find = (coll) => id == '' ? coll.find({user_id: new ObjectId(userId)}).toArray()
                                        : coll.find({_id: new ObjectId(id), user_id: new ObjectId(userId)}).toArray();

        let result = await db.execute(this.collectionName, find);

        return result;
    }

    async create(document){
        const user_id = new ObjectId(document.user_id);
        document = {
            ...document,
            createAt: new Date(),
            updateAt: new Date(),
            user_id: user_id
        };

        const insertOne = (coll) => coll.insertOne(document);

        let result = await db.execute(this.collectionName, insertOne);

        return result;
    }

    async delete(id){
        const deleteOne = (coll) => coll.deleteOne({
            _id: new ObjectId(id)
        });

        let result = await db.execute(this.collectionName, deleteOne);

        return result;
    }
}

module.exports = BaseRepository;