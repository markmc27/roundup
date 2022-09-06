import {
  Box,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  Stack,
  Typography,
} from '@mui/material';
import Container from '@mui/material/Container';
import MonetaryAmount from '../../lib/entities/MonetaryAmount';
import SavingsGoal from '../../lib/entities/SavingsGoal';
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
  savingsGoal: SavingsGoal;
}

const RoundUpContainer = (props: RoundUpFormProps) => {
  const {
    accountName,
    accountBalance,
    transactions,
    defaultStartDate,
    defaultEndDate,
    savingsGoal,
  } = props;

  const roundUpAmount = transactions.reduce((acc, transaction) => {
    return acc + roundUpToNearest100(transaction.amount.minorUnits);
  }, 0);

  return (
    <Container maxWidth="sm">
      <Stack>
        <Box>
          <Typography variant="h1">{accountName}</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Typography>Your balance</Typography>
          <Typography>
            {formatMonetaryAmount(
              accountBalance.minorUnits,
              accountBalance.currency
            )}
          </Typography>
        </Box>
        <Box>
          <Typography>Round-up start date</Typography>
          <Typography data-testid="start-date">{defaultStartDate}</Typography>
        </Box>
        <Box>
          <Typography>Round-up end date</Typography>
          <Typography data-testid="end-date">{defaultEndDate}</Typography>
        </Box>
        <TransactionList transactions={transactions} />
        <Typography>Round-up amount</Typography>
        <Typography data-testid="round-up-amount">
          {formatMonetaryAmount(roundUpAmount, accountBalance.currency)}
        </Typography>
        <Box>
          <Typography>Savings goals</Typography>
          <Typography data-testid="savings-goal">{savingsGoal.name}</Typography>
          <Typography data-testid="savings-goal">
            Saved total:{' '}
            {formatMonetaryAmount(
              savingsGoal.totalSaved.minorUnits,
              savingsGoal.totalSaved.currency
            )}
          </Typography>
        </Box>
        <Button>Transfer to savings goal</Button>
      </Stack>
    </Container>
  );
};

export default RoundUpContainer;
