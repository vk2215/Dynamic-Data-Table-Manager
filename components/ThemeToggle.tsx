"use client";

import { Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/slices/themeSlice";
import { RootState } from "../redux/store";

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);

  return (
    <Switch
      checked={mode === "dark"}
      onChange={() => dispatch(toggleTheme())}
      inputProps={{ "aria-label": "theme toggle" }}
    />
  );
}
