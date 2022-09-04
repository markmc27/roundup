import { Typography } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import RoundUpContainer from '../components/round-up-form/RoundUpContainer';
import MonetaryAmount from '../lib/entities/MonetaryAmount';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => (
  <div className={styles.container}>
    <Head>
      <title>Round Up</title>
    </Head>

    <main className={styles.main}>
      <RoundUpContainer
        accountName="Personal"
        accountBalance={
          new MonetaryAmount({ currency: 'GBP', minorUnits: 10000 })
        }
        transactions={[]}
      />
    </main>
  </div>
);

export default Home;
