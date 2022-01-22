
module.exports = function (application) {

	const { body, validationResult } = require('express-validator');

	application.get(
		'/sum',
		body('a', 'Numéricos apenas.').notEmpty().isNumeric(),
		body('b', 'Numérico apenas.').notEmpty().isNumeric(),
		function (req, res) {
			try {
				validationResult(req).throw();
			} catch (err) {
				return res.status(400).json({ errors: err.array() });
			}
			  
			var OperationsModel = new application.app.models.OperationsModel(req);

			OperationsModel.sum(function (result) {
				res.send(result);
			});
		});

	application.get(
		'/div',
		body('a', 'Numéricos apenas.').notEmpty().isNumeric(),
		body('b', 'Numéricos apenas.').notEmpty().isNumeric(),
		function (req, res) {
			try {
				validationResult(req).throw();
			} catch (err) {
				return res.status(400).json({ errors: err.array() });
			}

			var OperationsModel = new application.app.models.OperationsModel();

			OperationsModel.div(req, function (result) {
				res.send(result);
			});
		});

	application.get(
		'/sub',
		body('a', 'Numéricos apenas.').notEmpty().isNumeric(),
		body('b', 'Numéricos apenas.').notEmpty().isNumeric(),
		function (req, res) {
			try {
				validationResult(req).throw();
			} catch (err) {
				return res.status(400).json({ errors: err.array() });
			}

			var OperationsModel = new application.app.models.OperationsModel();

			OperationsModel.sub(req, function (result) {
				res.send(result);
			});
		});
}; 