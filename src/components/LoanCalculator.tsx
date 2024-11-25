import React, {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {TextField, Button, Select, MenuItem, Typography, Box, Slider} from '@mui/material';
import {calculateLoanRepaymentSchedule} from '../utils/calculateLoanRepayment';
import LoanRepaymentTable from "./LoanRePaymentTable"
import {LoanRow, FormData} from "../types/LoanRow";
import LoanDetails from "./LoanDetails";


const LoanCalculator: React.FC = () => {
    const {handleSubmit, control, watch, setValue} = useForm<FormData>({
        defaultValues: {
            loanType: 'online_microloan',
            loanAmount: 0,
            loanTerm: 1,
            interestRate: 0,
            calculationType: 'Custom',
            insuranceCosts: 0,
            notaryCosts: 0,
            collateralCosts: 0,
            otherCosts: 0,
        },
    });
    const [schedule, setSchedule] = useState<LoanRow[]>([]);

    const [result, setResult] = useState<FormData | null>(null);
    const loanAmount = watch('loanAmount');
    const loanTerm = watch('loanTerm');
    const interestRate = watch('interestRate');
    const calculationType = watch('calculationType');
    const insuranceCosts = watch('insuranceCosts');
    const notaryCosts = watch('notaryCosts');
    const collateralCosts = watch('collateralCosts');
    const otherCosts = watch('otherCosts');

    const onSubmit = (data: FormData) => {
        setResult(data);
        const repaymentSchedule = calculateLoanRepaymentSchedule(
            loanAmount,
            loanTerm,
            interestRate,
            calculationType,
            insuranceCosts,
            notaryCosts,
            collateralCosts,
            otherCosts
        );

        setSchedule(repaymentSchedule);
    };

    return (
        <Box sx={{maxWidth: 1400, margin: '0 auto', padding: 2, backgroundColor: "#f8f8f8"}}>
            <Typography variant="h3" align="center" gutterBottom>
                Loan Calculator
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: 2,
                        mb: 3,
                    }}
                >
                    <Controller
                        name="loanType"
                        control={control}
                        render={({field}) => (
                            <Select
                                {...field}
                                fullWidth
                                className="custom-input"
                            >
                                <MenuItem value="online_microloan">Online Microloan</MenuItem>
                                <MenuItem value="personal_loan">Personal loan</MenuItem>
                                <MenuItem value="microloan">Microloan</MenuItem>
                            </Select>
                        )}
                    />
                    <Box sx={{position: 'relative', mb: 2}}>
                        <Controller
                            name="loanAmount"
                            control={control}
                            render={({field}) => (
                                <>
                                    <TextField
                                        {...field}
                                        value={loanAmount}
                                        onChange={(e) => setValue('loanAmount', Number(e.target.value))}
                                        label="Loan Amount (UZS)"
                                        type="number"
                                        fullWidth
                                        margin="normal"
                                        className="custom-input"
                                    />
                                    <Slider
                                        value={loanAmount}
                                        onChange={(_, value) => setValue('loanAmount', value as number)}
                                        min={0}
                                        max={50000000}
                                        step={50000}
                                        sx={{
                                            position: 'absolute',
                                            top: "72%",
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            color: '#61bf39',
                                        }}
                                        valueLabelDisplay="auto"
                                    />
                                </>
                            )}
                        />
                    </Box>
                    <Box sx={{position: 'relative', mb: 2}}>
                        <Controller
                            name="loanTerm"
                            control={control}
                            render={({field}) => (
                                <>
                                    <TextField
                                        {...field}
                                        value={loanTerm}
                                        onChange={(e) => setValue('loanTerm', Number(e.target.value))}
                                        label="Loan Term(month)"
                                        type="number"
                                        fullWidth
                                        margin="normal"
                                        className="custom-input"
                                    />
                                    <Slider
                                        value={loanTerm}
                                        onChange={(_, value) => setValue('loanTerm', value as number)}
                                        min={0}
                                        max={36}
                                        sx={{
                                            position: 'absolute',
                                            top: "72%",
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            color: '#61bf39',
                                        }}
                                        valueLabelDisplay="auto"
                                    />
                                </>
                            )}
                        />
                    </Box>
                    <Controller
                        name="interestRate"
                        control={control}
                        render={({field}) => (
                            <TextField
                                {...field}
                                label="Interest Rate (%)"
                                type="number"
                                fullWidth
                                margin="normal"
                                className="custom-input"
                            />
                        )}
                    />
                    <Controller
                        name="calculationType"
                        control={control}
                        render={({field}) => (
                            <Select {...field} fullWidth className="custom-input">
                                <MenuItem value="Annuity">Annuity</MenuItem>
                                <MenuItem value="Custom">Custom</MenuItem>
                            </Select>
                        )}
                    />
                </Box>
                <Typography variant="h4" mt={2} mb={1}>
                    Additional Expenses
                </Typography>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: 2,
                        mb: 3,
                    }}
                >
                    <Controller
                        name="insuranceCosts"
                        control={control}
                        render={({field}) => (
                            <TextField
                                {...field}
                                label="Insurance Costs"
                                type="number"
                                fullWidth
                                margin="normal"
                                className="custom-input"
                            />
                        )}
                    />
                    <Controller
                        name="notaryCosts"
                        control={control}
                        render={({field}) => (
                            <TextField
                                {...field}
                                label="Notary Costs"
                                type="number"
                                fullWidth
                                margin="normal"
                                className="custom-input"
                            />
                        )}
                    />
                    <Controller
                        name="collateralCosts"
                        control={control}
                        render={({field}) => (
                            <TextField
                                {...field}
                                label="Collateral Costs"
                                type="number"
                                fullWidth
                                margin="normal"
                                className="custom-input"
                            />
                        )}
                    />
                    <Controller
                        name="otherCosts"
                        control={control}
                        render={({field}) => (
                            <TextField
                                {...field}
                                label="Other Costs"
                                type="number"
                                fullWidth
                                margin="normal"
                                className="custom-input"
                            />
                        )}
                    />
                    <Button type="submit" variant="contained" sx={{
                        background: '#61bf39',
                        color: '#fff',
                        height: '60px',
                        marginTop: "17px"
                    }}>
                        Calculate
                    </Button>
                </Box>
            </form>

            {result !== null && <LoanDetails result={result}/>}

            {result !== null && <LoanRepaymentTable schedule={schedule}/>}
        </Box>
    );
};

export default LoanCalculator;
