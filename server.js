const control_panel = require('./index.js');
const http = require('http');

const server = http.createServer( function (request, response){
    control_panel(request,response);
});

server.listen(3000);
console.info('Server listening on port 3000');