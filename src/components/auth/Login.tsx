import { yupResolver } from '@hookform/resolvers/yup';
import { Link as RouterLink } from 'react-router-dom';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { Button, Container, Paper, Box, Typography, Link } from '@mui/material';

import InputController from '../../controllers/Input';

import { UserLogin } from '../../types';
import { LoginSchema } from '../../validations';
import { useAuth } from '../../context/AuthContext';
import {
  EMAIL, PASSWORD, LOGIN, SIGN_UP, SIGN_UP_ROUTE, ROOT_ROUTE,
  WELCOME_TO_BOARD, PLEASE_LOGIN_TO_CONTINUE, DO_NOT_HAVE_ACCOUNT
} from '../../constants';

const Login = () => {
  const { login } = useAuth()

  const methods = useForm<UserLogin>({
    resolver: yupResolver(LoginSchema),
  });
  const { handleSubmit } = methods

  const onSubmit: SubmitHandler<UserLogin> = async ({ email, password }) => {
    const result = await login(email, password)

    if (result) {
      window.location = ROOT_ROUTE as unknown as Location
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
          <Box textAlign="center" mb={3}>
            <Box
              component="img"
              src="/logo.png"
              alt="Logo"
              sx={{ width: '60px', height: '60px', marginBottom: '10px' }}
            />
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {WELCOME_TO_BOARD}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {PLEASE_LOGIN_TO_CONTINUE}
            </Typography>
          </Box>

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputController name="email" placeholder={EMAIL} />
              <InputController name="password" placeholder={PASSWORD} isPassword />

              <Box mt={2}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  {LOGIN}
                </Button>
              </Box>
            </form>
          </FormProvider>

          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              {DO_NOT_HAVE_ACCOUNT}
              <Link component={RouterLink} to={SIGN_UP_ROUTE} underline="hover">
                {SIGN_UP}
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
