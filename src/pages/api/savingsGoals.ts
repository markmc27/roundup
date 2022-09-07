// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import SavingsGoal from '../../lib/entities/SavingsGoal';
import SavingsGoalRepositoryFactory from '../../lib/savings-goal/SavingsGoalsRepositoryFactory';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<SavingsGoal[]>
) => {
  const savingsGoalsRepo =
    new SavingsGoalRepositoryFactory().getSavingsGoalRepo();

  const savingsGoals = await savingsGoalsRepo.retrieveSavingsGoals(
    process.env.ACCOUNT_ID as string
  );

  res.status(200).json(savingsGoals);
};

export default handler;
