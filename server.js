const express = require('express')
const serveStatic = require('serve-static')
const path = require('path');
const config = require('config');
const app = express();

app.set('views', [
  path.join(__dirname, 'example/'),
]);
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);
app.get('/', (req, res) => {
  res.render('index', config);
});
app.get('/*.html', (req, res) => {
  const templateName = req.url.substring(1, req.url.indexOf('.html'));
  res.render(templateName, config);
});
app.use(serveStatic(__dirname + '/public'));
app.listen(3000);
