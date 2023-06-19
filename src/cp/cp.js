import path from 'path';
import fs from 'fs';
import { fork } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const spawnChildProcess = async (args) => {
  const pathToScript = path.resolve(__dirname, 'files', 'script.js');
  const forkProcess = fork(pathToScript, args, {
    stdio: [process.stdin, process.stdout, process.stderr, 'ipc'],
  })

  forkProcess.on('message', msg => {
    console.log(msg);
    console.log('Message from child received\n');
  })
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['someArgument1', 'someArgument2', 'someArgument3', 'someArgument4']);
