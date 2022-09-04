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
import TransactionList from '../transaction-list/TransactionList';

interface RoundUpFormProps {
  accountName: string;
  accountBalance: MonetaryAmount;
  transactions: Transaction[];
}

const RoundUpContainer = (props: RoundUpFormProps) => {
  const { accountName, accountBalance, transactions } = props;

  return (
    <Container maxWidth="sm">
      <Typography variant="h1">{accountName}</Typography>
      <Typography>
        Your Balance: {formatMonetaryAmount(accountBalance)}
      </Typography>
      <Typography>Round-up start date</Typography>
      <Typography>Round-up end date</Typography>
      <Typography>Savings goals</Typography>
      <Typography>Round-up amount</Typography>
      <Typography>Transfer to savings goal</Typography>
      <Box>
        <Typography variant="h2">Transactions</Typography>
        <TransactionList transactions={transactions} />
      </Box>
    </Container>
  );
};

export default RoundUpContainer;
