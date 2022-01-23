const mongodb = require('database');

class OperationsModel {
    
    constructor() {
        this._collection = mongodb.getCollection();

    }

    /**
     * Log request Info on MongoDB
     */
    async newLog(request_info) {

        let collection = mongodb.getCollection();

        return collection.insertOne(request_info);
    }

    /**
     * Get request_info on MongoDB by request_id
     */
    async findRequest(request_id) {
        return await this._collection.findOne({ request_id: request_id });

    }
}

module.exports = function () {
    return OperationsModel;
}