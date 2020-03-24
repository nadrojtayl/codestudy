var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('public'));
var cors = require('cors')
app.use(cors());

app.get("/",function(req,res){
	res.sendFile(__dirname + "/index.html");
})

io.on('connection', function(socket){
   socket.on('function', function(msg){
    socket.broadcast.emit("function",msg);
   });

   socket.on('render', function(msg){
    socket.broadcast.emit("render",msg);
   });

});

http.listen(process.env.PORT || 5000, function(){
  console.log('listening on *:3000');
});