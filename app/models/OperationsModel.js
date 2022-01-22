const mongodb = require('database');

class OperationsModel {
    constructor(req) {
        this._req = req;
    }

    recLog(req) {
        let collection = mongodb.getCollection();
        let client = mongodb.getClient();

        try {
            const requestData = {
                a: this._req.body.a,
                b: this._req.body.b,
            }
            
            const result = await collection.insertOne(requestData);
            console.log(`A document was inserted with the _id: ${result.insertedId}`);
        } catch(err) {
            console.log(err);
        }
    }

    sum(callback) {
        var a = parseInt(this._req.body.a);
        var b = parseInt(this._req.body.b);
        var v = (a + b).toString();
        this.recLog();
        callback(v);
    }

    div(req, callback) {
        var a = parseInt(req.body.a);
        var b = parseInt(req.body.b);
        var v = (a / b).toString();

        callback(v);
    }

    sub(req, callback) {
        var a = parseInt(req.body.a);
        var b = parseInt(req.body.b);
        var v = (a - b).toString();

        callback(v);
    }
}

module.exports = function () {
    return OperationsModel;
}