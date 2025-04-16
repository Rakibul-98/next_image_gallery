import { Grid, Skeleton } from "@mui/material";
import React from "react";

function LoadingSkeleton() {
  return (
    <div>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: "space-evenly", mt: "10px" }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i}>
            <Skeleton
              variant="rectangular"
              width={200}
              height={200}
              sx={{
                borderRadius: "4px",
                bgcolor: "grey.200",
              }}
            />
          </div>
        ))}
      </Grid>
    </div>
  );
}

export default LoadingSkeleton;
