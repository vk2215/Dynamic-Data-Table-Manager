"use client";

import { Provider, useSelector } from "react-redux";
import { store, RootState } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { ReactNode } from "react";

const persistor = persistStore(store);

function MyThemeProvider({ children }: { children: ReactNode }) {
  const mode = useSelector((state: RootState) => state.theme.mode);

  const theme = createTheme({
    palette: {
      mode,
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <MyThemeProvider>
              <CssBaseline />
              {children}
            </MyThemeProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
