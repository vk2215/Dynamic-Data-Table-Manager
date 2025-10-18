"use client";

import DataTable from "../components/DataTable";
import ManageColumnsModal from "../components/ManageColumnsModal";
import ImportExportButtons from "../components/ImportExportButtons";
import ThemeToggle from "../components/ThemeToggle";
import { Box, Typography } from "@mui/material";
import { useState } from "react";

export default function HomePage() {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dynamic Data Table
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <ImportExportButtons />
        <ThemeToggle />
        <button onClick={() => setOpen(true)}>Manage Columns</button>
      </Box>

      <DataTable />
      <ManageColumnsModal open={open} onClose={() => setOpen(false)} />
    </Box>
  );
}
