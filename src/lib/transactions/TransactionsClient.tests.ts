/**
 * @jest-environment node
 */

import { DateTime } from 'luxon';
import TransactionsClient from './TransactionsClient';

describe('Transactions Client Integration', () => {
  it('should return valid TransactionsResponse', async () => {
    const accountId = 'edb62ad2-80e1-4918-a884-5c69f687e2d3';
    const startDate = DateTime.fromFormat('2020-06-01', 'yyyy-MM-dd', {
      zone: 'utc',
    });
    const endDate = DateTime.fromFormat('2022-09-05', 'yyyy-MM-dd', {
      zone: 'utc',
    });

    //Note: Auth token expires regularly. A 403 response in the test logs indicates the token needs refreshing
    const response = await new TransactionsClient({
      authToken:
        'eyJhbGciOiJQUzI1NiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAA_31Uy5KbMBD8lS3OO1u8Ddxyyw_kAwZpsFUWEiUJb7ZS-fcIJIzxunLs7nn0aAb-JMLapEtwEsBp1B_WoZFCnXtU1w-mx-Q9sXPvI_qMOC95AQ1RCiXrOTRtmwMNDQ7IhiJrWh9Mv6eky-o6L6sqrev3RKALRFE39UIgY3pW7qeWnMwvwZfugy-c5SlkDa-gzE4VtHWVQ1WUbZlj21OKvrbTV1IhgxV52qZ5DU15yqEsUoI-HSrAvujzEjFr8eQz_Fg_GCNrQ1aPLbWtr543ZQklNjUg1ilUJz5UxBBPxdLHMj3RYis4BSa1Jd4ZQv62cZfVPigc6aXgvqYnQXBSTgyCzJGXwroDEwHnxhvviAt3B0FxDtllpHvkjj-NcPSGs7toI6xfIwjFxU3wGWUI7lGiYtEaQ8OBaeWMlqHRwkRNq0GYEZ3QCvQAw6y4vUv23n0DoTWbrdPjNiKNKGJhSd6IOnc4TfLrjtaoERVHRx0nSb7EBqNmruSWQSZDAxny3u3_pGAjaJNERv4FHJ3NOsdj4ncxppJhF9ymG8mhd4Md83BVI16HmvCLaJMCiEMEsAeBGPEcZ4qE72zUtpYQ_yA7g8oi2117GvpZXrttu7RTu4OAdxMBbwWWG_H3Ngq315SaeRMPFVYC9HIkz2zMMnoQchspzHig1ihDjMTkDsAepfDg6_IMyihavPmdWjjr3daBi8MduG-Z4f184VcldvFFrV0MRdmF-CyJQ3y_SJNzft55inDC7ZvyP9D1tkEb_tD-yG59j-yLfNCf6s47WhfI7O2ZmvgQqbm3zPjHXe5m6_LIrVGPx7Xu7_nakr__AJ0Fs1sZBgAA.f9ucH1pbVgTG5e_6VKH-50tSLRt30ZhsdevUTgoDjvIw8OMZ_JP-frr5RG9l3_b0fyKz_615cRBk-UNHIqUmjM-K2F_QWuH2Fk-patu0_gl59frdqBToYPba1-bZhUKZUvBbDZqHMSeyqZ29_b51VZIHzhj9UrkO4V6ZkNuLNCnuVO-Ba2XEMStRJ8uZRTlb5BY7tgf5-e6KTUWSDA6dLIo2ZxIV_I1WNiJaHpOvrhuGVDVuEQ8eFcFCQv13jex2hO9Mvh77wbtjEkDSnh26-lcyQs4kdZIPfCO8WIXglr2beVVNr6_Q2-syymefb7syG2UGRKxQhE05SxNLEfpGo1SONhx8k-1HA8vKjGHlRqrLkyLFxgapd7btiSip8xQILTTSe3mFYFqP4PRC62rT5ZXzP9pNQYsch2leqjiSH0rFu_0Nuh8OFuLG8JnqmeQ43BnBR0ZG9EBT3ZXqLHVDUnHl7VHvtWpB5xduXf0q4tPGTzfmRqN1L6g3-VdQfwWpWb1FUCBE2xaQx92nxI5_TzIbFoNZacDm3VqZwRAtZV45OQpzuozOsAokgGHM5ObQExRTmymd1res5b6G7wNQ2C4iUoEzk5hczngZYUMPshg8mbczsh3ek_kJZjr2u9C_UAHxnd61Ig6gTtiHEb5cSlfeoN2RcDQ4Px9qzH_rG6s',
      transactionsEndpoint:
        '/feed/account/{accountId}/settled-transactions-between/',
      baseUrl: 'https://api-sandbox.starlingbank.com/api/v2',
    }).getTransactions(
      accountId,
      startDate.toJSDate().toISOString(),
      endDate.toJSDate().toISOString()
    );

    expect(response.transactions).toHaveLength(14);
  });
});
