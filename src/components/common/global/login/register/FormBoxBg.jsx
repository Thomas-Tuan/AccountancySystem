import { Box, useTheme } from '@mui/material';
import React from 'react'
import { tokens } from '../../../../../theme';

const FormBoxBg = ({ children }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                bgcolor: colors.primary[400],
                borderRadius: 2,
                boxShadow: `8px 6px 4px ${colors.primary[500]}`,
            }}
        >
            {children}
        </Box>
    );
}
export default FormBoxBg