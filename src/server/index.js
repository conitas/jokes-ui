const useProxy = require('./env/environment').useProxy;

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const publicweb = require('./hero.service').publicweb;

const app = express();

// enable proxy for joke service
if(useProxy) {
const proxy = require('http-proxy-middleware');
const apiProxy = proxy('/jokes', {target: 'http://localhost:8080/'});
  app.use(apiProxy);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(publicweb));
console.log(`serving ${publicweb}`);

app.use('/api', routes);

app.get('*', (req, res) => {
  res.sendFile(`index.html`, { root: publicweb });
});

const port = process.env.PORT || '3000';
app.listen(port, () => console.log(`API running on localhost:${port}`));


process.on('SIGINT', function() {
  console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
  // some other closing procedures go here
   process.exit(1);
});
