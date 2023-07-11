export const getEnvVariables = () => {
  const variablesEnv = import.meta.env;

  return {
    ...variablesEnv,
  };
};
