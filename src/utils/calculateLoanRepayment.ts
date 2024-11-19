import { LoanRow } from '../types/LoanRow';

export const calculateLoanRepaymentSchedule = (
    loanAmount: number,
    loanTerm: number,
    interestRate: number,
    calculationType: 'Annuity' | 'Custom',
    insuranceCosts: number,
    notaryCosts: number,
    collateralCosts: number,
    otherCosts: number,
): LoanRow[] => {
    const monthlyInterestRate = interestRate / 100 / 12;
    const schedule: LoanRow[] = [];
    let remainingBalance = loanAmount;

    for (let month = 1; month <= loanTerm; month++) {
        let principalDebt = 0;
        let interestAmount = 0;
        let repaymentAmount = 0;

        if (calculationType === 'Annuity') {
            const annuityFactor =
                (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTerm)) /
                (Math.pow(1 + monthlyInterestRate, loanTerm) - 1);
            repaymentAmount = loanAmount * annuityFactor;
            interestAmount = remainingBalance * monthlyInterestRate;
            principalDebt = repaymentAmount - interestAmount;
        } else if  (calculationType === 'Custom') {

            interestAmount = remainingBalance * monthlyInterestRate;
            principalDebt = remainingBalance / loanTerm;
            repaymentAmount = principalDebt + interestAmount;

            if (principalDebt > remainingBalance) {
                principalDebt = remainingBalance;
                repaymentAmount = principalDebt + interestAmount;
            }
        }

        const totalCosts =
            insuranceCosts +
            notaryCosts +
            collateralCosts +
            otherCosts;
        const thirdPartyCosts=
                insuranceCosts+
                notaryCosts+
                collateralCosts;

        schedule.push({
            month,
            loanBalance: Math.max(remainingBalance, 0),
            principalDebt: Math.max(principalDebt, 0),
            interestAmount: Math.max(interestAmount, 0),
            thirdPartyCosts,
            otherCosts,
            repaymentAmount: Math.max(repaymentAmount, 0) + totalCosts,
        });

        remainingBalance -= principalDebt;
        if (remainingBalance <= 0) break;
    }

    return schedule;
};
