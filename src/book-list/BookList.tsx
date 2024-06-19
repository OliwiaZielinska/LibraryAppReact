import './BookList.css';
import './SearchBook.css';
import './/logo.css';
import Logo from './/logo.jpg';

import * as React from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import {
  Autocomplete,
  Box,
  IconButton,
  TableFooter,
  TablePagination,
  TextField,
  Typography,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next';

interface Book {
  id: number;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  publicationYear: number;
  isAvailable: string;
}

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

function createData(
  id: number,
  isbn: string,
  title: string,
  author: string,
  publisher: string,
  publicationYear: number,
  isAvailable: string,
) {
  return { id, isbn, title, author, publisher, publicationYear, isAvailable };
}

export default function BookList() {
  const { t } = useTranslation();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);
  const [rows, setRows] = React.useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = React.useState<Book | null>(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [editBook, setEditBook] = React.useState<Book | null>(null);

  React.useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8081/books/getAll', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const books = response.data.map((book: Book) =>
          createData(
            book.id,
            book.isbn,
            book.title,
            book.author,
            book.publisher,
            book.publicationYear,
            book.isAvailable,
          ),
        );
        setRows(books);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteClick = (book: Book) => {
    setSelectedBook(book);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedBook(null);
  };

  const handleDeleteConfirm = async () => {
    if (selectedBook) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(
          `http://localhost:8081/books/delete/${selectedBook.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setRows(rows.filter((row) => row.id !== selectedBook.id));
        handleDialogClose();
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };

  const handleEditClick = (book: Book) => {
    setEditBook(book);
    setOpenEditDialog(true);
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
    setEditBook(null);
  };

  const handleEditConfirm = async () => {
    if (editBook) {
      try {
        const token = localStorage.getItem('token');
        await axios.patch(
          `http://localhost:8081/books/${editBook.id}`,
          editBook,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setRows(rows.map((row) => (row.id === editBook.id ? editBook : row)));
        handleEditDialogClose();
      } catch (error) {
        console.error('Error updating book:', error);
      }
    }
  };

  return (
    <div>
      <form className="BookList">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img src={Logo} alt="Logo" className="logo" />
          <Typography variant="h4" component="h3">
            {t('bookList')}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={rows.map((row) => row.title)}
            sx={{ width: 300, marginRight: 1 }}
            renderInput={(params) => (
              <TextField {...params} label={t('choose')} />
            )}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Id</TableCell>
                <TableCell align="center">ISBN</TableCell>
                <TableCell align="center">{t('title')}</TableCell>
                <TableCell align="center">{t('author')}</TableCell>
                <TableCell align="center">{t('publisher')}</TableCell>
                <TableCell align="center">{t('publicationYear')}</TableCell>
                <TableCell align="center">{t('available')}</TableCell>
                <TableCell align="center">{t('actions')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage,
                  )
                : rows
              ).map((row) => (
                <TableRow key={row.id}>
                  <TableCell style={{ width: 160 }} align="center">
                    {row.id}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    {row.isbn}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    {row.title}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    {row.author}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    {row.publisher}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    {row.publicationYear}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    {row.isAvailable ? 'Yes' : 'No'}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEditClick(row)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDeleteClick(row)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={8} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[2, 3, 4]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </form>
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t('confirmDeleteTitle')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t('confirmDeleteMessage')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirm} color="primary" autoFocus>
            {t('yes')}
          </Button>
          <Button onClick={handleDialogClose} color="primary">
            {t('no')}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
        <DialogTitle>{t('editBook')}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="ISBN"
            fullWidth
            value={editBook?.isbn || ''}
            onChange={(e) =>
              setEditBook({ ...editBook!, isbn: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label={t('title')}
            fullWidth
            value={editBook?.title || ''}
            onChange={(e) =>
              setEditBook({ ...editBook!, title: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label={t('author')}
            fullWidth
            value={editBook?.author || ''}
            onChange={(e) =>
              setEditBook({ ...editBook!, author: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label={t('publisher')}
            fullWidth
            value={editBook?.publisher || ''}
            onChange={(e) =>
              setEditBook({ ...editBook!, publisher: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label={t('publicationYear')}
            fullWidth
            type="number"
            value={editBook?.publicationYear || ''}
            onChange={(e) =>
              setEditBook({
                ...editBook!,
                publicationYear: parseInt(e.target.value),
              })
            }
          />
          <TextField
            margin="dense"
            label={t('availableCopies')}
            type="number"
            fullWidth
            value={editBook?.isAvailable || ''}
            onChange={(e) =>
              setEditBook({ ...editBook!, isAvailable: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose} color="primary">
            {t('cancel')}
          </Button>
          <Button onClick={handleEditConfirm} color="primary">
            {t('save')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
