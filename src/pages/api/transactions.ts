// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { DateTime } from 'luxon';
import type { NextApiRequest, NextApiResponse } from 'next';
import Transaction from '../../lib/entities/Transaction';
import TransactionsRepositoryFactory from '../../lib/transactions/TransactionsRepositoryFactory';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Transaction[]>
) => {
  const transactionsRepo =
    new TransactionsRepositoryFactory().getTransactionsRepo();

  const startDate = req.query.startDate as string;
  const endDate = req.query.endDate as string;

  if (!startDate || !endDate) {
    res.status(400).end();
    return;
  }

  const transactions = await transactionsRepo.retrieveTransactionsBetween(
    process.env.ACCOUNT_ID as string,
    DateTime.fromFormat(startDate, 'yyyy-MM-dd').toJSDate().toISOString(),
    DateTime.fromFormat(endDate, 'yyyy-MM-dd').toJSDate().toISOString()
  );

  res.status(200).json(transactions);
};

export default handler;
