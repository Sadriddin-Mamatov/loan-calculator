import React from 'react';
import { LoanRow } from '../types/LoanRow';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';

interface LoanRepaymentTableProps {
    schedule: LoanRow[];
}

const LoanRepaymentTable: React.FC<LoanRepaymentTableProps> = ({ schedule }) => {
    return (
        <TableContainer component={Paper} sx={{ marginTop: 4 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Month</TableCell>
                        <TableCell>Loan Balance</TableCell>
                        <TableCell>Principal Debt</TableCell>
                        <TableCell>Commission Fee</TableCell>
                        <TableCell>Third Party Costs</TableCell>
                        <TableCell>Other Costs</TableCell>
                        <TableCell>Monthly Interest Amount</TableCell>
                        <TableCell>Repayment Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {schedule.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>{row.month}</TableCell>
                            <TableCell>{Number(row.loanBalance).toFixed(2)}</TableCell>
                            <TableCell>{Number(row.principalDebt).toFixed(2)}</TableCell>
                            <TableCell>{Number(row.commissionFee).toFixed(2)}</TableCell>
                            <TableCell>{Number(row.thirdPartyCosts).toFixed(2)}</TableCell>
                            <TableCell>{Number(row.otherCosts).toFixed(2)}</TableCell>
                            <TableCell>{row.monthlyInterest.toFixed(2)}</TableCell>
                            <TableCell>{Number(row.repaymentAmount).toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default LoanRepaymentTable;
