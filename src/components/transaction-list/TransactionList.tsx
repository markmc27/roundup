import {
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  Stack,
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

  return (
    <Box>
      <Typography variant="h2">Transactions</Typography>
      <List>
        {transactions.map((transaction) => (
          <ListItem key={transaction.id} data-testid="transaction">
            <Card sx={{ display: 'flex', flex: 1 }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h4">{transaction.counterParty}</Typography>
                <Typography variant="body2">{transaction.reference}</Typography>
                <Stack
                  mt={1}
                  direction={'row'}
                  justifyContent={'space-between'}
                >
                  <Typography>Amount</Typography>
                  <Typography>
                    {formatMonetaryAmount(
                      transaction.amount.minorUnits,
                      transaction.amount.currency
                    )}
                  </Typography>
                </Stack>
                <Stack direction={'row'} justifyContent={'space-between'}>
                  <Typography>Round up</Typography>
                  <Typography>
                    +
                    {formatMonetaryAmount(
                      roundUpToNearest100(transaction.amount.minorUnits),
                      transaction.amount.currency
                    )}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TransactionList;
