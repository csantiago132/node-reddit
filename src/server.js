const app = require('./app');
const http = require('http');

const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
};

let customHost;

process.env.NODE_ENV === 'test'
  ? (customHost = process.env.PORT || '5000')
  : (customHost = process.env.PORT || '4000');

const port = normalizePort(customHost);

app.set('port', port);

const server = http.createServer(app);

server.listen(port || process.env.PORT || 4000, () => {
  console.log(`Server listening on port ${server.address().port}`);
});
