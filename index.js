const fs = require('fs');
const http = require('http');
const https = require('https');
const currentPath = process.cwd();
const showHandles = require('./dataPopulate/showHandles.js')
function control_panel (request,response) {

   // let incomingRequest = `${request.method} ${response.url}`

    if (request.method === 'GET' && request.url === '/') {
       let interface = fs.readFileSync(`${currentPath}/interface/home.html`);
       response.statusCode = 200;
       response.setHeader('Content-Type', 'text, html');
       response.write(interface);
       response.end();
    }

    else if(request.method === 'GET' && request.url === '/handles') {
        let template = fs.readFileSync(`${currentPath}/interface/handles.html`,'utf8');
        let list = fs.readFileSync(`${currentPath}/data/handles_name.json`,'utf8');
        let interface = showHandles(template,list);
        response.setHeader('Content-Type', 'text, html');
        response.write(interface);
        response.end();
    }

    else {
        response.write('Invalid path');
    }
}

module.exports = control_panel;
