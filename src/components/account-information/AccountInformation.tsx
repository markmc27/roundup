import { Stack, Typography } from '@mui/material';
import MonetaryAmount from '../../lib/entities/MonetaryAmount';
import formatMonetaryAmount from '../../utils/formatMonetaryAmountToString';

interface AccountInformationProps {
  accountName: string;
  accountBalance: MonetaryAmount;
}

const AccountInformation = (props: AccountInformationProps) => {
  const { accountName, accountBalance } = props;

  return (
    <Stack p={1}>
      <Typography variant="h2">{accountName}</Typography>
      <Stack p={2} direction={'row'} justifyContent={'space-between'}>
        <Typography>Your balance</Typography>
        <Typography>
          {formatMonetaryAmount(
            accountBalance.minorUnits,
            accountBalance.currency
          )}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default AccountInformation;
