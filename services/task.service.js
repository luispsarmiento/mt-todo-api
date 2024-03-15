const {faker} = require('@faker-js/faker');

class TaskService {

    constructor(){
        this.task = [];
        this.generate();
    }

    generate(){
        const limit = 100;
        for(let i=0; i < limit; i++){
            this.task.push({
                id: faker.datatype.uuid(),
                name: faker.word.verb(),
                isDone: false
            });
        }
    }

    async create(task){
        const newTask = {
            id: faker.datatype.uuid(),
            ...task
        }
        this.task.push(newTask);

        return newTask;
    }

    async find(){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.task)
            }, 2000)
        });
    }

    async findOne(id){
        return this.task.find(i => i.id == id);
    }

    async update(id, change){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const i = this.task.findIndex(i => i.id == id);
                
                if(i === -1){
                    throw new Error('Task not found');
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
            throw new Error('Task not found');
        }

        this.task.splice(i, 1);

        return {id};
    }
}

module.exports = TaskService;