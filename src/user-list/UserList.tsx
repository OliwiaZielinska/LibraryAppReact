import './UserList.css';
import './SearchUser.css';
import './logo.css';
import Logo from './logo.jpg';

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

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  role: string;
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
  name: string,
  email: string,
  username: string,
  role: string,
) {
  return { id, name, email, username, role };
}

export default function UserList() {
  const { t } = useTranslation();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);
  const [rows, setRows] = React.useState<User[]>([]);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [editUser, setEditUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8081/auth/getAll', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const users = response.data.map((user: User) =>
          createData(
            user.id,
            user.name,
            user.email,
            user.username,
            user.role.toString(),
          ),
        );
        setRows(users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
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

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  const handleDeleteConfirm = async () => {
    if (selectedUser) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(
          `http://localhost:8081/auth/delete/${selectedUser.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setRows(rows.filter((row) => row.id !== selectedUser.id));
        handleDialogClose();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleEditClick = (user: User) => {
    setEditUser(user);
    setOpenEditDialog(true);
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
    setEditUser(null);
  };

  const handleEditConfirm = async () => {
    if (editUser) {
      try {
        const token = localStorage.getItem('token');
        await axios.patch(
          `http://localhost:8081/auth/${editUser.id}`,
          editUser,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setRows(rows.map((row) => (row.id === editUser.id ? editUser : row)));
        handleEditDialogClose();
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };

  return (
    <div>
      <form className="UserList">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img src={Logo} alt="Logo" className="logo" />
          <Typography variant="h4" component="h3">
            {t('userList')}
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
            options={rows.map((row) => row.username)}
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
                <TableCell align="center">{t('nameAndSurname')}</TableCell>
                <TableCell align="center">{t('email')}</TableCell>
                <TableCell align="center">{t('username')}</TableCell>
                <TableCell align="center">{t('role')}</TableCell>
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
                    {row.name}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    {row.email}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    {row.username}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    {row.role}
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
        <DialogTitle id="alert-dialog-title">{t('confirmDelete')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t('confirmDeleteMessageUser')}
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
        <DialogTitle>{t('editUser')}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="id"
            fullWidth
            value={editUser?.id || ''}
            onChange={(e) => {
              setEditUser({ ...editUser!, id: parseInt(e.target.value) });
            }}
          />
          <TextField
            margin="dense"
            label={t('nameAndSurname')}
            fullWidth
            value={editUser?.name || ''}
            onChange={(e) =>
              setEditUser({ ...editUser!, name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label={t('email')}
            fullWidth
            value={editUser?.email || ''}
            onChange={(e) =>
              setEditUser({ ...editUser!, email: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label={t('username')}
            fullWidth
            value={editUser?.username || ''}
            onChange={(e) =>
              setEditUser({ ...editUser!, username: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label={t('role')}
            fullWidth
            value={editUser?.role || ''}
            onChange={(e) =>
              setEditUser({
                ...editUser!,
                role: e.target.value,
              })
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
