const parseEnv = () => {
    const envs = Object.entries(process.env);
    const filteredEnvs = envs.filter((item) => item[0].startsWith('RSS_'));
    let result = '';
    filteredEnvs.forEach((item, index) => {
      result += `${item[0]}=${item[1]}`;
      if (index !== filteredEnvs.length - 1) {
        result += '; ';
      } 
    })
    process.stdout.write(result);
};

parseEnv();