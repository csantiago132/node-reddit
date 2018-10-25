const app = require('./app');
const http = require('http');

const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
};

const port = normalizePort(process.env.PORT || '5000');

app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server listening on port ${server.address().port}`);
});
