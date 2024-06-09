import React, { useState, ChangeEvent, FormEvent } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import './CreateUserForm.css';
import Logo from './logo.jpg';
import axios from 'axios';

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
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
        const token = localStorage.getItem('token'); // Pobierz token z localStorage

        // Wysłanie danych formularza do backendu
        const response = await axios.post(
          'http://localhost:8081/auth/register',
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        // Obsługa odpowiedzi z backendu
        console.log('Response from backend:', response.data);

        // Tutaj możesz dodać obsługę sukcesu, np. wyświetlenie komunikatu potwierdzającego
      } catch (error) {
        console.error('Error creating book:', error);
        // Tutaj możesz dodać obsługę błędów, np. wyświetlenie komunikatu o błędzie
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
          Register a new user
        </Typography>
      </div>
      <div>
        <TextField
          id="username"
          label="Username"
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
          label="Password"
          variant="standard"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
        />
      </div>
      <div>
        <TextField
          id="role"
          label="Role"
          variant="standard"
          name="role"
          select
          value={formData.role}
          onChange={handleChange}
          error={!!errors.role}
          helperText={errors.role}
        >
          <MenuItem value="USER">User</MenuItem>
          <MenuItem value="ADMIN">Admin</MenuItem>
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
          label="Name and Surname"
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
          Register
        </Button>
        <Button
          type="submit"
          variant="contained"
          onClick={() => handleMenuItemClick('/home/3')}
        >
          Back
        </Button>
      </div>
    </form>
  );
}

export default CreateUserForm;
