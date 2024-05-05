const boom = require('@hapi/boom');
const UserRepository = require('./../repositories/user.repository');

const repository = new UserRepository();

class UserService {

    constructor(){
    }

    async findOne(id){
        const task = await repository.find(id);

        if(!task){
            throw boom.notFound('User not found');
        }

        return task;
    }

    
}

module.exports = UserService;
