import {LoanRow} from '../types/LoanRow';

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
    let remainingBalance = Number(loanAmount);

    for (let month = 1; month <= loanTerm; month++) {
        let interestAmount = 0;
        let repaymentAmount = 0;
        let principalDebt = 0;

        if (calculationType === 'Annuity') {
            const annuityFactor =
                (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTerm)) /
                (Math.pow(1 + monthlyInterestRate, loanTerm) - 1);
            repaymentAmount = loanAmount * annuityFactor;
            interestAmount = remainingBalance * monthlyInterestRate;
            principalDebt = repaymentAmount - interestAmount;
        } else if (calculationType === 'Custom'){
            interestAmount = remainingBalance * monthlyInterestRate;
            repaymentAmount = principalDebt + interestAmount;
            principalDebt = remainingBalance / loanTerm;

            if (principalDebt > remainingBalance) {
                principalDebt = remainingBalance;
                repaymentAmount = principalDebt + interestAmount;
            }
        }

        const commissionFee = (loanAmount * interestRate) / 100;

        const totalCosts =
            insuranceCosts +
            notaryCosts +
            collateralCosts +
            otherCosts;

        const thirdPartyCosts =
            insuranceCosts +
            notaryCosts +
            collateralCosts;

        schedule.push({
            month,
            loanBalance: Math.max(remainingBalance, 0),
            principalDebt: Math.max(principalDebt, 0),
            commissionFee: Math.max(commissionFee, 0),
            thirdPartyCosts,
            otherCosts,
            repaymentAmount: Math.max(repaymentAmount, 0) + totalCosts,
        });

        remainingBalance -= principalDebt;
        if (remainingBalance <= 0) break;
    }

    return schedule;
};
