const crypto = require("crypto");

module.exports = function (application) {

	const { body, validationResult } = require('express-validator');
	const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
		return `Parâmetro [${param}]: ${msg}`;
	};

	/**
	 * Route Soma
	 */
	application.get('/sum',
		body('a', 'Numéricos apenas.').notEmpty().isNumeric(),
		body('b', 'Numérico apenas.').notEmpty().isNumeric(),
		function (req, res) {

			request_info = initRequestInfo(req);

			const result = validationResult(req).formatWith(errorFormatter); /*	Form validation	*/

			if (!result.isEmpty())
				return json_response(res, req, 400, request_info, result.array());

			var a = parseFloat(req.body.a);
			var b = parseFloat(req.body.b);
			request_info.value = a + b;

			if (isNaN(request_info.value))
				return json_response(res, req, 400, request_info, 'Resultado não é numérico!');

			return json_response(res, req, 200, request_info);
		});

	/**
	 * Route Subtração
	 */
	application.get('/subtract',
		body('a', 'Numéricos apenas.').notEmpty().isNumeric(),
		body('b', 'Numérico apenas.').notEmpty().isNumeric(),
		function (req, res) {
			request_info = initRequestInfo(req);

			const result = validationResult(req).formatWith(errorFormatter); /*	Form validation	*/

			if (!result.isEmpty())
				return json_response(res, req, 200, request_info, result.array());

			var a = parseFloat(req.body.a);
			var b = parseFloat(req.body.b);
			request_info.value = a - b;

			if (isNaN(request_info.value))
				return json_response(res, req, 200, request_info, 'Resultado não é numérico!');

			return json_response(res, req, 200, request_info);
		});

	/**
	 * Route Divisão
	 */
	application.get('/division',
		body('a', 'Numéricos apenas.').notEmpty().isNumeric(),
		body('b', 'Numérico apenas e diferente de 0.').notEmpty().isNumeric(),
		function (req, res) {

			request_info = initRequestInfo(req);

			const result = validationResult(req).formatWith(errorFormatter); /*	Form validation	*/

			if (!result.isEmpty() || req.body.b == "0") {
				error = !result.isEmpty() ? result.array() : 'Parâmetro [b]: Numérico apenas e diferente de 0.';
				return json_response(res, req, 200, request_info, error);
			}

			var a = parseFloat(req.body.a);
			var b = parseFloat(req.body.b);
			request_info.value = a / b;

			if (isNaN(request_info.value))
				return json_response(res, req, 200, request_info, 'Resultado não é numérico!');

			return json_response(res, req, 200, request_info);
		});

	/**
	 * Route Multiplicação
	 */
	application.get('/multiplication',
		body('a', 'Numéricos apenas.').notEmpty().isNumeric(),
		body('b', 'Numérico apenas.').notEmpty().isNumeric(),
		function (req, res) {

			request_info = initRequestInfo(req);

			const result = validationResult(req).formatWith(errorFormatter); /*	Form validation	*/

			if (!result.isEmpty())
				return json_response(res, req, 200, request_info, result.array());

			var a = parseFloat(req.body.a);
			var b = parseFloat(req.body.b);
			request_info.value = a * b;

			if (isNaN(request_info.value))
				return json_response(res, req, 200, request_info, 'Resultado não é numérico!');

			return json_response(res, req, 200, request_info);
		});

	/**
	 * Validation
	 */
	application.get('/validation',
		body('request_id', 'Request_id não pode ser vazio').notEmpty(),
		function (req, res) {

			request_info = initRequestInfo(req);

			const result = validationResult(req).formatWith(errorFormatter); /*	Form validation	*/

			if (!result.isEmpty())
				return json_response(res, req, 200, request_info, result.array());

			request_info.execution_time = Number(process.hrtime.bigint(request_info.execution_time));

			var logModel = new application.app.models.LogModel();

			logModel.findRequest(req.body.request_id).then(
				result => {
					error = (result != null) ? [] : ['Não encontramos nenhum pedido para o request_id solicitado'];
					request_info.value = (result === null) ? '' : result.operation;
					return json_response(res, req, 200, request_info, error);
				},
				errors => { return json_response(res, req, 400, request_info, errors); }
			);
		});

	/**
	 * Envia as respostas da API para o cliente
	 * 
	 * @param {*} res reponse OBJ 
	 * @param {*} status 
	 * @param {*} request_info
	 * @param {*} errors 
	 * @returns 
	 */
	function json_response(res, req, status, request_info, errors = []) {

		var reply = {
			result: request_info.value,
			errors: errors,
		};

		res.append('request_id', request_info.request_id);
		res.status(status).json(reply);

		request_info.status = status;
		saveLog(req, request_info);
	}


	/**
	 * Grava a informação do pedido na bd Mongo
	 * @param {*} req request 
	 * @param {*} request_info request_info 
	 */
	function saveLog(req, request_info) {

		request_info.execution_time = Number(process.hrtime.bigint(request_info.execution_time));

		var logModel = new application.app.models.LogModel();

		logModel.newLog(request_info).then(
			ok => { return console.log('inserted doc: ' + ok.insertedId) },
			errors => { return console.log('ERROR: ' + errors.message) }
		);
	}

	/**
	 * Retorna a operacao para este request
	 * @param {*} url 
	 * @returns 
	 */
	function getOperation(url) {
		return url.substr(1);
	}

	/**
	 * Inicializa o objeto com a info do request
	 * @param {*} req 
	 * @returns 
	 */
	function initRequestInfo(req) {
		return {
			request_id: crypto.randomUUID(),//identificador unico
			status: 200, //default status
			operation: getOperation(req.url),
			client_ip: req.ip,
			execution_time: process.hrtime.bigint(),
			value: null
		};
	}

}; 