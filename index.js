var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);

app.get('/', function (request, response) {
    response.send("Hello World");
});

app.get('/file', function (request, response) {
    response.sendFile(__dirname + '/index.html');
})

app.get('/image', function (request, response) {
    response.sendFile(__dirname + '/img.jpg');
})

io.on('connection', function(data){
   console.log('A connection was made');
   
   data.on('name', function (name) {
       console.log(name);
       io.emit('from-server',name);
   })
    
    data.on('disconnect', function () {
        console.log("disconnected someone");
        io.emit('from-server', 'Server is disconnected');
    })
});



