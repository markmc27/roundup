const handleAxiosError = (err: any) => {
  if (err.response) {
    console.log(err.response);
  }
  throw new Error(err);
};

export default handleAxiosError;
