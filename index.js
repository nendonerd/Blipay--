const http = require('http')
const url = require('url')
const fs = require('fs')
const port = 3000
let cookies = 'defaultCook'

let template = (userid, amount, memo) => `
<script>
  function returnApp() {
    AlipayJSBridge.call("exitApp")
  }

  function ready(a) {
    window.AlipayJSBridge ? a && a() : document.addEventListener("AlipayJSBridgeReady", a, !1)
  }
  ready(function () {
    try {
      var a = {
        actionType: "scan",
        u: "${userid}",
        a: "${amount}",
        m: "${memo}",
        biz_data: {
          s: "money",
          u: "${userid}",
          a: "${amount}",
          m: "${memo}"
        }
      }
    } catch (b) {
      returnApp()
    }
    AlipayJSBridge.call("startApp", {
      appId: "20000123",
      param: a
    }, function (a) { })
  });
  document.addEventListener("resume", function (a) {
    returnApp()
  });
</script>
`



// request example:
// alipays://platformapi/startapp?appId=20000067&url=http://${DOMAIN}/api/?22222222,100,aaa
// alipay browser do not allow & in url
// have to use ',' instead and write a custom parse func

http.createServer((req,res) => {
  let cache = new Map()
  console.log(req.url)

  /////////////////////////////
  // get/set cookies for jd api
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
  ///////////////////////////////

  if (req.url.startsWith('/api')) {
    console.log(req.url)
    let [userid ="2088521328947850", amount="1", memo="test"] = req.url.slice(6).split(",") || []
    console.log(userid, amount, memo)
    let html = template(userid, amount, memo)

    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Content-Length': html.length,
      'Expires': new Date().toUTCString()
    })
    res.end(html)

  } else {
    // serve static files
    var filePath = '.' + req.url
    let mimeType = 'text/html'
    if (filePath.endsWith('.js')) { mimeType = 'text/javascript'}
    if (filePath.endsWith('.png')) { mimeType = 'image/png'}

    if (filePath == './' || filePath.length > 20) {
      filePath = './index.html';
    }

    if (cache.has(filePath)) {
      res.writeHead(200, { 'Content-Type': mimeType })
      res.end(cache.get(filePath), 'utf-8')
    } else {
      fs.readFile(filePath, (err, content) => {
        if (err) {
          res.writeHead(404)
          res.end(`${filePath} not found`)
        } else {
          cache.set(filePath, content)
          res.writeHead(200, { 'Content-Type': mimeType })
          res.end(content, 'utf-8')
        }
      })
    }
  }

}).listen(port)


