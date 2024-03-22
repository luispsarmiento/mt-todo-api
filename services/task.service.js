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
            id: faker.database.mongodbObjectId(),
            ...task
        }
        this.task.push(newTask);

        return newTask;
    }

    async find(){
        let result = await repository.find();
        return result;
    }

    async findOne(id){
        const task = this.task.find(i => i.id == id);

        if(!task){
            throw boom.notFound('Task not found');
        }

        return task;
    }

    async update(id, change){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const i = this.task.findIndex(i => i.id == id);
                
                if(i === -1){
                    throw boom.notFound('Task not found');
                }

                const task = this.task[i];

                this.task[i] = {
                    ...task,
                    ...change
                }

                resolve(this.task[i])
            }, 1000)
        });
        
    }

    async delete(id){
        const i = this.task.findIndex(i => i.id == id);
        if(i === -1){
            throw boom.notFound('Task not found');
        }

        this.task.splice(i, 1);

        return {id};
    }
}

module.exports = TaskService;