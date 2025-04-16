import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import ImageGrid from "@/components/ImageGrid";
import { Box } from "@mui/material";

function HomePage() {
  return (
    <div>
      <Header />
      <Box minHeight="100vh">
        <Box component="main" p={2.5}>
          <ImageGrid />
        </Box>
      </Box>
      <Footer />
    </div>
  );
}

export default HomePage;
