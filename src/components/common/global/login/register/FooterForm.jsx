import { Box, Divider, Typography, useTheme } from '@mui/material';
import React from 'react'
import { tokens } from '../../../../../theme';
import { Link } from 'react-router-dom';

const FooterForm = ({ text, text1, link }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box my={2} display="flex" alignItems="center" justifyContent="space-between">
            <Typography sx={{
                color: colors.primary[100],
            }} mr={1} variant='subtitle1'>{text}</Typography>
            <Divider sx={{
                color: colors.grey[100],
            }} orientation="vertical" />
            <Typography sx={{
                textDecoration: "none",
                color: colors.primary[300],
            }} textAlign="end" component={Link} to={link} variant='subtitle1'> {text1}
            </Typography>
        </Box>
    );
}
export default FooterForm