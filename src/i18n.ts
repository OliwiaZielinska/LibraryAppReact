import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          library: 'Library',
          welcome: 'Welcome in our library !',
          book: 'Book',
          loan: 'Loan',
          user: 'User',
          home: 'Home',
          username: 'Username',
          password: 'Password',
          sign: 'Sign in',
          listLoans: 'List of loans all our readers',
          loanLoanDate: 'Loan date',
          loanReturnDate: 'Return date',
          loanTerminDate: 'Termin date',
          loanBookId: 'Book id',
          loanUserId: 'User id',
          loanWhatDoYouDo: 'What do you want to do with loans ?',
          add: 'Add',
          delete: 'Delete',
          search: 'Search',
          loanAddBooksLoan: "Add book's loan",
          loanCreateLoan: 'Create loan',
          back: 'Back',
          userWhatDoYouDo: 'What do you want to do with users ?',
          userRegisterNew: 'Register a new user',
          role: 'Role',
          user1: 'User',
          nameAndSurname: 'Name and surname',
          register: 'Register',
          bookWhatDoYouDo: 'What do you want to do with books ?',
          bookAdd: 'Add book to our library',
          title: 'Title',
          author: 'Author',
          publisher: 'Publisher',
          publicationYear: 'Publication year',
          availableCopies: 'Available Copies',
          save: 'Save',
          bookList: 'List of books available in our library',
          available: 'Available',
          choose: 'Choose',
          loanId: 'Loan id',
          updateReturnDate: 'Enter return date',
          cancel: 'Cancel',
          update: 'Update',
          confirmDeleteTitle: 'Delete a book',
          confirmDeleteMessage: 'Are you sure you want to delete this book?',
          no: 'No',
          yes: 'Yes',
          actions: 'Activity',
          editBook: 'Updating book information',
        },
      },
      pl: {
        translation: {
          library: 'Biblioteka',
          welcome: 'Witamy w naszej bibliotece !',
          book: 'Książki',
          loan: 'Wypożyczenia',
          user: 'Użytkownicy',
          home: 'Strona główna',
          username: 'Nazwa użytkownika',
          password: 'Hasło',
          sign: 'Zaloguj',
          listLoans: 'Lista wypożyczeń wszystkich czytelników',
          loanLoanDate: 'Data wypożyczenia',
          loanReturnDate: 'Data zwrotu',
          loanTerminDate: 'Termin oddania',
          loanBookId: 'Id książki',
          loanUserId: 'Id użytkownika',
          loanWhatDoYouDo: 'Co chciałbyś zrobić z wypożyczeniami ?',
          add: 'Dodać',
          delete: 'Usunąć',
          search: 'Wyświetlić',
          loanAddBooksLoan: 'Dodaj wypożyczenie książki',
          loanCreateLoan: 'Dodaj wypożyczenie',
          back: 'Wróć',
          userWhatDoYouDo: 'Co chciałbyś zrobić z użytkownikami ?',
          userRegisterNew: 'Zarejestruj nowego użytkownika',
          role: 'Rola użytkownika',
          user1: 'Użytkownik',
          nameAndSurname: 'Imię i nazwisko',
          register: 'Zarejestruj',
          bookWhatDoYouDo: 'Co chciałbyś zrobić z książkami ?',
          bookAdd: 'Dodaj książkę do naszej biblioteki',
          title: 'Tytuł',
          author: 'Autor',
          publisher: 'Wydawnictwo',
          publicationYear: 'Rok wydania',
          availableCopies: 'Dostępne kopie',
          save: 'Zapisz',
          bookList: 'Lista książek dostępnych w naszej bibliotece',
          available: 'Dostępność',
          choose: 'Wybierz',
          loanId: 'Id wypożyczenia',
          updateReturnDate: 'Wprowadź datę oddania',
          cancel: 'Zamknij',
          update: 'Aktualizuj',
          confirmDeleteTitle: 'Usuwanie książki',
          confirmDeleteMessage: 'Czy na pewno chcesz usunąć tą książkę?',
          no: 'Nie',
          yes: 'Tak',
          actions: 'Aktywność',
          editBook: 'Zaktualizowanie informacji o książce',
        },
      },
    },
  });

export default i18n;
