import { yupResolver } from '@hookform/resolvers/yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { Button, Container, Paper, Box, Typography, Link } from '@mui/material';

import InputController from '../../controllers/Input';

import { User } from '../../types';
import { SignupSchema } from '../../validations';
import { useAuth } from '../../context/AuthContext';
import {
  EMAIL, FIRST_NAME, LAST_NAME, PASSWORD, SIGN_UP, LOGIN, LOGIN_ROUTE,
  CREATE_YOUR_ACCOUNT, ALREADY_HAVE_ACCOUNT, JOIN_BOARD,
} from '../../constants';

const SignupComponent = () => {
  const { signup } = useAuth()
  const navigate = useNavigate()

  const methods = useForm<User>({
    resolver: yupResolver(SignupSchema),
  });

  const onSubmit: SubmitHandler<User> = async ({ email, firstName, lastName, password }) => {
    const result = await signup(email, password, firstName, lastName)

    if (result) {
      navigate(LOGIN_ROUTE)
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
              {JOIN_BOARD}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {CREATE_YOUR_ACCOUNT}
            </Typography>
          </Box>

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <InputController name="firstName" placeholder={FIRST_NAME} />
              <InputController name="lastName" placeholder={LAST_NAME} />
              <InputController name="email" placeholder={EMAIL} />
              <InputController name="password" placeholder={PASSWORD} isPassword />

              <Box mt={2}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  {SIGN_UP}
                </Button>
              </Box>
            </form>
          </FormProvider>

          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              {ALREADY_HAVE_ACCOUNT}
              <Link component={RouterLink} to={LOGIN_ROUTE} underline="hover">
                {LOGIN}
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default SignupComponent;
