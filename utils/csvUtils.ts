import Papa from "papaparse";
import { saveAs } from "file-saver";

export const parseCSV = (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data.map((row: any, index: number) => ({
          id: index + 1,
          ...row,
        }));
        resolve(rows);
      },
      error: (error) => reject(error),
    });
  });
};

export const exportCSV = (rows: any[], columns: string[]) => {
  const filtered = rows.map((row) => {
    const obj: any = {};
    columns.forEach((col) => (obj[col] = row[col]));
    return obj;
  });

  const csv = Papa.unparse(filtered);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  saveAs(blob, "export.csv");
};
