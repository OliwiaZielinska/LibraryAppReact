import './LoanList.css';
import './/logo.css';

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
  Box,
  IconButton,
  TableFooter,
  TablePagination,
  Typography,
  useTheme,
} from '@mui/material';
import Logo from '../book-list/logo.jpg';

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
  loan_date: string,
  return_date: string,
  termin_date: string,
  book_id: number,
  user_id: number,
) {
  return { id, loan_date, return_date, termin_date, book_id, user_id };
}

const rows = [
  createData(1, '2024-04-10', '2024-05-01', '2024-05-15', 1, 1),
  createData(2, '2024-04-12', '2024-05-03', '2024-05-17', 2, 2),
  createData(3, '2024-04-15', '2024-05-06', '2024-05-20', 3, 3),
  createData(4, '2024-04-18', '2024-05-09', '2024-05-23', 4, 4),
  createData(5, '2024-04-20', '2024-05-12', '2024-05-26', 5, 5),
  createData(6, '2024-04-22', '2024-05-15', '2024-05-29', 6, 6),
  createData(7, '2024-04-25', '2024-05-18', '2024-06-02', 7, 7),
  createData(8, '2024-04-28', '2024-05-21', '2024-06-05', 8, 8),
  createData(9, '2024-05-01', '2024-05-24', '2024-06-08', 9, 9),
  createData(10, '2024-05-03', '2024-05-27', '2024-06-10', 10, 10),
  createData(11, '2024-05-05', '2024-05-30', '2024-06-12', 11, 1),
  createData(12, '2024-05-08', '2024-06-02', '2024-06-15', 12, 2),
  createData(13, '2024-05-10', '2024-06-04', '2024-06-17', 11, 3),
  createData(14, '2024-05-13', '2024-06-06', '2024-06-19', 10, 4),
  createData(15, '2024-05-02', 'null', '2024-06-19', 10, 4),
];

export default function LoanList() {
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
      <form className="LoanList">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img src={Logo} alt="Logo" className="logo" />
          <Typography variant="h3" component="h2">
            List of loans all our readers
          </Typography>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Id</TableCell>
                <TableCell align="center">Loan&nbsp;date</TableCell>
                <TableCell align="center">Return&nbsp;date</TableCell>
                <TableCell align="center">Termin&nbsp;date</TableCell>
                <TableCell align="center">Book&nbsp;id</TableCell>
                <TableCell align="center">User&nbsp;id</TableCell>
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
                    {row.loan_date}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    {row.return_date}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    {row.termin_date}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    {row.book_id}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    {row.user_id}
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
