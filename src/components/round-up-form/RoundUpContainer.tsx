import {
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import Container from '@mui/material/Container';
import MonetaryAmount from '../../lib/entities/MonetaryAmount';
import Transaction from '../../lib/entities/Transaction';
import formatMonetaryAmount from '../../utils/formatMonetaryAmountToString';
import roundUpToNearest100 from '../../utils/roundUpToNearest100';
import TransactionList from '../transaction-list/TransactionList';

interface RoundUpFormProps {
  accountName: string;
  accountBalance: MonetaryAmount;
  transactions: Transaction[];
  defaultStartDate: string;
  defaultEndDate: string;
}

const RoundUpContainer = (props: RoundUpFormProps) => {
  const {
    accountName,
    accountBalance,
    transactions,
    defaultStartDate,
    defaultEndDate,
  } = props;

  const roundUpAmount = transactions.reduce((acc, transaction) => {
    return acc + roundUpToNearest100(transaction.amount.minorUnits);
  }, 0);

  return (
    <Container maxWidth="sm">
      <Typography variant="h1">{accountName}</Typography>
      <Typography>
        Your Balance:{' '}
        {formatMonetaryAmount(
          accountBalance.minorUnits,
          accountBalance.currency
        )}
      </Typography>
      <Typography>Round-up start date {defaultStartDate}</Typography>
      <Typography>Round-up end date {defaultEndDate}</Typography>
      <TransactionList transactions={transactions} />
      <Typography>
        Round-up amount{' '}
        {formatMonetaryAmount(roundUpAmount, accountBalance.currency)}
      </Typography>
      <Typography>Savings goals</Typography>
      <Typography>Transfer to savings goal</Typography>
    </Container>
  );
};

export default RoundUpContainer;
