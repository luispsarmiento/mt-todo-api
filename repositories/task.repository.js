const db = require('./../config/db');

const COLLECTION_NAME = "task"

class TaskRepository {

    constructor(){}

    async find(){
        const query = (coll) => {
            return coll.find().toArray();
        };

        let result = await db.execute(COLLECTION_NAME, query);

        return result;
    }
}

module.exports = TaskRepository;