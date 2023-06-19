import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const calculateHash = async (pathToFile) => {
    fs.readFile(pathToFile, (err, data) => {
      if (err) {
        throw new Error(err);
      }
      const hash = crypto.createHash('sha256').digest('hex');
      process.stdout.write(`Cash of file ${path.basename(pathToFile)} - ${hash}`)
    })
};

await calculateHash(path.resolve(__dirname, 'files', 'fileToCalculateHashFor.txt'));