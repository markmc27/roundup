import { DateTime } from 'luxon';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import RoundUpContainer from '../components/round-up-form/RoundUpContainer';
import AccountRepositoryFactory from '../lib/account/AccountRepositoryFactory';
import AccountWithBalance from '../lib/entities/AccountWithBalance';
import SavingsGoal from '../lib/entities/SavingsGoal';
import Transaction from '../lib/entities/Transaction';
import SavingsGoalRepositoryFactory from '../lib/savings-goal/SavingsGoalsRepositoryFactory';
import TransactionsRepositoryFactory from '../lib/transactions/TransactionsRepositoryFactory';
import styles from '../styles/Home.module.css';

type PageProps = {
  account: AccountWithBalance;
  transactions: Transaction[];
  defaultStartDate: string;
  defaultEndDate: string;
  savingsGoals: SavingsGoal[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const accountRepo = new AccountRepositoryFactory().getAccountRepo();
  const transactionsRepo =
    new TransactionsRepositoryFactory().getTransactionsRepo();

  const accountInfo = await accountRepo.retrieveAccountWithBalance(
    process.env.NEXT_PUBLIC_ACCOUNT_ID as string
  );

  const today = DateTime.utc().startOf('day');
  const lastWeek = today.minus({ days: 7 });
  const transactions = await transactionsRepo.retrieveTransactionsBetween(
    process.env.NEXT_PUBLIC_ACCOUNT_ID as string,
    lastWeek.toJSDate().toISOString(),
    today.toJSDate().toISOString()
  );

  const savingsGoalsRepo =
    new SavingsGoalRepositoryFactory().getSavingsGoalRepo();
  const savingsGoals = await savingsGoalsRepo.retrieveSavingsGoals(
    process.env.NEXT_PUBLIC_ACCOUNT_ID as string
  );

  return {
    props: {
      account: JSON.parse(JSON.stringify(accountInfo)),
      transactions: JSON.parse(JSON.stringify(transactions)),
      defaultStartDate: lastWeek.toISODate(),
      defaultEndDate: today.toISODate(),
      roundUpAmount: transactions
        .map((transaction) => transaction.amount.minorUnits)
        .reduce((acc, amount) => acc + amount, 0),
      savingsGoals: JSON.parse(JSON.stringify(savingsGoals)),
    } as PageProps,
  };
};

const Home: NextPage<PageProps> = ({
  account,
  transactions,
  defaultStartDate,
  defaultEndDate,
  savingsGoals,
}: PageProps) => (
  <div className={styles.container}>
    <Head>
      <title>Round Up</title>
    </Head>

    <main className={styles.main}>
      <RoundUpContainer
        accountName={account.name}
        accountBalance={account.currentBalance}
        transactions={transactions}
        defaultStartDate={defaultStartDate}
        defaultEndDate={defaultEndDate}
        savingsGoal={savingsGoals[0]}
      />
    </main>
  </div>
);

export default Home;
