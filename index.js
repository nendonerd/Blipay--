const http = require('http')
const url = require('url')
const fs = require('fs')
const port = 3000

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
// alipays://platformapi/startapp?appId=20000067&url=http://${DOMAIN}/api/?userid=222&amount=222&memo=222

http.createServer((req,res) => {
  let cache = new Map()
  console.log(req.url)

  if (req.url.startsWith('/api')) {
    console.log(req.url)
    const params = url.parse(req.url.slice(4), true)
    console.log(params)
    let {userid ="2088521328947850", amount="100", memo="test"} = params.query || {}
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

    if (filePath == './') {
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


