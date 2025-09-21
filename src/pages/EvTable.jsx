import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  Button,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TablePagination,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEVData } from '../store/actions';

export default function EvTable() {
  const dispatch = useDispatch();
  const rows = useSelector((s) => s.data.rows);
  const status = useSelector((s) => s.data.status);
  const error = useSelector((s) => s.data.error);
  const themeMode = useSelector((s) => s.ui.themeMode); // dark/light

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEVData());
    }
  }, [dispatch, status]);

  const filteredRows = rows.filter((row) =>
    Object.values(row).some(
      (val) => val && val.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleExport = () => {
    if (!rows.length) return;
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [Object.keys(rows[0]).join(','), ...rows.map((r) => Object.values(r).join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'ev-data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (status === 'loading') return <Typography>Loading EV data...</Typography>;
  if (status === 'failed') return <Typography color="error">Error: {error}</Typography>;

  // Theme-based colors
  const headerBg = themeMode === 'dark' ? '#1f2a35' : '#e0e0e0';
  const headerColor = themeMode === 'dark' ? '#fff' : '#000';
  const rowOdd = themeMode === 'dark' ? '#2c3e50' : '#f9f9f9';
  const rowEven = themeMode === 'dark' ? '#34495e' : '#fff';
  const tableBg = themeMode === 'dark' ? '#1c2530' : '#fff';

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100vw',
        justifyContent: 'center',
        backgroundColor: themeMode === 'dark' ? '#111827' : '#f4f4f4',
        overflowX: 'auto',
        p:3
      }}
    >
      <Box sx={{ width: '90%', maxWidth: '1400px' }}>
        {/* Header + Search + Export */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
          sx={{ mb: 3 }}
        >
          <Typography variant="h5">Electric Vehicle Data</Typography>
          <Stack direction="row" spacing={1}>
            <TextField
              size="small"
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(0);
              }}
              sx={{
                backgroundColor: themeMode === 'dark' ? '#2c3e50' : '#fff',
                input: { color: themeMode === 'dark' ? '#fff' : '#000' },
              }}
            />
            <Button variant="contained" onClick={handleExport}>
              Export CSV
            </Button>
          </Stack>
        </Stack>

        {/* Table */}
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: '80vh',
            borderRadius: 2,
            boxShadow: 2,
            backgroundColor: tableBg,
            overflow: 'auto',
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': { height: 6, width: 6 },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: themeMode === 'dark' ? '#555' : '#ccc',
              borderRadius: 3,
            },
          }}
        >
          <Table stickyHeader>
            <TableHead sx={{ backgroundColor: headerBg }}>
              <TableRow>
                {Object.keys(rows[0] || {}).map((key) => (
                  <TableCell
                    key={key}
                    sx={{
                      color: headerColor,
                      fontWeight: 600,
                      borderRight: '1px solid rgba(200,200,200,0.5)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {key}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, idx) => (
                  <TableRow
                    key={idx}
                    sx={{
                      backgroundColor: idx % 2 === 0 ? rowEven : rowOdd,
                      transition: 'background-color 0.3s ease',
                      '&:hover': {
                        backgroundColor: themeMode === 'dark' ? '#3d566e' : '#eaeaea',
                      },
                    }}
                  >
                    {Object.values(row).map((val, i) => (
                      <TableCell
                        key={i}
                        sx={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          color: themeMode === 'dark' ? '#fff' : '#000',
                        }}
                        title={val}
                      >
                        {val}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={filteredRows.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]}
          sx={{
            '.MuiTablePagination-toolbar': {
              backgroundColor: themeMode === 'dark' ? '#1f2a35' : '#e0e0e0',
              color: themeMode === 'dark' ? '#fff' : '#000',
            },
          }}
        />
      </Box>
    </Box>
  );
}
