exports.utils = {
  validateEnvFile: requiredVariables => {
    for (let envVar of requiredVariables)
      if (!process.env[envVar])
        throw new Error(`${envVar} env variable must be declared in .env file`);
  }
};
