import http from 'node:http';
import { Transform } from 'node:stream';

class InverseNumberStreams extends Transform {
  _transform(chunk, encoding, callback) {
    const number = Number(chunk.toString());
    const transformed = number * -1;

    console.log(transformed);

    callback(null, Buffer.from(String(transformed)));
  }
}

const server = http.createServer(async (req, res) => {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const fullStreamContent = Buffer.concat(buffers).toString();

  console.log(fullStreamContent);

  return res.end(fullStreamContent);

  // req
  //   .pipe(new InverseNumberStreams())
  //   .pipe(res);
});

server.listen(3334, () => {
  console.log('Server is listening on port 3334');
});