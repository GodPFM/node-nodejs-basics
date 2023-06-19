const args = process.argv.slice(2);

console.log(`Total number of arguments is ${args.length}`);
console.log(`Arguments: ${JSON.stringify(args)}`);
console.log('Type message you want to send to child. If you want quit - type "CLOSE" or press ctrl + c')

const echoInput = (chunk) => {
    const chunkStringified = chunk.toString();
    if (chunkStringified.includes('CLOSE')) {
      console.log('Process killed')
      process.exit(0);
    }
    process.send(`Message received, sending message from child to master: ${chunkStringified}\n`);
    process.stdout.write(`Received from master process: ${chunkStringified}\n`)
};

process.stdin.on('data', echoInput);
