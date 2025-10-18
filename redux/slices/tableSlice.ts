import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TableState {
  data: any[];
  allColumns: string[];
  visibleColumns: string[];
  sortColumn: string | null;
  sortDirection: "asc" | "desc";
  searchTerm: string;
  currentPage: number;
  rowsPerPage: number;
}

const initialState: TableState = {
  data: [],
  allColumns: [],
  visibleColumns: [],
  sortColumn: null,
  sortDirection: "asc",
  searchTerm: "",
  currentPage: 1,
  rowsPerPage: 10,
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<any[]>) {
      state.data = action.payload;
      if (state.visibleColumns.length === 0 && action.payload.length > 0) {
        state.visibleColumns = Object.keys(action.payload[0]);
      }
    },
    setVisibleColumns(state, action: PayloadAction<string[]>) {
      state.visibleColumns = action.payload;
    },
    addColumn(state, action: PayloadAction<string>) {
      const newColumn = action.payload;
      if (!state.visibleColumns.includes(newColumn)) {
        state.visibleColumns.push(newColumn);
        state.data = state.data.map((row) => ({
          ...row,
          [newColumn]: row[newColumn] ?? "",
        }));
      }
    },
    toggleColumn(state, action: PayloadAction<string>) {
      const column = action.payload;
      if (state.visibleColumns.includes(column)) {
        state.visibleColumns = state.visibleColumns.filter((c) => c !== column);
      } else {
        state.visibleColumns.push(column);
      }
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    setSort(
      state,
      action: PayloadAction<{ column: string; direction: "asc" | "desc" }>
    ) {
      state.sortColumn = action.payload.column;
      state.sortDirection = action.payload.direction;
    },
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setRowsPerPage(state, action: PayloadAction<number>) {
      state.rowsPerPage = action.payload;
    },

    updateRow(state, action: PayloadAction<any>) {
      const updatedRow = action.payload;
      const index = state.data.findIndex((row) => row.id === updatedRow.id);
      if (index !== -1) {
        state.data[index] = updatedRow;
      }
    },

    deleteRow(state, action: PayloadAction<string>) {
      state.data = state.data.filter((row) => row.id !== action.payload);
    },
  },
});

export const {
  setData,
  setVisibleColumns,
  addColumn,
  toggleColumn,
  setSearchTerm,
  setSort,
  setPage,
  setRowsPerPage,
  updateRow,
  deleteRow,
} = tableSlice.actions;

export default tableSlice.reducer;
