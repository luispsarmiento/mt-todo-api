const db = require('./../config/db');
const { ObjectId } = require('mongodb');
const BaseRepository = require('./base.repository');

const COLLECTION_NAME = "space";

class SpaceRepository extends BaseRepository {

    constructor(){
        super(COLLECTION_NAME);
    }

    async update(id, newSpace){
        const filter = {
            _id: new ObjectId(id)
        };

        const user_id = new ObjectId(newSpace.user_id);

        const updateTask = {
            $set: {
                name: newSpace.name,
                description: newSpace.description,
                user_id: user_id
            },
            $setOnInsert: { createAt: new Date() }
        };

        const options = { upsert: true };

        const updateOne = (coll) => coll.updateOne(filter, updateTask, options);

        let result = await db.execute(this.collectionName, updateOne);

        return result;
    }
}

module.exports = SpaceRepository;
