import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { CloudinaryImage } from "@/components/ImageGrid";

type SearchBarProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setImages: React.Dispatch<React.SetStateAction<CloudinaryImage[]>>;
  setNextCursor: React.Dispatch<React.SetStateAction<string | null>>;
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
  setHasInitialLoad: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

function SearchBar({
  search,
  setSearch,
  setImages,
  setNextCursor,
  setHasMore,
  setHasInitialLoad,
  setSearchQuery,
}: SearchBarProps) {
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setImages([]);
    setNextCursor(null);
    setHasMore(true);
    setHasInitialLoad(false);
    setSearchQuery(search);
    setSearch("");
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSearch}
      sx={{
        display: "flex",
        alignItems: "center",
        borderRadius: "999px",
        width: { xs: "60%", sm: "50%", md: "30%" },
        bgcolor: "#f0f0f0",
        boxShadow: "none",
      }}
    >
      <InputBase
        placeholder="Search here... (example 'cat')"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          ml: 2,
          flex: 1,
          "& input::placeholder": {
            fontSize: "0.85rem",
          },
        }}
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
