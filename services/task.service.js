//const {faker} = require('@faker-js/faker');
const boom = require('@hapi/boom');
const TaskRepository = require('./../repositories/task.repository');

const repository = new TaskRepository();

const PENDING_STATUS = "pending";

class TaskService {

    constructor(){
    }

    async create(task){
        const newTask = {
            ...task,
            status: PENDING_STATUS,
        }

        const result = await repository.create(newTask);

        newTask._id = result.insertedId;

        return newTask;
    }

    async find(user_id){
        let result = await repository.find(user_id);
        return result;
    }

    async findOne(user_id, id){
        const task = await repository.find(user_id, id);

        if(!task){
            throw boom.notFound('Task not found');
        }

        return task;
    }

    async update(id, change){
        await repository.update(id, change)
        
        const taskChanged = {
            _id: id,
            ...change
        }

        return taskChanged;
    }

    async delete(id){
        await repository.delete(id)

        return {id};
    }
}

module.exports = TaskService;
