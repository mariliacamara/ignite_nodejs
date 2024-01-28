// process.stdin
//   .pipe(process.stdout)

import { Readable, Writable, Transform } from 'node:stream';

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        this.push(`${i}\n`);
      }
    }, 1000);
  }
}

class InverseNumberStreams extends Transform {
  _transform(chunk, encoding, callback) {
    const number = Number(chunk.toString());
    const result = number * -1;
    callback(null, Buffer.from(String(result)));
  }
}

class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    const number = Number(chunk.toString());
    const result = number * 10;

    console.log(result);

    callback();
  }
}

new OneToHundredStream()
  .pipe(new InverseNumberStreams())
  .pipe(new MultiplyByTenStream());