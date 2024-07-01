import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box ml={2} sx={{
      display: "flex",
      alignItems: "center",
      height: 1,
      justifyContent: "start",
    }} >
      <Typography
        variant="h4"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={colors.blueAccent[400]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
