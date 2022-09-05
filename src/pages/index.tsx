import { Typography } from '@mui/material';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import RoundUpContainer from '../components/round-up-form/RoundUpContainer';
import AccountRepository from '../lib/account/AccountRepository';
import AccountRepositoryFactory from '../lib/account/AccountRepositoryFactory';
import AccountWithBalance from '../lib/entities/AccountWithBalance';
import MonetaryAmount from '../lib/entities/MonetaryAmount';
import styles from '../styles/Home.module.css';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const accountRepo = new AccountRepositoryFactory().getAccountRepo();

  const accountInfo = await accountRepo.retrieveAccountWithBalance(
    process.env.NEXT_PUBLIC_ACCOUNT_ID as string
  );

  return {
    props: {
      account: JSON.parse(JSON.stringify(accountInfo)),
    } as PageProps,
  };
};

type PageProps = {
  account: AccountWithBalance;
};

const Home: NextPage<PageProps> = ({ account }: PageProps) => (
  <div className={styles.container}>
    <Head>
      <title>Round Up</title>
    </Head>

    <main className={styles.main}>
      <RoundUpContainer
        accountName={account.name}
        accountBalance={account.currentBalance}
        transactions={[]}
      />
    </main>
  </div>
);

export default Home;
