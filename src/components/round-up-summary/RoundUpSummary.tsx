import { Stack, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import LoadingButton from '@mui/lab/LoadingButton';
import SavingsGoal from '../../lib/entities/SavingsGoal';
import formatMonetaryAmount from '../../utils/formatMonetaryAmountToString';

interface RoundUpFormProps {
  defaultStartDate: string;
  defaultEndDate: string;
  savingsGoal: SavingsGoal;
  roundUpAmountMinorUnits: number;
  accountCurrency: string;
  onTransferToSavingsGoal: () => void;
  isLoading: boolean;
}

const RoundUpSummary = (props: RoundUpFormProps) => {
  const {
    defaultStartDate,
    defaultEndDate,
    savingsGoal,
    roundUpAmountMinorUnits,
    accountCurrency,
    onTransferToSavingsGoal,
    isLoading,
  } = props;

  return (
    <Container maxWidth="sm">
      <Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Round-up start date</Typography>
          <Typography data-testid="start-date">{defaultStartDate}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Round-up end date</Typography>
          <Typography data-testid="end-date">{defaultEndDate}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Saved total</Typography>
          <Typography data-testid="saved-total">
            {formatMonetaryAmount(
              savingsGoal.totalSaved.minorUnits,
              savingsGoal.totalSaved.currency
            )}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Savings goal</Typography>
          <Typography data-testid="savings-goal">{savingsGoal.name}</Typography>
        </Stack>
        <Stack mt={4} direction="row" justifyContent="space-between">
          <Typography variant="h4" component="p">
            Round-up amount
          </Typography>
          <Typography variant="h4" component="p" data-testid="round-up-amount">
            {formatMonetaryAmount(roundUpAmountMinorUnits, accountCurrency)}
          </Typography>
        </Stack>
        <LoadingButton
          sx={{ mt: 1 }}
          variant="contained"
          onClick={onTransferToSavingsGoal}
          loading={isLoading}
          data-testid="round-up-button"
        >
          Transfer to savings goal
        </LoadingButton>
      </Stack>
    </Container>
  );
};

export default RoundUpSummary;
