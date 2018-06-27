const http = require('http');
const fs = require('fs');
const url = require('url');
const mime = require('mime');

let servers = (request, response) => {
    let urlObj = url.parse(request.url, true);
    let pathname = urlObj.pathname.slice(1);
    fs.readFile(pathname, (err, data) => {
        if (err) {
            response.writeHead(404, { "Content-Type": "charset=utf-8" });
            response.write();
        } else {
            response.writeHead(200, { 'Content-Type': `${mime.getType(pathname)};charset=utff-8` });
            response.write(data);
        }
        response.end();
    })
}

let server = http.createServer(servers).listen(8080, 'localhost');