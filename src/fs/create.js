import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathToFolder = path.resolve(__dirname, 'files')
const pathToFile = path.resolve(pathToFolder, 'fresh.txt')

const create = async () => {
  fs.writeFile(pathToFile, 'I am fresh and young',{ flag: 'wx' } ,(err) => {
    if (err) {
      throw 'FS operation failed'
    }
  })
};

await create();
