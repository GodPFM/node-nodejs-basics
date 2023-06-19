import { Transform } from 'node:stream';

const transform = async () => {
    const reverseData = new Transform({
      transform(chunk, encoding, callback) {
        callback(null, chunk.toString().split('').reverse().join('') + '\n')
      }
    })
  process.stdin.pipe(reverseData).pipe(process.stdout);
};

await transform();
