class OperationsModel {
    constructor() {
    }

    sum(req, callback) {
        var a = parseInt(req.body.a);
        var b = parseInt(req.body.b);
        var v = (a + b).toString();

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