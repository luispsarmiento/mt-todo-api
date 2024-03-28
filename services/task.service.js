const {faker} = require('@faker-js/faker');
const boom = require('@hapi/boom');
const TaskRepository = require('./../repositories/task.repository');

const repository = new TaskRepository();

class TaskService {

    constructor(){
    }

    generate(){
        const limit = 100;
        for(let i=0; i < limit; i++){
            this.task.push({
                id: faker.database.mongodbObjectId(),
                name: faker.word.verb(),
                isDone: false
            });
        }
    }

    async create(task){
        const newTask = {
            ...task
        }

        const result = await repository.create(task);

        newTask._id = result.insertedId;

        return newTask;
    }

    async find(){
        let result = await repository.find();
        return result;
    }

    async findOne(id){
        const task = await repository.find(id);

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