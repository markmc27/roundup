// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import SavingsGoalRepositoryFactory from '../../lib/savings-goal/SavingsGoalsRepositoryFactory';

const handler = async (req: NextApiRequest, res: NextApiResponse<boolean>) => {
  if (req.method !== 'PUT') {
    res.status(405).end();
    return;
  }

  const requestData = req.body;

  if (requestData === undefined || requestData.savingGoalId === undefined) {
    res.status(400).end();
    return;
  }

  const savingsGoalsRepo =
    new SavingsGoalRepositoryFactory().getSavingsGoalRepo();

  const { savingGoalId, roundUpAmountMinorUnits, currency } = requestData;

  const transferResult = await savingsGoalsRepo.transferToSavingsGoals(
    process.env.ACCOUNT_ID as string,
    savingGoalId,
    roundUpAmountMinorUnits,
    currency
  );

  res.status(200).json(transferResult);
};

export default handler;
