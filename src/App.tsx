import LoginForm from './login-form/LoginForm';
import LoanList from './loan-list/LoanList';
import HomePageHome from './home-page-home/HomePageHome';

import * as React from 'react';
import HomePage from './home-page/HomePage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ApiProvider from './api/ApiProvider';
import HomeBook from './book-list/HomeBook';
import BookList from './book-list/BookList';
import HomeLoan from './loan-list/HomeLoan';
import HomeUser from './user-list/HomeUser';
import UserList from './user-list/UserList';
import CreateBookForm from './book-list/CreateBookForm';
import CreateUserForm from './user-list/CreateUserForm';
import CreateLoanForm from './loan-list/CreateLoanForm';
import i18n from 'i18next';
import { I18nextProvider } from 'react-i18next';

function App() {
  return (
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <ApiProvider>
          <Routes>
            <Route path="/home" element={<HomePage />}>
              <Route path="1" element={<HomeBook />} />
              <Route path="1/search" element={<BookList />} />
              <Route path="1/create" element={<CreateBookForm />} />
              <Route path="2" element={<HomeLoan />} />
              <Route path="2/search" element={<LoanList />} />
              <Route path="2/create" element={<CreateLoanForm />} />
              <Route path="3" element={<HomeUser />} />
              <Route path="3/create" element={<CreateUserForm />} />
              <Route path="3/search" element={<UserList />} />
              <Route path="" element={<HomePageHome />} />
            </Route>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/" element={<Navigate to={'/login'} />} />
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </ApiProvider>
      </I18nextProvider>
    </BrowserRouter>
  );
}

export default App;
