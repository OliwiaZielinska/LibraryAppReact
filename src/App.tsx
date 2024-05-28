import LoginForm from './login-form/LoginForm';
import BookList from './book-list/BookList';
import LoanList from './loan-list/LoanList';
import HomePageHome from './home-page-home/HomePageHome';

import * as React from 'react';
import HomePage from './home-page/HomePage';
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />}>
        <Route path="1" element={<BookList />} />
        <Route path="2" element={<LoanList />} />
        <Route path="" element={<HomePageHome />} />
      </Route>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/" element={<Navigate to={'/login'} />} />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
}

export default App;
