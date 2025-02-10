const SpaceRepository = require('./../repositories/space.repository');
const BaseService = require('./base.service');

const repository = new SpaceRepository();

class SpaceService extends BaseService{
    constructor(){
        super(repository);
    }
}

module.exports = SpaceService;