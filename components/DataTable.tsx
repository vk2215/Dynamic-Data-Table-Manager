"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TextField,
  TableSortLabel,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import {
  setSort,
  setPage,
  setSearchTerm,
  updateRow,
  deleteRow,
} from "../redux/slices/tableSlice";

export default function DataTable() {
  const dispatch = useDispatch();
  const {
    data = [],
    visibleColumns = [],
    sortColumn,
    sortDirection,
    searchTerm = "",
    currentPage = 1,
    rowsPerPage = 10,
  } = useSelector((state: RootState) => state.table);

  const filtered = data.filter((row) =>
    Object.values(row || {}).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sorted = [...filtered].sort((a, b) => {
    if (!sortColumn) return 0;
    const aVal = a[sortColumn] ?? "";
    const bVal = b[sortColumn] ?? "";
    if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
    if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginated = sorted.slice(startIndex, startIndex + rowsPerPage);

  const [editingRows, setEditingRows] = useState<Record<string, boolean>>({});
  const [tempRows, setTempRows] = useState<Record<string, any>>({});

  const handleDoubleClick = (rowId: string) => {
    setEditingRows((prev) => ({ ...prev, [rowId]: true }));
    const row = data.find((r) => r.id === rowId);
    if (row) setTempRows((prev) => ({ ...prev, [rowId]: { ...row } }));
  };

  const handleCellChange = (rowId: string, column: string, value: any) => {
    setTempRows((prev) => ({
      ...prev,
      [rowId]: { ...prev[rowId], [column]: value },
    }));
  };

  const saveRow = (rowId: string) => {
    dispatch(updateRow(tempRows[rowId]));
    setEditingRows((prev) => ({ ...prev, [rowId]: false }));
  };

  const cancelRow = (rowId: string) => {
    setEditingRows((prev) => ({ ...prev, [rowId]: false }));
  };

  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    rowId?: string;
  }>({ open: false });
  const confirmDelete = (rowId: string) =>
    setDeleteDialog({ open: true, rowId });
  const handleDelete = () => {
    if (deleteDialog.rowId) dispatch(deleteRow(deleteDialog.rowId));
    setDeleteDialog({ open: false });
  };

  const handleSort = (column: string) => {
    const direction =
      sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    dispatch(setSort({ column, direction }));
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    dispatch(setPage(newPage + 1));
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TextField
        variant="outlined"
        fullWidth
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        sx={{ my: 2 }}
      />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {visibleColumns.map((col) => (
                <TableCell key={col}>
                  <TableSortLabel
                    active={sortColumn === col}
                    direction={sortDirection}
                    onClick={() => handleSort(col)}
                  >
                    {col}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginated.map((row) => {
              const isEditing = editingRows[row.id];
              return (
                <TableRow key={row.id}>
                  {visibleColumns.map((col) => (
                    <TableCell
                      key={`${row.id}-${col}`}
                      onDoubleClick={() => handleDoubleClick(row.id)}
                    >
                      {isEditing ? (
                        <TextField
                          value={tempRows[row.id][col]}
                          onChange={(e) =>
                            handleCellChange(row.id, col, e.target.value)
                          }
                          size="small"
                        />
                      ) : (
                        row[col]
                      )}
                    </TableCell>
                  ))}

                  <TableCell>
                    {isEditing ? (
                      <>
                        <Button onClick={() => saveRow(row.id)} size="small">
                          Save
                        </Button>
                        <Button onClick={() => cancelRow(row.id)} size="small">
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <IconButton
                          onClick={() => handleDoubleClick(row.id)}
                          size="small"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => confirmDelete(row.id)}
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filtered.length}
        page={currentPage - 1}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[10]}
      />

      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false })}
      >
        <DialogTitle>Are you sure you want to delete this row?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false })}>
            Cancel
          </Button>
          <Button color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
