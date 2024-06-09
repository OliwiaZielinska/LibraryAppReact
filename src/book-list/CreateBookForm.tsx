import React, { useState, ChangeEvent, FormEvent } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './CreateBookForm.css';
import { Typography } from '@mui/material';
import Logo from './logo.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useApi } from '../api/ApiProvider';

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

        // Wysłanie danych formularza do backendu
        const response = await axios.post(
          'http://localhost:8081/books/create',
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

  return (
    <form className="CreateBook" onSubmit={handleSubmit}>
      <div>
        <img src={Logo} alt="Logo" className="logo" />
        <Typography variant="h4" component="h3">
          Add book to our library
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
          label="Title"
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
          label="Author"
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
          label="Publisher"
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
          label="Publication Year"
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
          label="Available Copies"
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
          Save
        </Button>
        <Button
          type="submit"
          variant="contained"
          onClick={() => handleMenuItemClick('/home/1')}
        >
          Back
        </Button>
      </div>
    </form>
  );
}

export default CreateBookForm;
