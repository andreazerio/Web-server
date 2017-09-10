const fs = require('fs');
const http = require('http');
const https = require('https');
const currentPath = process.cwd();
function control_panel (request,response) {

    let incomingRequest = `${request.method} ${response.url}`

    if (incomingRequest = 'GET /') {
       let interface = fs.readFileSync(`${currentPath}/interface/home.html`);
       response.statusCode = 200;
       response.setHeader('Content-Type', 'text, html');
       response.write(interface);
       response.end();
    }

    else if( incomingRequest === 'GET /handles') {


    }

    else {
        response.write('Invalid path');
    }
}

module.exports = control_panel;
