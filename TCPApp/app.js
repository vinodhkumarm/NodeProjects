/*jshint esversion:6*/
const tcp = require('net');
var client = new tcp.Socket();

const server = tcp.createServer((socket) => {
    console.log('3. Client Connected');
    setTimeout(() => {
        socket.write('Server Ready');
        socket.pipe(socket);
    }, 4000);

});

server.listen(105, '127.0.0.1', () => {
    console.log('1. listening at port 104');
});



client.connect(105, '127.0.0.1', () => {
    console.log('2. client connecting to server');
    setTimeout(() => {
        client.write('\n5. connected to server');
    }, 1800);
});


client.on('data', (data) => {
    console.log('4. Client Recieved data - ' + data);
});