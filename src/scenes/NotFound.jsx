import { ArrowLeftOutlined } from '@mui/icons-material';
import { Box, Button, Container, SvgIcon, Typography } from '@mui/material';

const NotFound = () => (
    <Box
        component="main"
        sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            textAlign: 'center',
            padding: 3
        }}
    >
        <Container maxWidth="md">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center'
                }}
            >
                <Box
                    sx={{
                        mb: 3,
                    }}
                >
                    <img
                        alt="Under development"
                        src={require('../asset/images/error-404.png')}
                        style={{
                            display: 'inline-block',
                            maxWidth: '100%',
                            width: 400
                        }}
                    />
                </Box>
                <Typography
                    align="center"
                    sx={{ mb: 3 }}
                    variant="h3"
                >
                    Không tìm thấy trang này !
                </Typography>
                <Button
                    sx={{
                        fontWeight: "bold",
                    }}
                    href="/dashboard"
                    startIcon={(
                        <SvgIcon fontSize="small">
                            <ArrowLeftOutlined />
                        </SvgIcon>
                    )}
                    color="secondary"
                    variant="contained"
                >
                    Về lại trang chủ
                </Button>
            </Box>
        </Container>
    </Box>
);

export default NotFound;
