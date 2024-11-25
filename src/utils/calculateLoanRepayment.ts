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
    let schedule: LoanRow[] = [];
    const thirdPartyCosts = Number(insuranceCosts) + Number(notaryCosts) + Number(collateralCosts);

    const other = 0.00;

    const commissionFee = 0.00;

        if (calculationType === 'Annuity') {
            const annuityFactor =
                (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTerm)) /
                (Math.pow(1 + monthlyInterestRate, loanTerm) - 1);

            const monthlyRepayment = loanAmount * annuityFactor;

            let remainingBalance = loanAmount;

                for (let i = 1; i <= loanTerm; i++) {
                    const monthlyInterest = remainingBalance * monthlyInterestRate;
                    const principalDebt = monthlyRepayment - monthlyInterest;

                    schedule.push({
                        month: i,
                        loanBalance: remainingBalance,
                        principalDebt,
                        monthlyInterest,
                        thirdPartyCosts,
                        otherCosts:other,
                        commissionFee,
                        repaymentAmount: monthlyRepayment,
                    });

                    remainingBalance -= principalDebt;
                }
        } else if (calculationType === 'Custom') {
            let remainingBalance = loanAmount;
            const principalPerMonth = loanAmount / loanTerm;

            for (let i = 1; i <= loanTerm; i++) {
                const monthlyInterest = remainingBalance * monthlyInterestRate;
                const repaymentAmount = principalPerMonth + monthlyInterest;

                schedule.push({
                    month: i,
                    loanBalance: remainingBalance,
                    principalDebt: principalPerMonth,
                    monthlyInterest,
                    repaymentAmount,
                    thirdPartyCosts,
                    otherCosts:other,
                    commissionFee,
                });

                remainingBalance -= principalPerMonth;
            }


        }
        return schedule;
}
