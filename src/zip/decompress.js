import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import zlib from 'zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathToFolder = path.resolve(__dirname, 'files');
const pathToGzip = path.resolve(pathToFolder, 'fileToCompress.gz')

const decompress = async (fileToDecompress, folder) => {
  const readStream = fs.createReadStream(fileToDecompress);
  const writeStream = fs.createWriteStream(path.resolve(folder, 'decompressedFile.txt'));
  readStream.pipe(zlib.createGunzip()).pipe( writeStream);
};

await decompress(pathToGzip, pathToFolder);
