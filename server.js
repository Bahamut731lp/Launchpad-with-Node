var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var fs = require('fs');
var bodyParser = require("body-parser");

let domain = 'localhost';
let port = '3000';
let bindPath = 'StaticFiles/binds.json';

app.use(express.static('StaticFiles'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var data = fs.readFileSync(bindPath);
var binds = JSON.parse(data);
console.log("JSON was loaded");

app.post("/submitData", function (request, response){
	var data = request.body;
	binds.binds[data.id] = {
		"id": data.id,
		"color": data.color,
		"effect": data.effect,
		"hasGradient": data.hasGradient,
		"sample": data.sample,
		"key": Number(data.key)
	}
	//Converting back to JSON
	let writedata = JSON.stringify(binds, null, 2);
	//Writing our data to JSON file
	fs.writeFile(bindPath, writedata, written);
	function written(){
		console.log(`Data has been written to ${bindPath}`);
	}
});
app.get("/help", function (request, response){
	response.sendFile("StaticFiles/help.html", { root : __dirname});
})

app.listen(port, function(){
  console.log(`listening on port ${port}`);
});
