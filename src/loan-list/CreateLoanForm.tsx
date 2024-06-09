import React, { useState, ChangeEvent, FormEvent } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './CreateLoanForm.css';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Logo from './logo.jpg';
import axios from 'axios';

interface CreateLoanFormData {
  dueDate: string;
  userId: string;
  bookId: string;
}

interface FormErrors {
  [key: string]: string;
}

function CreateLoanForm() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  const [formData, setFormData] = useState<CreateLoanFormData>({
    dueDate: '',
    userId: '',
    bookId: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<{ name?: string; value: unknown }>,
  ) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = (): FormErrors => {
    let formErrors: FormErrors = {};
    if (!formData.dueDate) formErrors.dueDate = 'Due date is empty!';
    if (new Date(formData.dueDate) <= new Date())
      formErrors.dueDate = 'Due date must be in the future!';
    if (!formData.userId) formErrors.userId = 'User id is empty!';
    if (!formData.bookId) formErrors.bookId = 'Book id is empty!';
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
          'http://localhost:8081/loans/create',
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
    <form className="CreateLoan" onSubmit={handleSubmit}>
      <div>
        <img src={Logo} alt="Logo" className="logo" />
        <Typography variant="h4" component="h3">
          Add book's loan
        </Typography>
      </div>
      <div>
        <TextField
          id="dueDate"
          label="Due Date"
          variant="standard"
          type="date"
          name="dueDate"
          InputLabelProps={{ shrink: true }}
          value={formData.dueDate}
          onChange={handleChange}
          error={!!errors.dueDate}
          helperText={errors.dueDate}
        />
      </div>
      <div>
        <TextField
          id="userId"
          label="User ID"
          variant="standard"
          name="userId"
          type="number"
          value={formData.userId}
          onChange={handleChange}
          error={!!errors.userId}
          helperText={errors.userId}
        />
      </div>
      <div>
        <TextField
          id="bookId"
          label="Book ID"
          variant="standard"
          name="bookId"
          type="number"
          value={formData.bookId}
          onChange={handleChange}
          error={!!errors.bookId}
          helperText={errors.bookId}
        />
      </div>
      <div className="Button">
        <Button type="submit" variant="contained" disabled={!isFormValid()}>
          Create loan
        </Button>
        <Button
          type="submit"
          variant="contained"
          onClick={() => handleMenuItemClick('/home/2')}
        >
          Back
        </Button>
      </div>
    </form>
  );
}

export default CreateLoanForm;
