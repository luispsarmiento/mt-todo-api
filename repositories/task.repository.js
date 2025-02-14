const db = require('./../config/db');
const { ObjectId } = require('mongodb');

const COLLECTION_NAME = "task";

class TaskRepository {

    constructor(){}

    async find(userId, id=''){
        const find = (coll) => id == '' ? coll.find({user_id: new ObjectId(userId)}).toArray()
                                        : coll.find({_id: new ObjectId(id), user_id: new ObjectId(userId)}).toArray();

        let result = await db.execute(COLLECTION_NAME, find);

        return result;
    }

    async create(task){
        const user_id = new ObjectId(task.user_id);
        let space_id = null;
        if (task.space_id){
            space_id = new ObjectId(task.space_id);
        }
        task = {
            ...task,
            createAt: new Date(),
            updateAt: new Date(),
            user_id: user_id,
            space_id: space_id
        };

        const insertOne = (coll) => coll.insertOne(task);

        let result = await db.execute(COLLECTION_NAME, insertOne);

        return result;
    }

    async update(id, newTask){
        const filter = {
            _id: new ObjectId(id)
        };

        let focusTimer = newTask['focusTime'] || null;
        if ((newTask.completedDate != null || newTask.breakDate) && newTask.startDate != null){
            if (newTask.completedDate != null){
                focusTimer = (new Date(newTask.completedDate)) - (new Date(newTask.startDate));
            }
            if (newTask.breakDate != null){
                focusTimer = (new Date(newTask.breakDate)) - (new Date(newTask.startDate));
            }
        }

        const user_id = new ObjectId(newTask.user_id);
        const updateTask = {
            $set: {
                name: newTask.name,
                priority: newTask.priority,
                scheduledDate: new Date(newTask.scheduledDate) || null,
                status: newTask.status,
                completedDate: newTask.completedDate != null ? new Date(newTask.completedDate) : null,
                updateAt: new Date(),
                user_id: user_id,
                notes: newTask.notes,
                subTasks: newTask.subTasks || null,
                startDate: newTask.startDate != null ? new Date(newTask.startDate) : null,
                focusTimer: focusTimer,
                breakDate: newTask.breakDate != null ? new Date(newTask.breakDate) : null
            },
            $setOnInsert: { createAt: new Date() }
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

    async moveToSpace(id, newTask){
        const filter = {
            _id: new ObjectId(id)
        };

        const updateTask = {
            $set: {
                user_id: new ObjectId(newTask.user_id),
                space_id: new ObjectId(newTask.space_id)
            }
        };

        const updateOne = (coll) => coll.updateOne(filter, updateTask);

        let result = await db.execute(COLLECTION_NAME, updateOne);

        return result;
    }
}

module.exports = TaskRepository;
