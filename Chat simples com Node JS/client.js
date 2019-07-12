var net = require('net');

 var client = net.connect(3000);
 client.on('connect', function(){
 	client.write('Ola, eu sou o cliente!');	
 });
client.on('data', function (message) {
		console.log(message.toString()); 
});
/*Tratando o fechamento do server com process.exit()*/
client.on('end', function () {
	process.exit();
});
process.stdin.on('readable', function () {
	var message = process.stdin.read();
	if (!message) return;
	message = message.toString().replace(/\n/, '');
	client.write(message);
});

 /* Passando um host como objeto para conectar a nodes diferentes da rede */
//net.connect({host: '127.0.0.1', port:3000});

