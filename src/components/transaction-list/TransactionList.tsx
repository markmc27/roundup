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

interface RoundUpFormProps {
  transactions: Transaction[];
}

const TransactionList = (props: RoundUpFormProps) => {
  const { transactions } = props;

  return (
    <Box>
      <Typography variant="h2">Transactions</Typography>
      <List>
        {transactions.map((transaction) => (
          <ListItem key={transaction.id}>
            <Card sx={{ display: 'flex' }}>
              <CardContent>
                <Typography>{transaction.counterParty}</Typography>
                <Typography>
                  {formatMonetaryAmount(transaction.amount)}
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
