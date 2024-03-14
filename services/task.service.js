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

    create(task){
        const newTask = {
            id: faker.datatype.uuid(),
            ...task
        }
        this.task.push(newTask);

        return newTask;
    }

    find(){
        return this.task;
    }

    findOne(id){
        return this.task.find(i => i.id == id);
    }

    update(id, change){
        const i = this.task.findIndex(i => i.id == id);
        if(i === -1){
            throw new Error('Task not found');
        }

        const task = this.task[i];
        this.task[i] = {
            ...task,
            ...change
        }
        
        return this.task[i];
    }

    delete(id){
        const i = this.task.findIndex(i => i.id == id);
        if(i === -1){
            throw new Error('Task not found');
        }

        this.task.splice(i, 1);

        return {id};
    }
}

module.exports = TaskService;