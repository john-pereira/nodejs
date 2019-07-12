var net = require('net');

/*Array para armazenar as conexões para realizar um broadcast das mensagens*/
var connections = [];
/*Fazendo um broadcast de cada mensagem com um laço usando forEach()*/
var broadcast = function (message, origin) {
	/*pega uma connection e faz um forEach para cada uma delas*/
	connections.forEach(function (connection) {
		/*Comparando se a mensagem é da mesma origem*/
		if (connection == origin) return;
		connection.write(message);
	});
};

net.createServer(function (connection) {
	/*Adicionando as novas conexões ao final do array com um push */
	connections.push(connection);
	connection.write('Olá, eu sou o servidor!');
	connection.on('data', function (message) {
		var command = message.toString();
		/*Verifica se tem /nickname na posição 0 com indexOf*/
		if (command.indexOf('/nickname') === 0) {
			var nickname = command.replace('/nickname ', '');
			broadcast(connection.nickname + ' mudou o nome para ' + nickname);
			connection.nickname = nickname;
			return;
		}	
		broadcast(connection.nickname + ' > ' + message, connection);
	});
	connection.on('end', function () {
		broadcast(connection.nickname + ' saiu!', connection);
		/*Removendo as conexões do array com splice()*/
		connections.splice(connections.indexOf(connection), 1);
	});
}).listen(3000);