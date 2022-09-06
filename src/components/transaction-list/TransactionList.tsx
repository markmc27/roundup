import {
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import Container from '@mui/material/Container';
import Transaction from '../../lib/entities/Transaction';
import formatMonetaryAmount from '../../utils/formatMonetaryAmountToString';
import roundUpToNearest100 from '../../utils/roundUpToNearest100';

interface RoundUpFormProps {
  transactions: Transaction[];
}

const TransactionList = (props: RoundUpFormProps) => {
  const { transactions } = props;

  console.log('transactions', transactions);
  return (
    <Box>
      <Typography variant="h2">Transactions</Typography>
      <List>
        {transactions.map((transaction) => (
          <ListItem key={transaction.id} data-testid="transaction">
            <Card sx={{ display: 'flex' }}>
              <CardContent>
                <Typography>{transaction.counterParty}</Typography>
                <Typography>
                  {formatMonetaryAmount(
                    transaction.amount.minorUnits,
                    transaction.amount.currency
                  )}
                </Typography>
                <Typography>
                  {formatMonetaryAmount(
                    roundUpToNearest100(transaction.amount.minorUnits),
                    transaction.amount.currency
                  )}
                </Typography>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TransactionList;
