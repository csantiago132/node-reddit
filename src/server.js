const app = require('./app');
const http = require('http');
const server = http.createServer(app);
const serverPort = 5000;

server.listen(serverPort, () => {
  console.log(`Server listening on port ${serverPort}`);
});
