"use client";

import { AppBar, Toolbar, Typography, Snackbar, Alert} from "@mui/material";
import { useState } from "react";
import UploadButton from "../UploadButton";
import SearchBar from "./SearchBar/SearchBar";

function Header() {
  const [searchValue, setSearchValue] = useState("");
  const [showEmptyError, setShowEmptyError] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedValue = searchValue.trim();
    if (!trimmedValue) {
      setShowEmptyError(true);
      return;
    }

    console.log("Search value:", trimmedValue);
    setSearchValue("");
  };

  const handleCloseError = () => {
    setShowEmptyError(false);
  };

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={1}
      sx={{ py: 0.5 }}
    >
      <Toolbar
        sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          📸 NextGallery
        </Typography>

        <SearchBar handleSearch={handleSearch} searchValue={searchValue} setSearchValue={setSearchValue} />

        <UploadButton />
        <Snackbar
          open={showEmptyError}
          autoHideDuration={2000}
          onClose={handleCloseError}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseError}
            severity="warning"
            sx={{ width: "100%" }}
          >
            Please enter a search term
          </Alert>
        </Snackbar>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
