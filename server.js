var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var hostName = 'localhost';
var port = 3004;

var app = express();

app.use(morgan('dev'));

var dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
	.all(function (req, res, next) {
		res.writeHead(200, {'Content-type': 'text/html'});
		next();
	})
	.get(function (req, res, next) {
		res.end('Retrieve all the dishes..');
	})
	.post(function (req, res, next) {
		res.end('Will add the dish : '+ req.body.name + ' with description : '+ req.body.description);
	})
	.delete(function (req, res, next) {
		res.end('Delete all the dishes');
	});

dishRouter.route('/:dishId')
	.all(function (req, res, next) {
		res.writeHead(200, {'Content-type': 'text/html'});
		next();
	})
	.get(function (req, res, next) {
		res.end('Will send details of dish id : ' + req.params.dishId);
	})
	.put(function (req, res, next) {
		res.write('Updating the dish of id : ' + req.params.dishId + '\n');
		res.end('Updating the dish with name : ' + req.body.name + ' with description : ' + req.body.description);
	})
	.delete(function (req, res, next) {
		res.end('Delete the dish of id : ' + req.params.dishId);
	});

app.use('/dishes', dishRouter);

app.use(express.static(__dirname + '/public'));

app.listen(port, hostName, function () {
	console.log(`Server is listening on http://${hostName}:${port}`);
});