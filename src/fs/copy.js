import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathDir = path.resolve(__dirname, 'files');
const pathDest = path.resolve(__dirname, 'files-copy');

const copy = async () => {
  fs.readdir(pathDir, async (err) => {
    if (err) {
      throw new Error('FS operation failed');
    }
    fs.mkdir(pathDest, (err) => {
      if (err) {
        throw new Error('FS operation failed');
      }
      copyFiles(pathDir, pathDest)
    })
  })
};

const copyFiles = async (pathDirection, pathDestination) => {
  fs.readdir(pathDirection, {withFileTypes: true}, (err, files) => {
    for (let file of files) {
      const fileName = file.name;
      if (file.isFile()) {
        fs.copyFile(path.resolve(pathDirection, fileName), path.resolve(pathDestination, fileName), (err) => {
          if (err) {
            throw new Error(err);
          }
        })
      } else {
        fs.mkdir(path.resolve(pathDestination, fileName), {recursive: true}, (err) => {
          if (err) {
            throw new Error(err);
          }
        })
        copyFiles(path.resolve(pathDirection, fileName), path.resolve(pathDestination, fileName));
      }
    }
  })
}

await copy();
