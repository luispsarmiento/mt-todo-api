const db = require('./../config/db');
const { ObjectId } = require('mongodb');

const COLLECTION_NAME = "task"
const getLocaleDate = () => new Date(new Date().setHours(new Date().getHours() - 6));

class TaskRepository {

    constructor(){}

    async find(id=''){
        const find = (coll) => id == '' ? coll.find().toArray() 
                                        : coll.find({_id: new ObjectId(id)}).toArray();

        let result = await db.execute(COLLECTION_NAME, find);

        return result;
    }

    async create(task){
        task = {
            ...task,
            createAt: getLocaleDate(),
            updateAt: getLocaleDate()
        };

        const insertOne = (coll) => coll.insertOne(task);

        let result = await db.execute(COLLECTION_NAME, insertOne);

        return result;
    }

    async update(id, newTask){
        const filter = {
            _id: new ObjectId(id)
        };

        const updateTask = {
            $set: {
                name: newTask.name,
                scheduledDate: new Date(newTask.scheduledDate) || null,
                status: newTask.status,
                completedDate: newTask.completedDate != null ? new Date(newTask.completedDate) : null,
                updateAt: getLocaleDate()
            },
            $setOnInsert: { createAt: getLocaleDate() }
        };
        const options = { upsert: true };

        const updateOne = (coll) => coll.updateOne(filter, updateTask, options);

        let result = await db.execute(COLLECTION_NAME, updateOne);

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