import React, { useState, ChangeEvent, FormEvent } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import './CreateUserForm.css';
import Logo from './logo.jpg';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useApi } from '../api/ApiProvider';

interface CreateUserFormData {
  password: string;
  username: string;
  role: string;
  email: string;
  name: string;
}

interface FormErrors {
  [key: string]: string;
}

function CreateUserForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const apiClient = useApi();

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [formData, setFormData] = useState<CreateUserFormData>({
    password: '',
    username: '',
    role: '',
    email: '',
    name: '',
  });

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>,
  ) => {
    if ('target' in e) {
      const { name, value } = e.target as HTMLInputElement;
      setFormData({ ...formData, [name]: value });
    } else {
      console.error('Unsupported event type');
    }
  };

  const validateForm = (): FormErrors => {
    let formErrors: FormErrors = {};
    if (!formData.password) formErrors.password = 'Password is empty!';
    if (!formData.username) formErrors.username = 'Username is empty!';
    if (!formData.role) formErrors.role = 'Role is empty!';
    if (!formData.email) formErrors.email = 'Email is empty!';
    if (!/\S+@\S+\.\S+/.test(formData.email))
      formErrors.email = 'Email is invalid!';
    if (!formData.name) formErrors.name = 'Name and Surname users is empty!';
    return formErrors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      try {
        const token = localStorage.getItem('token');

        const response = await apiClient.addUser(formData);

        console.log('Response from backend:', response.data);

        navigate('/home/3/search');
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Axios error:', error.message);
          if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
          }
        } else {
          console.error('Unexpected error:', error);
        }
      }
    } else {
      setErrors(formErrors);
    }
  };
  const isFormValid = () => {
    return (
      Object.keys(errors).length === 0 &&
      Object.values(formData).every((value) => !!value)
    );
  };

  return (
    <form className="CreateUser" onSubmit={handleSubmit}>
      <div>
        <img src={Logo} alt="Logo" className="logo" />
        <Typography variant="h4" component="h3">
          {t('userRegisterNew')}
        </Typography>
      </div>
      <div>
        <TextField
          id="username"
          label={t('username')}
          variant="standard"
          name="username"
          value={formData.username}
          onChange={handleChange}
          error={!!errors.username}
          helperText={errors.username}
        />
      </div>
      <div>
        <TextField
          id="password"
          label={t('password')}
          variant="standard"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
        />
      </div>
      <div style={{ width: '12.5%' }}>
        <TextField
          id="role"
          label={t('role')}
          variant="standard"
          name="role"
          select
          value={formData.role}
          onChange={handleChange}
          error={!!errors.role}
          helperText={errors.role}
          style={{ width: '100%' }}
        >
          <MenuItem value="ROLE_READER">{t('user1')}</MenuItem>
          <MenuItem value="ROLE_ADMIN">Admin</MenuItem>
        </TextField>
      </div>
      <div>
        <TextField
          id="email"
          label="Email"
          variant="standard"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />
      </div>
      <div>
        <TextField
          id="name"
          label={t('nameAndSurname')}
          variant="standard"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
        />
      </div>
      <div className="Button">
        <Button type="submit" variant="contained" disabled={!isFormValid()}>
          {t('register')}
        </Button>
        <Button
          type="submit"
          variant="contained"
          onClick={() => handleMenuItemClick('/home/3')}
        >
          {t('back')}
        </Button>
      </div>
    </form>
  );
}

export default CreateUserForm;
