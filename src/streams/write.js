import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const write = async (pathToFile) => {
    const writeStream = fs.createWriteStream(pathToFile);
    process.stdin.pipe(writeStream);
};

await write(path.resolve(__dirname, 'files', 'fileToWRite.txt'));