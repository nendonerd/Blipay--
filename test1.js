const http = require("http")
let cookies = 'hiiii'

http.createServer((req, res) => {
  // console.log("incoming request")
  if (req.url.startsWith('/cookies/set')) {
    let body = []
    req.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      cookies = body
      console.log("Setting cookies to:")
      console.log(cookies)
      console.log("")
    });
    res.end()
  }
  if (req.url.startsWith('/cookies/get')) {
    console.log("Returning cookies as:")
    console.log(cookies)
    console.log("")
    res.end(cookies)
  }

}).listen(3003)