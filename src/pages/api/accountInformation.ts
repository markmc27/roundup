// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import AccountRepositoryFactory from '../../lib/account/AccountRepositoryFactory';
import AccountWithBalance from '../../lib/entities/AccountWithBalance';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<AccountWithBalance>
) => {
  const accountRepo = new AccountRepositoryFactory().getAccountRepo();
  const accountInfo = await accountRepo.retrieveAccountWithBalance(
    process.env.ACCOUNT_ID as string
  );

  res.status(200).json(accountInfo);
};

export default handler;
