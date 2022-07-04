const http = require ('http');
const fs = require('fs');
const { isAbsolute } = require('path');

const server = http.createServer( (req, res) => {
  console.log("request made");
  console.log(req.url);
  console.log(req.method);

  let path = './views/';
  switch (req.url) {
      case '/':
        path += "index.html"
        break;
      case '/about':
        path += "about.html"
        break;
      default:
        path += "404.html"
        break;
  }

  res.setHeader('Content-Type', 'text/html');
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err)
      res.end()
    }
    // res.write(data);
    // res.end();
    res.statusCode = path.includes("404.html") ?  404 : 200;
    res.end(data);
  })
})

server.listen(2000, 'localhost', (x) => {
  console.log('Server listening on 2000');
})