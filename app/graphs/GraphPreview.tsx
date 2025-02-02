import { Box, Button, Grid2, Paper, Typography } from "@mui/material";

type props = {
  title: string;
  caption: string;
  name: string;
};

export default async function GraphPreview({ title, caption, name }: props) {
  return (
    <Box>
      <Typography sx={{ marginBottom: "8px" }} fontWeight="bold">
        {title}
      </Typography>
      <Paper elevation={3} sx={{ width: "400px", height: "300px" }}>
        <Grid2 container direction="column" spacing={2}>
          <Button href={`/graphs/${name}`}>
            <div
              style={{
                backgroundImage: `url("images/${name}.png")`,
                width: "360px",
                height: "210px",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </Button>
          <Typography variant="caption" sx={{ margin: "0 16px" }}>
            {caption}
          </Typography>
        </Grid2>
      </Paper>
    </Box>
  );
}
