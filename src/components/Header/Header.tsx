import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import UploadButton from "./UploadButton";

function Header() {
  return (
    <AppBar position="static" color="transparent" elevation={1}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
          }}
        >
          📸 Ne
          <Box
            component="span"
            sx={{
              color: "blue",
              fontStyle:"italic",
            }}
          >
            X
          </Box>
          tGallery
        </Typography>

        <UploadButton />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
