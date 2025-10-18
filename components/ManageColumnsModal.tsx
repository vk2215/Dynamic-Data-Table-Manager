"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { toggleColumn, addColumn } from "../redux/slices/tableSlice";
import { useState } from "react";

export default function ManageColumnsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const dispatch = useDispatch();
  const { allColumns, visibleColumns } = useSelector(
    (state: RootState) => state.table
  );
  const [newCol, setNewCol] = useState("");

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Manage Columns</DialogTitle>
      <DialogContent>
        {allColumns.map((col) => (
          <FormControlLabel
            key={col}
            control={
              <Checkbox
                checked={visibleColumns.includes(col)}
                onChange={() => dispatch(toggleColumn(col))}
              />
            }
            label={col}
          />
        ))}

        <TextField
          label="Add new column"
          fullWidth
          size="small"
          sx={{ mt: 2 }}
          value={newCol}
          onChange={(e) => setNewCol(e.target.value)}
        />
        <Button
          sx={{ mt: 1 }}
          onClick={() => {
            if (newCol.trim()) {
              dispatch(addColumn(newCol.trim()));
              setNewCol("");
            }
          }}
        >
          Add
        </Button>
      </DialogContent>
    </Dialog>
  );
}
