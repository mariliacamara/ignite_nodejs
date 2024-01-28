import http from 'node:http';
import dotenv from 'dotenv';

dotenv.config();

const server = http.createServer((req, res) => {
  return res.end('Hello World!');
});

server.listen(process.env.APP_PORT, () => {
  console.log(`Server is listening on port ${process.env.APP_PORT}`);
});