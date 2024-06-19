import React, { useState, ChangeEvent, FormEvent } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './CreateBookForm.css';
import { Typography } from '@mui/material';
import Logo from './logo.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useApi } from '../api/ApiProvider';
import { useTranslation } from 'react-i18next';

interface CreateBookFormData {
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  publicationYear: string;
  availabledCopies: string;
}

interface FormErrors {
  [key: string]: string;
}

function CreateBookForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const apiClient = useApi();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [formData, setFormData] = useState<CreateBookFormData>({
    isbn: '',
    title: '',
    author: '',
    publisher: '',
    publicationYear: '',
    availabledCopies: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    return (
      Object.keys(errors).length === 0 &&
      Object.values(formData).every((value) => !!value)
    );
  };

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  const validateForm = (): FormErrors => {
    let formErrors: FormErrors = {};
    if (!formData.isbn) formErrors.isbn = 'ISBN is empty!';
    if (!formData.title) formErrors.title = 'Title is empty!';
    if (!formData.author) formErrors.author = 'Author is empty!';
    if (!formData.publisher) formErrors.publisher = 'Publisher is empty!';
    if (!formData.publicationYear)
      formErrors.publicationYear = 'Publication year is empty!';
    if (!formData.availabledCopies)
      formErrors.availabledCopies = 'Availabled copies is empty!';
    if (Number(formData.availabledCopies) < 0)
      formErrors.availabledCopies = 'Availabled copies cannot be negative!';
    return formErrors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      try {
        const token = localStorage.getItem('token'); // Pobierz token z localStorage
        console.log(
          'Sending request to backend with payload:',
          JSON.stringify(formData, null, 2),
        );
        const response = await apiClient.addBooks(formData);
        console.log('Received response from backend:', response);

        // Redirect to book list
        navigate('/home/1/search');
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

  return (
    <form className="CreateBook" onSubmit={handleSubmit}>
      <div>
        <img src={Logo} alt="Logo" className="logo" />
        <Typography variant="h4" component="h3">
          {t('bookAdd')}
        </Typography>
      </div>
      <div>
        <TextField
          id="isbn"
          label="ISBN"
          variant="standard"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          error={!!errors.isbn}
          helperText={errors.isbn}
        />
      </div>
      <div>
        <TextField
          id="title"
          label={t('title')}
          variant="standard"
          name="title"
          value={formData.title}
          onChange={handleChange}
          error={!!errors.title}
          helperText={errors.title}
        />
      </div>
      <div>
        <TextField
          id="author"
          label={t('author')}
          variant="standard"
          name="author"
          value={formData.author}
          onChange={handleChange}
          error={!!errors.author}
          helperText={errors.author}
        />
      </div>
      <div>
        <TextField
          id="publisher"
          label={t('publisher')}
          variant="standard"
          name="publisher"
          value={formData.publisher}
          onChange={handleChange}
          error={!!errors.publisher}
          helperText={errors.publisher}
        />
      </div>
      <div>
        <TextField
          id="publicationYear"
          label={t('publicationYear')}
          variant="standard"
          name="publicationYear"
          type="number"
          value={formData.publicationYear}
          onChange={handleChange}
          error={!!errors.publicationYear}
          helperText={errors.publicationYear}
        />
      </div>
      <div>
        <TextField
          id="availabledCopies"
          label={t('availableCopies')}
          variant="standard"
          name="availabledCopies"
          type="number"
          value={formData.availabledCopies}
          onChange={handleChange}
          error={!!errors.availabledCopies}
          helperText={errors.availabledCopies}
        />
      </div>
      <div className="Button">
        <Button type="submit" variant="contained" disabled={!isFormValid()}>
          {t('save')}
        </Button>
        <Button
          type="submit"
          variant="contained"
          onClick={() => handleMenuItemClick('/home/1')}
        >
          {t('back')}
        </Button>
      </div>
    </form>
  );
}

export default CreateBookForm;
