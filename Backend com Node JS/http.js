var router = require('./router');

var app = router(3412);

var veiculos = [
		{
			placa: "MPQ-1622",
		 	ano: new Date(),
		 	chassi: "52293448763",
		 	dataCadastro: "01/01/2019",
		 	modelo: "Engesa 4.0 Diesel",
		 	preco: 22000
		 },
		{
			placa: "MYX-1042",
			ano: new Date(),
			chassi: "88570140289",
			dataCadastro: "20/07/2019",
			modelo: "Buggy  1.6 8V 58cv",
			preco: 22000
		}
];

var empresas = [
		{
			razaoSocial: "Sorveteria Arco Iris",
		 	cnpj: "29.166.295/0001-52",
		  	inscricaoEstadual: "52293448763",
		   	dataAbertura: "20/07/2019",
		    estado: "MG",
 			cidade: "Ipatinga",
	      	telefone: "3822-5015"
		},
		{
			razaoSocial: "JD Contabilidade",
		 	cnpj: "31.771.465/0001-70",
		  	inscricaoEstadual: "88570140289",
		   	dataAbertura: "20/07/2019",
		    estado: "MG",
	     	cidade: "Ipatinga",
	      	telefone: "3822-5015"
		}
];  

 var funcionarios = [
 		{
 			nome: "John",
 			cpf: "109.069.256-06", 
 			dataNascimento: "20/07/1990", 
 			login: "jon", 
 			senha: "123456"
 		},
 		{
 			nome: "Ana", 
 			cpf: "696.555.522-22", 
 			dataNascimento: "21/01/1999", 
 			login: "ana", 
 			senha: "123345555"
 		},
 		{
 			nome: "Carlos", 
 			cpf: "788.888.576-66", 
 			dataNascimento: "11/08/1985", 
 			login: "car", 
 			senha: "sdasd"
 		},
 		{
 			nome: "Bruna", 
 			cpf: "112.212.346-99", 
 			dataNascimento: "22/11/1979", 
 			login: "brun", 
 			senha: "123qwewq456"
 		}		
 ];

app.interceptor(function (req, res, next){
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

app.interceptor(function (req, res, next){
	res.setHeader('Content-Type', 'application/json;charset=UTF-8');
	next();
});



/*  Veiculos */
app.get('/veiculos', function (req, res){
	res.write(JSON.stringify(veiculos));
	res.end();
});

app.post('/veiculos', function (req, res){
	var veiculo = req.body;
	veiculos.push(JSON.parse(veiculo)); 
 	res.end();
});

app.options('/veiculos', function (req, res) {
	res.end();
});



/* Empresas */
app.get('/empresas', function (req, res){
	res.write(JSON.stringify(empresas));
	res.end();
});

app.post('/empresas', function (req, res){
	var empresa = req.body;
	empresas.push(JSON.parse(empresa)); 
 	res.end();
});

app.options('/empresas', function (req, res) {
	res.end();
});


/*  Funcionarios */
app.get('/funcionarios', function (req, res){
	res.write(JSON.stringify(funcionarios));
	res.end();
});
app.post('/funcionarios', function (req, res){
	var funcionario = req.body;
	funcionarios.push(JSON.parse(funcionario)); 
 	res.end();
});

app.options('/funcionarios', function (req, res) {
	res.end();

});



