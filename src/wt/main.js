import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import { Worker, workerData, parentPort } from 'node:worker_threads'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const performCalculations = async () => {
  const cpuNumbers = os.cpus();
  const workerPath = path.resolve(__dirname, 'worker.js');
  const results = (await Promise.allSettled(cpuNumbers.map((elem, index) => {
    return new Promise((resolve) => {
      const worker = new Worker(workerPath, {
        workerData: 10 + index
      });
      worker.on('message', msg => {
        resolve({status: 'resolved', data: msg})
      })
      worker.on('error', msg => {
        resolve({status: 'error', data: msg});
      })
      worker.on('exit', msg => {
        resolve({status: 'exit', data: msg});
      })
    })
  }))).map(item => item.value);
  process.stdout.write(JSON.stringify(results));
  // results.forEach((item, index) => {
  //   process.stdout.write(`Worker №${index + 1} end task with status \'${item.value.status}\' and result is ${item.value.data}\n`)
  // })
};

await performCalculations();