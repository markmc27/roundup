import roundUpToNearest100 from './roundUpToNearest100';

describe('roundUpToNearest100', () => {
  test.each([
    [100, 0],
    [200, 0],
    [201, 99],
    [150, 50],
    [1500, 0],
    [1005, 95],
  ])(
    'given %p should return amount needed to round up to nearest pound',
    (amount: number, expected) => {
      const roundAmount = roundUpToNearest100(amount);

      expect(roundAmount).toBe(expected);
    }
  );
});
