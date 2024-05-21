import React from "react";
import { Box, Typography } from "@mui/material";

const SummaryCard = ({ icon, label, value, color }) => {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
          backgroundColor: color,
          borderRadius: 2,
          color: "#fff",
          minWidth: 120,
          textAlign: "center",
        }}
      >
        <Box mb={1} sx={{fontSize: '2.5rem'}}>{icon}</Box>
        <Typography variant="h6">{label}</Typography>
        <Typography variant="h4">{value}</Typography>
      </Box>
    </div>
  );
};

export default SummaryCard;
