import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const list = async (folder) => {
  const pathToFolder = path.resolve(__dirname, folder);
  fs.readdir(pathToFolder, {withFileTypes: true}, (err, files) => {
    if (err) {
      throw new Error('FS operation failed')
    }
    if (files.length === 0) {
      throw new Error('There\'s no files')
    }
    for (const file of files) {
      if (file.isFile()) {
        process.stdout.write(`Find file - ${file.name}\n`)
      }
    }
  })
};

await list('files');