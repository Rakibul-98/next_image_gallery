"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import UploadButton from "../UploadButton";

function Header() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    console.log("Search value:", searchValue);
  };

  return (
    <AppBar position="static" color="transparent" elevation={2} sx={{py:0.5}}>
      <Toolbar
        sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          📸 NextGallery
        </Typography>

        <Paper
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            borderRadius: "999px",
            width: { xs: "40%" },
            bgcolor: "#f0f0f0",
            boxShadow: "none",
          }}
        >
          <InputBase
            placeholder="Search images..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            sx={{ ml: 2, flex: 1 }}
            inputProps={{ "aria-label": "search images" }}
          />
          <IconButton type="submit" sx={{ p: 0.9, color:'blue' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>

        <UploadButton/>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
