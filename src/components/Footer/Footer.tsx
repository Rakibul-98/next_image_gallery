import { Box, Typography, Link} from '@mui/material';

function Footer() {
  return (
    <div>
      <Box
        component="footer"
        sx={{
          mt: "auto",
          py: 3,
          px: 2,
          bgcolor: "#f5f5f5",
          textAlign: "center",
        }}
      >

        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} NextGallery. All rights reserved By <Link href="https://portfolio-rakibul.netlify.app/" underline="hover">
            Rakibul Hasan
          </Link>
        </Typography>
      </Box>
    </div>
  );
}

export default Footer;
