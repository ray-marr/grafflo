import { Typography } from "@mui/material";

export const Tag = ({
  children,
  color = "#146dc4", // default blue
}: {
  children: string;
  color?: string;
}) => {
  return (
    <Typography
      sx={{
        backgroundColor: color,
        color: "white",
        fontWeight: "bold",
        borderRadius: "4px",
        px: 1,
        mr: 1,
      }}
    >
      {children}
    </Typography>
  );
};
