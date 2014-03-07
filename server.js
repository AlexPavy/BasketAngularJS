var l_ip = process.env.IP || "0.0.0.0";
var l_port = process.env.PORT || 3000;

var http = require('http');
var path = require('path');
var express = require('express');
var controller = require('./controller');

var app = express();
var server = http.createServer(app);

app.use(express.static(path.resolve(__dirname, 'client')));
app.use(express.json());
app.use(express.methodOverride());
app.use(express.bodyParser());

// app.use(express.urlencoded());
// app.use(app.router);

// Main App
app.post('/addURL', controller.addVisit);
app.get('/main', controller.sendVisits);
app.delete('/remove/:site_id', controller.removeSite);
app.get('*', controller.index);

var messages = [];
var sockets = [];

server.listen(l_port, l_ip, function(){
  var addr = server.address();
  console.log("WebBasket server listening at", addr.address + ":" + addr.port);
});