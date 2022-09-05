const roundUpToNearest100 = (amount: number) => {
  if (amount % 100 === 0) {
    return 0;
  }

  return 100 - (amount % 100);
};

export default roundUpToNearest100;
