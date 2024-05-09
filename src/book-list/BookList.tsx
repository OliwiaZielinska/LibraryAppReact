import './BookList.css';
import './SearchBook.css';
import './/logo.css';
import Logo from './/logo.jpg';

import * as React from 'react';
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
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

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

const rows = [
  createData(
    1,
    '9788373191723',
    'Zbrodnia i kara',
    'Fiodor Dostojewski',
    'Wydawnictwo Literackie',
    1866,
    'true',
  ),
  createData(
    2,
    '9788375615174',
    'Władca Pierścieni: Drużyna Pierścienia',
    'J.R.R. Tolkien',
    'Wydawnictwo Amber',
    1954,
    'true',
  ),
  createData(
    3,
    '9788324657952',
    '1984',
    'George Orwell',
    'Wydawnictwo Literackie',
    1949,
    'true',
  ),
  createData(
    4,
    '9788378391532',
    'Metro 2033',
    'Dmitrij Głuchowski',
    'Insignis Media',
    2005,
    'false',
  ),
  createData(
    5,
    '9788378007497',
    'Harry Potter i Kamień Filozoficzny',
    'J.K. Rowling',
    'Media Rodzina',
    1997,
    'true',
  ),
  createData(
    6,
    '9788374951561',
    'Lśnienie',
    'Stephen King',
    'Albatros',
    1977,
    'true',
  ),
  createData(
    7,
    '9788378395516',
    'Sto lat samotności',
    'Gabriel García Márquez',
    'Wydawnictwo Literackie',
    1967,
    'true',
  ),
  createData(
    8,
    '9788380082396',
    'Sklepik z marzeniami',
    'Stephen King',
    'Albatros',
    1993,
    'true',
  ),
  createData(
    9,
    '9788375780743',
    'Mały Książę',
    'Antoine de Saint-Exupéry',
    'Agencja Wydawnicza Jerzy Mostowski',
    1943,
    'true',
  ),
  createData(
    10,
    '9788373199149',
    'Bracia Karamazow',
    'Fiodor Dostojewski',
    'Wydawnictwo Literackie',
    1880,
    'true',
  ),
  createData(
    11,
    '9788380741202',
    'Hobbit, czyli tam i z powrotem',
    'J.R.R. Tolkien',
    'Wydawnictwo Amber',
    1937,
    'true',
  ),
  createData(
    12,
    '9788324717794',
    'Pan Tadeusz',
    'Adam Mickiewicz',
    'Zielona Sowa',
    1834,
    'true',
  ),
];

export default function BookList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
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
  return (
    <div>
      <img src={Logo} alt="Logo" className="logo" />
      <form className="BookList">
        <Typography variant="h3" component="h2">
          List of books available in our library
        </Typography>
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
            sx={{ width: 300, marginRight: 1 }} // Ustawienie marginesu dla odstępu między elementami
            renderInput={(params) => <TextField {...params} label="Search" />}
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
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Author</TableCell>
                <TableCell align="center">Publisher</TableCell>
                <TableCell align="center">Publication&nbsp;year</TableCell>
                <TableCell align="center">Available</TableCell>
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
                    {row.isAvailable}
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[3, 4, 5]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  slotProps={{
                    select: {
                      inputProps: {
                        'aria-label': 'rows per page',
                      },
                      native: true,
                    },
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
    </div>
  );
}
