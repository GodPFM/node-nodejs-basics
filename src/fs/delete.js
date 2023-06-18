import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const remove = async (fileToDelete, folder) => {
  const destFolder = path.resolve(__dirname, folder);
  fs.readdir(destFolder, { withFileTypes: true }, (err, files) => {
    if (err) {
      throw new Error(err)
    }
    const fileToDeleteArr = files.filter((item) => {
      if (item.name === fileToDelete) {
        if (item.isDirectory()) {
          throw new Error('Not a file')
        }
        return item.name
      }
    })
    if (fileToDeleteArr.length === 0) {
      throw new Error('FS operation failed')
    }
    fs.rm(path.resolve(destFolder, fileToDelete), (err) => {
      if (err) {
        throw new Error(err)
      }
    })
  })
};

await remove('fileToRemove.txt', 'files');
