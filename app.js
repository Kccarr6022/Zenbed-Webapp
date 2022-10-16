const http = require("http");
const { readFileSync } = require("fs");

// get all files
const homePage = readFileSync("./index.html");

const server = http.createServer((req, res) => {
  url = req.url;
  console.log(url);

  // /
  if (url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write(homePage);
    res.end();

    // about
  } else if (url === "/about") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write("<h1>About Page</h1>");
    res.write('<a href="/">Home</a>');
    res.end();

    // 404
  } else {
    res.writeHead(200, { "content-type": "text/html" });
    res.write("<h1>Error 404</h1>");
    res.write('<a href="/">Home</a><br>');
    res.write('<a href="/about">About</a>');
    res.end();
  }
});

server.listen(5000);
