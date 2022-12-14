/**
 * @jest-environment node
 */

import { Guid } from 'guid-typescript';
import SavingsGoalClient, {
  SavingsGoalClientConfig,
} from './SavingsGoalClient';

const config: SavingsGoalClientConfig = {
  authToken:
    'eyJhbGciOiJQUzI1NiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAA_31Uy47bMAz8lYXPy0Xi-H3rrT_QD6AlKhEiS4YkZ7so-u-VLTmOs0GPM8PHUKT9J5POZV2GowROg_lwHq2S-tyjvn4wM2TvmZv6ENEfifOCn6AhOkDBeg5N2-ZAokGBTJyOTRuC6feYdceqysvTqWjr90yij0RR1IeZQMbMpP1PozjZX5LP3UUofMwPcGx4CcWxLqGtyhzKUKLIse3pgKG2N1fSMYM1p76tywoqFiwVpWigLykHXlesaqqqRlGFjDDWD8bIuZjVY0ttSIO8KQoosKkAsTpAWXNREkOsT3Mfx8xIs63oFJgyjnhnCfnbyl0W-6BxoJeC_xqfBMlJeykk2T2vpPM7JgHObTDeEZf-DqLiPbLLQPfIDX9a6ekNJ38xVrqwRpCay5vkE6oY3KNCzZI1hpYDM9pbo2KjmUma0ULaAb00GowAMWnu7pK7d19BbM0m582wjkgDylRYUTCizx2Oo_q6oyVqQM3RU8dJUSixwqTZK_l5kNGSIEvBu_ufFG1EbVTIKLyAp7Nd5nhM_C6mVLLsgut0A3kMbrBjAS5qwstQI34RrVIEaYgItiCQA57TTIkIna1e1xLjH2RvUTtkm-tAQz-pa7dulzZqcxDxZiLitcB8I-HeBum3msqwYOKhwkKAmY_kmU1Z1gip1pHijDtqibLESI5-B9xeig--LM-iSqLDW9ipg7PZbO24NNyO-5YZ3y8UflViE1_U2sRYlF2IT4o4pPdLNHkf5p3GBEdcv6nwA11uG4zlD-337Np3z77IB_Op77ynZYHM3Z6pkYtETb1jNjzufDdrl0duiXo8rmV_z9eW_f0HCDwCkhkGAAA.HIVkIFhmu5k0wWwMHtCYG4e4qFVb85J34b7eyZBdJQASxjSvfYPGShp6rUAWKKEnu7xeI3pxmv_QZYmmMwdQbz_0ieJ4BLrNTsMgXR6-661tGfWUoQ1nfM2o5c8iUjG87Bv0J5q1EMCVhpNziC9ibaAjv21p3EqkpkYv4qqOHIR5UyFhvSH3bOVmhNqg81Uek5Kjg5v5vJrarV7wuze-AXhLppXLDGuhhp3I09_s1gVH2bYgMWG3415Ugx4KzUNA_Q1hNuzwUsQVgh-9YUZNj2jWwrgSp3tiEALvreWyzZBISYH0Uj84WuIMzejcVtamTLLK7tBU_VU0g7S9r8TmCZG9q1WPiPGVTe1r6KhQ7GlvlW-SXraVYsfC71AuUMFP4WRKc4OYqPSJ5aTtvvhoXNWaeXdMADfXlwsS6RIe3ezpiCZaQgYaXKxib0mgLMN2PwxoQZbQHzT4Xq23Y_Mm2OfDlnKpKDeNmVLRdvXyfWEleLswbpbcO4CzoibInyesuf5NK3wKd-POvkFVsonLRONF9jSxngUnuRp_9pItijyBEEE8zMx2gYnO23qlWike7d0QMGv4a-lHSH7Ox7fpp_s0hSIrVoHQxD1SlTaqYHqjDxR0tkdnEU5Gj2ax_dOzrCPpO18UMnXAJxc5wk8pMW9AqpJ_Jx-I4yOBzJjXkU4',
  savingsGoalsEndpoint: '/account/{accountId}/savings-goals',
  addMoneyToSavingsGoalEndpoint:
    '/account/{accountId}/savings-goals/{savingGoalId}/add-money/{transferId}',
  baseUrl: 'https://api-sandbox.starlingbank.com/api/v2',
};
describe.skip('SavingsGoalClient', () => {
  it('should return valid SavingsGoalsResponse', async () => {
    const savingsGoalClient = new SavingsGoalClient(config);

    const savingsGoals = await savingsGoalClient.getSavingsGoals(
      'edb62ad2-80e1-4918-a884-5c69f687e2d3'
    );

    expect(savingsGoals.savingsGoals.length).toBe(1);
  });

  it.skip('should create savings goal', async () => {
    const savingsGoalClient = new SavingsGoalClient(config);

    const savingsGoal = await savingsGoalClient.createSavingsGoal(
      'edb62ad2-80e1-4918-a884-5c69f687e2d3',
      'Future adventures',
      'GBP'
    );

    expect(savingsGoal.success).toBe(true);
    expect(savingsGoal.savingsGoalUid).toBeInstanceOf(String);
  });

  it.skip('should transfer to savings goal', async () => {
    const savingsGoalClient = new SavingsGoalClient(config);

    const transferId = Guid.create().toString();

    const savingsGoal = await savingsGoalClient.addMoneyToSavingsGoal(
      'edb62ad2-80e1-4918-a884-5c69f687e2d3',
      'b4d553b9-32ad-4d99-a833-e7e71a5ad9a0',
      transferId,
      1,
      'GBP'
    );

    expect(savingsGoal.success).toBe(true);
    expect(savingsGoal.transferUid).toBe(transferId);
  });
});
