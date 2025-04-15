import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type SearchBarProps = {
    handleSearch: (e: React.FormEvent) => void;
    searchValue: string;
    setSearchValue: (value: string) => void;
  }


function SearchBar({handleSearch, searchValue, setSearchValue} : SearchBarProps) {
  return (
    <Paper
      component="form"
      onSubmit={handleSearch}
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
      <IconButton
        type="submit"
        sx={{ p: 0.9, color: "blue" }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default SearchBar;
