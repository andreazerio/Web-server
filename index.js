const fs = require('fs');
const http = require('http');
const https = require('https');
const currentPath = process.cwd();
const showHandles = require('./dataPopulate/showHandles.js')
const templatingUser = require('./dataPopulate/templatingUser.js');
let templatingTweets = require('./dataPopulate/templatingTweets.js');

function control_panel (request,response) {

    if (request.method === 'GET' && request.url === '/') {
       let interface = fs.readFileSync(`${currentPath}/interface/home.html`);
       response.statusCode = 200;
       response.setHeader('Content-Type', 'text/html');
       response.write(interface);
       response.end();
    }

    else if(request.method === 'GET' && request.url === '/handles') {
        let template = fs.readFileSync(`${currentPath}/interface/handles.html`,'utf8');
        let list = fs.readFileSync(`${currentPath}/data/handles_name.json`,'utf8');
        let interface = showHandles(template,list);
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/html');
        response.write(interface);
        response.end();
    }

    else if (request.method === 'GET' && /\/users\//.test(request.url)) {
        let user = request.url.split('/');
        let userName = JSON.parse(fs.readFileSync(`${currentPath}/data/users/${user[2]}.json`, 'utf8'));
        let template = fs.readFileSync(`${currentPath}/interface/users.html`,'utf-8');
        let interface = templatingUser(template,userName);
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/html')
        response.write(interface);
        response.end();
    }

    else if (request.method === 'GET' && /\/tweets\//.test(request.url)) {
        let tweet = request.url.split('/');
        let data = JSON.parse(fs.readFileSync(`${currentPath}/data/tweets/${tweet[2]}.json`, 'utf8'));
        let template = fs.readFileSync(`${currentPath}/interface/tweets.html`,'utf-8');
        let interface = templatingTweets(template,data);
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/html')
        response.write(interface);
        response.end();
    }

    else {
        response.write('Invalid path');
    }
}

module.exports = control_panel;
