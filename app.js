const http = require("http");
const { readFileSync } = require("fs");

// get all files
const homePage = readFileSync("./index.html");
const homeStyles = readFileSync("./styles.css");
const homeScript = readFileSync("./scripts/pattern-create.js");

const server = http.createServer((req, res) => {
  url = req.url;
  console.log(url);

  // Home
  if (url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write(homePage);
    res.end();
  } else if (url === "/styles.css") {
    res.writeHead(200, { "content-type": "text/css" });
    res.write(homeStyles);
    res.end();
  } else if (url === "/scripts/pattern-create.js") {
    res.writeHead(200, { "content-type": "text/javascript" });
    res.write(homeScript);
    res.end();
  }
});

server.listen(5000);
