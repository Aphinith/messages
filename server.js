var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');
var get_messages = require('./server/getMessages');

var publicPath = path.resolve(__dirname, 'public');
// We need to add a configuration to our proxy server,
// as we are now proxying outside localhost
var port = 3000;

var proxy = httpProxy.createProxyServer({
  changeOrigin: true
});
var app = express();

app.use(express.static(publicPath));
app.use('/get_messages', get_messages);

var bundle = require('./server/compiler.js')
bundle()
app.all('/build/*', function (req, res) {
  proxy.web(req, res, {
      target: 'http://localhost:8080'
  })
})

proxy.on('error', function(e) {
  console.log('Could not connect to proxy, please try again...')
});

app.listen(port, function () {
  console.log('Server running on port ' + port)
});


