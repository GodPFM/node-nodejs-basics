import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async (fileToRead, folder) => {
  const pathToFolder = path.resolve(__dirname, folder);
  fs.readdir(pathToFolder, {withFileTypes: true}, (err, files) => {
    if (err) {
      throw new Error('Can\'t find directory. Check your path');
    }
    const foundFiles = files.forEach((file) => {
      if (file.name === fileToRead) {
        if (file.isFile()) {
          fs.readFile(path.resolve(pathToFolder, file.name), { encoding: 'utf8' }, (err, data) => {
            if (err) {
              throw new Error(err);
            }
            process.stdout.write(data)
          })
          return file.name;
        } else {
          throw new Error;
        }
      }
    })
    if (!foundFiles) {
      throw new Error('FS operation failed');
    }
  })
};

await read('fileToRead.txt', 'files');