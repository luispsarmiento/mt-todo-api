const boom = require('@hapi/boom');

class BaseService {

    constructor(repository){
        this.repository = repository;
    }

    async create(document){
        const result = await this.repository.create(document);

        document._id = result.insertedId;

        return document;
    }

    async find(user_id){
        let result = await this.repository.find(user_id);
        return result;
    }

    async findOne(user_id, id){
        const document = await this.repository.find(user_id, id);

        if(!document){
            throw boom.notFound('Document not found');
        }

        return document;
    }

    async update(id, newDocument){
        await this.repository.update(id, newDocument)
        
        const _newDocument = {
            _id: id,
            ...newDocument
        }

        return _newDocument;
    }

    async delete(id){
        await this.repository.delete(id)

        return {id};
    }
}

module.exports = BaseService;
