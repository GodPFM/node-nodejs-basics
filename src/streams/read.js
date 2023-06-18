import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async (pathToFile) => {
  const readStream = fs.createReadStream(pathToFile);
  readStream.pipe(process.stdout);
};

await read(path.resolve(__dirname, "files", "fileToRead.txt"));
