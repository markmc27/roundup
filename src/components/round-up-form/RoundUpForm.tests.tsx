import { render } from '@testing-library/react';
import RoundUpContainer from './RoundUpForm';


describe('Round-up form', () => {
    it('should contain account name', () => {
        const accountName = 'Personal';
        const { getByText } = render(
            <RoundUpContainer accountName={accountName} />
        );

        expect(getByText(accountName)).toBeVisible();
    })
});