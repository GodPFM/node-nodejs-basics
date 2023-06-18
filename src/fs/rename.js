import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const rename = async (fileToRename, newName, folder) => {
  const folderPath = path.resolve(__dirname, folder);
  fs.readdir(folderPath, {withFileTypes: true}, (err, files) => {
    if (err) {
      throw new Error(err.message)
    }
    const filteredFilesByName = files.map((item) => {
      if (item.name === fileToRename || item.name === newName) {
        return item.name;
      }
    })
    if (filteredFilesByName.includes(newName) || !filteredFilesByName.includes(fileToRename)) {
      throw new Error('FS operation failed')
    }
    fs.rename(path.resolve(folderPath, fileToRename), path.resolve(folderPath, newName), (err) => {
      if (err) {
        throw new Error(err.message)
      }
    })
  });
};

await rename('wrongFilename.txt', 'properFilename.md', 'files');
