import './LoginForm.css';
import { Button, TextField } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { Formik } from 'formik';
import { useCallback, useMemo } from 'react';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../api/ApiProvider';
import { useTranslation } from 'react-i18next';

function LoginForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const apiClient = useApi();
  const onSubmit = useCallback(
    (values: { username: string; password: string }, formik: any) => {
      apiClient.login(values).then((response) => {
        if (response.success) {
          // Przechowaj token w localStorage
          localStorage.setItem('token', response.data?.token as string);
          navigate('/home');
        } else {
          formik.setFieldError('username', 'Nieprawidłowe hasło lub login!');
        }
      });
    },
    [apiClient, navigate],
  );

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        username: yup.string().required('Required'),
        password: yup.string().required('Required').min(5, 'Za krótkie hasło!'),
      }),
    [],
  );

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnChange
      validateOnBlur
    >
      {(formik: any) => (
        <form
          className="LoginForm"
          id="singForm"
          onSubmit={formik.handleSubmit}
          noValidate
        >
          <TextField
            id="username"
            label={t('username')}
            variant="standard"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && !!formik.errors.username}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            id="password"
            label={t('password')}
            variant="standard"
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && !!formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            variant="contained"
            endIcon={<LoginIcon />}
            type="submit"
            form="singForm"
            disabled={!(formik.isValid && formik.dirty)}
          >
            {t('sign')}
          </Button>
        </form>
      )}
    </Formik>
  );
}

export default LoginForm;
