import http from 'node:http';
import dotenv from 'dotenv';

dotenv.config();

const users = [];

const server = http.createServer(async (req, res) => {
  const { url, method } = req;

  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch (error) {
    req.body = null;
  }

  if (method === 'GET' && url === '/users') {
    return res
      .setHeader('Content-Type', 'application/json')
      .writeHead(200)
      .end(JSON.stringify(users));
  }

  if (method === 'POST' && url === '/users') {
    if (!req.body) return res.writeHead(400).end('Missing body with email and name.')

    const { name, email } = req.body;

    users.push({
      id: 1,
      name,
      email,
    });
    return res.writeHead(201).end();
  }

  return res.writeHead(404).end();
});

server.listen(process.env.APP_PORT, () => {
  console.log(`Server is listening on port ${process.env.APP_PORT}`);
});