export interface LoanRow {
    month: number;
    loanBalance: number;
    principalDebt: number;
    commissionFee: number;
    thirdPartyCosts: number;
    otherCosts: number;
    repaymentAmount: number;
}
export interface FormData {
    loanType: string;
    loanAmount: number;
    loanTerm: number;
    interestRate: number;
    calculationType: string | any;
    insuranceCosts: number;
    notaryCosts: number;
    collateralCosts: number;
    otherCosts: number;
}
