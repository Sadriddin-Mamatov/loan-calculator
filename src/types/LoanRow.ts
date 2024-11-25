export interface LoanRow {
    month: number;
    loanBalance: number;
    principalDebt: number;
    monthlyInterest:number;
    repaymentAmount: number;
    thirdPartyCosts:number;
    otherCosts:number,
    commissionFee:number
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
