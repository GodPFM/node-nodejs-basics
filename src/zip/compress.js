import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import zlib from 'zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathToFolder = path.resolve(__dirname, 'files');
const pathToFile = path.resolve(pathToFolder, 'fileToCompress.txt');

const compress = async (pathToFile, folder) => {
    const createArchive = zlib.createGzip();

    const extension = path.extname(pathToFile);
    const fileName = path.basename(pathToFile, extension);

    const readStream = fs.createReadStream(pathToFile);
    const writeStream = fs.createWriteStream(path.resolve(folder, `${fileName}.gz`));

    readStream.pipe(createArchive).pipe(writeStream);
};

await compress(pathToFile, pathToFolder);
