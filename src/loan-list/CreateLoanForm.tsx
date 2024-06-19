import React, { useState, ChangeEvent, FormEvent } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './CreateLoanForm.css';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Logo from './logo.jpg';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useApi } from '../api/ApiProvider';

interface CreateLoanFormData {
  dueDate: string;
  userId: string;
  bookId: string;
}

interface FormErrors {
  [key: string]: string;
}

function CreateLoanForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const apiClient = useApi();

  const [formData, setFormData] = useState<CreateLoanFormData>({
    dueDate: '',
    userId: '',
    bookId: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>,
  ) => {
    if ('target' in e) {
      const { name, value } = e.target as HTMLInputElement;
      setFormData({ ...formData, [name]: value });
    } else {
      console.error('Unsupported event type');
      // Handle unsupported event type scenario if needed
    }
  };

  const validateForm = (): FormErrors => {
    let formErrors: FormErrors = {};
    if (!formData.dueDate) formErrors.dueDate = 'Due date is empty!';
    if (new Date(formData.dueDate) <= new Date())
      formErrors.dueDate = 'Due date must be in the future!';
    if (!formData.userId) formErrors.userId = 'User ID is empty!';
    if (!formData.bookId) formErrors.bookId = 'Book ID is empty!';
    return formErrors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      try {
        const token = localStorage.getItem('token');

        const response = await apiClient.addLoans(formData);

        console.log('Response from backend:', response.data);

        navigate('/home/2/search');
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
    <form className="CreateLoan" onSubmit={handleSubmit}>
      <div>
        <img src={Logo} alt="Logo" className="logo" />
        <Typography variant="h4" component="h3">
          {t('loanAddBooksLoan')}
        </Typography>
      </div>
      <div>
        <TextField
          id="dueDate"
          label={t('loanTerminDate')}
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
          label={t('loanUserId')}
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
          label={t('loanBookId')}
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
          {t('loanCreateLoan')}
        </Button>
        <Button
          type="button"
          variant="contained"
          onClick={() => navigate('/home/2')}
        >
          {t('back')}
        </Button>
      </div>
    </form>
  );
}

export default CreateLoanForm;
