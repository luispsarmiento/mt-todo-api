const db = require('./../config/db');
const { ObjectId } = require('mongodb');

const COLLECTION_NAME = "task"

class TaskRepository {

    constructor(){}

    async find(id=''){
        const find = (coll) => id == '' ? coll.find().toArray() 
                                        : coll.find({_id: new ObjectId(id)}).toArray();

        let result = await db.execute(COLLECTION_NAME, find);

        return result;
    }

    async create(task){
        const insertOne = (coll) => coll.insertOne(task);

        let result = await db.execute(COLLECTION_NAME, insertOne);

        return result;
    }

    async update(id, newTask){
        const replaceOne = (coll) => coll.replaceOne({
            _id: new ObjectId(id)
        }, newTask);

        let result = await db.execute(COLLECTION_NAME, replaceOne);

        return result;
    }

    async delete(id){
        const deleteOne = (coll) => coll.deleteOne({
            _id: new ObjectId(id)
        });

        let result = await db.execute(COLLECTION_NAME, deleteOne);

        return result;
    }
}

module.exports = TaskRepository;