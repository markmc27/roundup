import SavingsGoalRepository from './SavingsGoalRepository';
import TestSavingsGoalClient from './TestSavingsGoalClient';

describe('SavingsGoalRepository', () => {
  it('should return all savings goals', async () => {
    const savingsGoalRepository = new SavingsGoalRepository(
      new TestSavingsGoalClient()
    );

    const savingsGoals = await savingsGoalRepository.retrieveSavingsGoals(
      'test-account-id'
    );

    expect(savingsGoals.length).toBe(2);
  });

  it('should return populated savings goal', async () => {
    const savingsGoalRepository = new SavingsGoalRepository(
      new TestSavingsGoalClient()
    );

    const savingsGoals = await savingsGoalRepository.retrieveSavingsGoals(
      'test-account-id'
    );

    expect(savingsGoals[0].name).toBe('Test Savings Goal');
    expect(savingsGoals[0].totalSaved.minorUnits).toBe(123);
    expect(savingsGoals[0].totalSaved.currency).toBe('GBP');
  });
});
