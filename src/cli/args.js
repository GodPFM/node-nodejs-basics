const parseArgs = () => {
  const args = process.argv;
  let result = '';
  args.forEach((item, index) => {
    if (item.startsWith('--')) {
      if (args[index + 1] !== undefined && args[index + 1] !== null) {
        if (result) {
          result += ', '
        }
        result += `${item.replace('--', '')} is ${args[index + 1]}`;
      }
    }
  });
  process.stdout.write(result)
};

parseArgs();