import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Container, Grid, IconButton, InputAdornment, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import loginApi from '../../api/loginApi';
import { FormikTextField } from '../../components/common/global/CustomTextField';
import FooterForm from '../../components/common/global/login/register/FooterForm';
import FormBoxBg from '../../components/common/global/login/register/FormBoxBg';
import { tokens } from '../../theme';


export default function SignIn() {
    const [showHiddenPass, setShowHiddenPass] = useState(true)
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const initialValues = {
        Name: '',
        Password: '',
    };

    const validationSchema = Yup.object().shape({
        Name: Yup.string().required('Không được bỏ trống'),
        Password: Yup.string().required('Không được bỏ trống').min(5, 'Mật khẩu phải 5 ký tự trở lên'),
    });
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/dashboard';
    const handleSubmit = async (values, props) => {
        try {
            const response = await loginApi.signIn(values)
            sessionStorage.setItem('userAccount', JSON.stringify(response));
            toast.success("Đăng nhập thành công", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            navigate(from, { replace: true });
        }
        catch (err) {
            if (err.response && err.response.data !== undefined) {
                toast.error(err.response.data.errorMessage, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                console.log(`Error to login with ${err.response.data.errorMessage}`);
            }
        }

    }

    const handleClickShowPassword = () => {
        setShowHiddenPass(!showHiddenPass);
    };

    return (
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
            <Container maxWidth="sm">
                <FormBoxBg>
                    <Formik validationSchema={validationSchema}
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                    >
                        {({ values, handleChange, handleBlur }) => {
                            return (
                                <>
                                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                        <LockOutlinedIcon />
                                    </Avatar>
                                    <Typography variant='h4' fontWeight="bold"
                                        sx={{
                                            textTransform: 'uppercase',
                                            textAlign: "center",
                                            color: colors.grey[100],
                                        }}>
                                        Đăng nhập
                                    </Typography>
                                    <Box mt={1} >
                                        <Form >
                                            <Grid container spacing={1}>
                                                <Grid mx={15} item xs={12}>
                                                    <FormikTextField label="Tên tài khoản"
                                                        fullWidth
                                                        value={values.Name}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        name="Name" />
                                                </Grid>
                                                <Grid mx={15} item xs={12}>
                                                    <FormikTextField label="Mật khẩu"
                                                        fullWidth
                                                        type={showHiddenPass ? "password" : "text"}
                                                        value={values.Password}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        name="Password"
                                                        InputProps={{
                                                            endAdornment: (
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        aria-label="toggle password visibility"
                                                                        onClick={handleClickShowPassword}
                                                                        size="large"
                                                                    >
                                                                        {showHiddenPass ? <Visibility /> : <VisibilityOff />}
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            ),
                                                        }} />
                                                </Grid>
                                                <Grid mx={15} item xs={12}>
                                                    <Button
                                                        sx={{
                                                            "&:hover": {
                                                                backgroundColor: `${colors.primary[700]} !important`,
                                                            },
                                                            borderRadius: 2,
                                                            background: colors.primary[500],
                                                            color: colors.grey[100],
                                                        }}
                                                        fullWidth
                                                        type='submit'
                                                        variant='contained'
                                                        size='large'>
                                                        Đăng nhập
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Form>
                                    </Box>
                                    <FooterForm link="/register" text="Chưa có tài khoản?" text1="Đăng ký" />
                                </>
                            )
                        }
                        }
                    </Formik>
                </FormBoxBg>
            </Container>
        </Box>

    );
}