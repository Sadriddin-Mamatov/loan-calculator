import React from 'react';
import { Typography, Box } from '@mui/material';
import {FormData } from "../types/LoanRow";

interface LoanDetailsProps {
    result: FormData;
}


const LoanDetails: React.FC<LoanDetailsProps> = ({result}) => {

    return (
          <Box sx={{
                background:'#61bf39',
                color:"#fff",
                padding:'30px',
            }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Loan Details
                </Typography>
                <Box
                    sx={{
                        display:'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)'
                    }}
                >
                    <Box sx={{

                    }}>
                        <Typography variant="h5" align="left" >
                            {result.loanType}
                        </Typography>
                        <Typography variant="caption" align="left" >
                            Loan name
                        </Typography>
                    </Box>
                    <Box sx={{

                    }}>
                        <Typography variant="h5" align="left" >
                            {result.loanTerm} month
                        </Typography>
                        <Typography variant="caption" align="left" >
                            Term
                        </Typography>
                    </Box>
                    <Box sx={{

                    }}>
                        <Typography variant="h5" align="left" >
                            {result.interestRate} %
                        </Typography>
                        <Typography variant="caption" align="left" >
                            Interest rate per year
                        </Typography>
                    </Box>
                    <Box sx={{

                    }}>
                        <Typography variant="h5" align="left" >
                            {result.interestRate}
                        </Typography>
                        <Typography variant="caption" align="left" >
                            Loan Total Amount
                        </Typography>
                    </Box>
                </Box>
            </Box>
    );
};

export default LoanDetails;
