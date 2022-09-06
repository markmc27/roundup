import { Button, Container } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DateTime } from 'luxon';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import AccountInformation from '../components/account-information/AccountInformation';
import RoundUpSummary from '../components/round-up-summary/RoundUpSummary';
import TransactionList from '../components/transaction-list/TransactionList';
import QueryKeys from '../hooks/QueryKeys';
import useAccountInformation from '../hooks/useAccountInformation';
import useSavingsGoals from '../hooks/useSavingsGoals';
import useTransactions from '../hooks/useTransactions';
import AccountRepositoryFactory from '../lib/account/AccountRepositoryFactory';
import AccountWithBalance from '../lib/entities/AccountWithBalance';
import SavingsGoal from '../lib/entities/SavingsGoal';
import Transaction from '../lib/entities/Transaction';
import SavingsGoalRepositoryFactory from '../lib/savings-goal/SavingsGoalsRepositoryFactory';
import TransactionsRepositoryFactory from '../lib/transactions/TransactionsRepositoryFactory';
import styles from '../styles/Home.module.css';
import roundUpToNearest100 from '../utils/roundUpToNearest100';

type PageProps = {
  account: AccountWithBalance;
  transactions: Transaction[];
  defaultStartDate: string;
  defaultEndDate: string;
  savingsGoals: SavingsGoal[];
};

type TransferMutationData = {
  accountId: string;
  savingGoalId: string;
  roundUpAmountMinorUnits: number;
  currency: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const accountRepo = new AccountRepositoryFactory().getAccountRepo();
  const transactionsRepo =
    new TransactionsRepositoryFactory().getTransactionsRepo();
  const savingsGoalsRepo =
    new SavingsGoalRepositoryFactory().getSavingsGoalRepo();

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

const Home: NextPage<PageProps> = (props) => {
  const {
    account: accountInitialData,
    transactions: transactionsInitialData,
    defaultStartDate: defaultStartDateInitialData,
    defaultEndDate: defaultEndDateInitialData,
    savingsGoals: savingsGoalsInitialData,
  } = props;

  const queryClient = useQueryClient();

  const { data: accountInformation } = useAccountInformation(
    accountInitialData,
    accountInitialData.id
  );

  const { data: transactions } = useTransactions(
    transactionsInitialData,
    accountInitialData.id,
    defaultStartDateInitialData,
    defaultEndDateInitialData
  );

  const { data: savingsGoals } = useSavingsGoals(
    savingsGoalsInitialData,
    accountInitialData.id
  );

  const roundUpAmount = transactionsInitialData.reduce((acc, transaction) => {
    return acc + roundUpToNearest100(transaction.amount.minorUnits);
  }, 0);

  const transferRoundUpMutation = useMutation(
    (transferData: TransferMutationData) => {
      const savingsGoalsRepo =
        new SavingsGoalRepositoryFactory().getSavingsGoalRepo();

      const { accountId, savingGoalId, roundUpAmountMinorUnits, currency } =
        transferData;

      return savingsGoalsRepo.transferToSavingsGoals(
        accountId,
        savingGoalId,
        roundUpAmountMinorUnits,
        currency
      );
    },
    {
      onSettled: () => {
        console.log('settled');
        queryClient.refetchQueries([QueryKeys.AccountInfo]);
        queryClient.refetchQueries([QueryKeys.Transactions]);
        queryClient.refetchQueries([QueryKeys.SavingsGoals]);
      },
    }
  );

  const onTransferToSavingsGoal = async () => {
    await transferRoundUpMutation.mutateAsync({
      accountId: process.env.NEXT_PUBLIC_ACCOUNT_ID as string,
      savingGoalId: savingsGoals[0].id,
      roundUpAmountMinorUnits: roundUpAmount,
      currency: savingsGoals[0].totalSaved.currency,
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Round Up</title>
      </Head>

      <main className={styles.main}>
        <Container maxWidth="sm">
          <AccountInformation
            accountName={accountInformation.name}
            accountBalance={accountInformation.currentBalance}
          />
          <TransactionList transactions={transactions} />

          <RoundUpSummary
            defaultStartDate={defaultStartDateInitialData}
            defaultEndDate={defaultEndDateInitialData}
            savingsGoal={savingsGoals[0]}
            roundUpAmountMinorUnits={roundUpAmount}
            accountCurrency={accountInformation.currentBalance.currency}
            onTransferToSavingsGoal={onTransferToSavingsGoal}
            isLoading={transferRoundUpMutation.isLoading}
          />
        </Container>
      </main>
    </div>
  );
};

export default Home;
