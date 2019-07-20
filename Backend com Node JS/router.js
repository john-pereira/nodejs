var http = require('http');

/*Função que recebe a porta onde irá abrir o roteamento*/
var createRouter = function (port) {
	/*Registrando as rotas*/
	var api = {};
	var routes = {};
	var methods = ['GET', 'POST', 'OPTIONS'];
	var interceptors = [];

	methods.forEach(function (method) {
		routes[method] = {};
		api[method.toLowerCase()] = function (path, fn) {
			routes[method][path] = fn;
		};
	});
 
	api.interceptor = function (interceptor){
		interceptors.push(interceptor);
	};

	var executeInterceptors = function (number, req, res) {
		var interceptor = interceptors[number];
		if (!interceptor) return;
		interceptor(req, res, function () {
			executeInterceptors(++number, req, res);
		});
	};

	var handleBody = function (req, res, next) {
		var body = [];
		req.on('data', function (chunk) {
			console.log(chunk);
			body.push(chunk);
		});
		req.on('end', function (){
			req.body = Buffer.concat(body).toString();
			next();
		});
	};

	http.createServer(function (req, res) {
		handleBody(req, res, function () {
			executeInterceptors(0, req, res);
			if (!routes[req.method][req.url]) {
				res.statusCode = 404;
				return res.end();
			}
			routes[req.method][req.url](req, res);		
			});
	}).listen(port);

	return api;
};

/*Passando a função para um modulo e depois exporta-la*/
module.exports = createRouter;