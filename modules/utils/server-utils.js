const zlib = require('zlib')
const normalizeCSSUrl = 'https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css'

module.exports = {
  writeError(msg, res) {
    res.writeHead(500, { 'Content-Type': 'text/html' })
    res.write('ERROR!')
    res.end()
  },

  redirect(location, res) {
    res.writeHead(303, { 'Location': location })
    res.end()
  },

  writeNotFound(res) {
    res.writeHead(404, { 'Content-Type': 'text/html' })
    res.write('Not Found')
    res.end()
  },

  write(string, type, res) {
    zlib.gzip(string, (err, result) => {
      res.writeHead(200, {
        'Content-Length': result.length,
        'Content-Type': type,
        'Content-Encoding': 'gzip',
      })
      res.write(result)
      res.end()
    })
  },

  createPage(html, state, styles) {
    const devServer = DEVELOPMENT ? '<script src="http://localhost:8080/webpack-dev-server.js"></script>' : ''
    return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8"/>
    <title>My Universal App!</title>
    <link rel="stylesheet" href="${normalizeCSSUrl}">
    <style type="text/css" id="fast-css">${styles}</style>
  </head>
  <body>
    <div id="app">${html}</div>
    <script>APP_STATE=${JSON.stringify(state)}</script>
    <script src="/assets/vendor.js"></script>
    <script src="/assets/react.js"></script>
    <script src="/assets/app.js"></script>
    ${devServer}
  </body>
</html>
`
  },
}
