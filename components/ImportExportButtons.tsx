"use client";

import { Button, Stack } from "@mui/material";
import Papa from "papaparse";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../redux/slices/tableSlice";
import { RootState } from "../redux/store";

export default function ImportExportButtons() {
  const dispatch = useDispatch();
  const tableData = useSelector((state: RootState) => state.table.data);

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        console.log("Parsed CSV:", results.data);

        if (Array.isArray(results.data) && results.data.length > 0) {
          const normalized = results.data.map((row: any, index: number) => {
            const normalizedRow: Record<string, any> = {};
            Object.keys(row).forEach((key) => {
              const cleanKey = key.trim().toLowerCase();
              normalizedRow[cleanKey] = row[key];
            });
            return { id: index + 1, ...normalizedRow };
          });

          console.log("Normalized Data:", normalized);
          dispatch(setData(normalized));
        } else {
          alert("⚠️ Invalid or empty CSV file.");
        }
      },
      error: (error) => {
        console.error("CSV parse error:", error);
        alert("❌ Failed to parse CSV file.");
      },
    });

    e.target.value = "";
  };

  const handleExport = () => {
    if (!tableData || tableData.length === 0) {
      alert("⚠️ No data to export!");
      return;
    }

    const csv = Papa.unparse(tableData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "exported_data.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
      <Button variant="contained" component="label" color="primary">
        IMPORT CSV
        <input type="file" accept=".csv" hidden onChange={handleImport} />
      </Button>

      <Button variant="outlined" color="primary" onClick={handleExport}>
        EXPORT CSV
      </Button>
    </Stack>
  );
}
