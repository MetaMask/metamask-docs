import React from "react";
import { Box, Chip, Typography } from "@mui/material";

/* eslint-disable react/prop-types */
export const Sources = (props) => {
  const { sources } = props;
  if (!sources || sources.length == 0) {
    return null;
  }

  return (
    <Box sx={{
      backgroundColor: "#485377",
      padding: "4px 16px",
      marginTop: "0.5rem",
      borderRadius: "0.4rem",
      maxHeight: "110px"
    }}>
      {sources.length > 0 && (
        <Typography
          sx={{
            marginTop: "2px",
            fontSize: "small",
            fontFamily: "monospace"
          }}
          variant="subtitle2"
          gutterBottom
        >
          {"Sources:"}
        </Typography>
      )}
      <Box sx={{
        display: "flex",
        flexDirection: "row",
        maxHeight: "50px"
      }}>
        {sources.map((source, index) => (
          <Chip
            sx={{
              border: "1px solid #5a6894",
              color: "white",
              backgroundColor: "#5a6894",
              maxWidth: "250px",
              mr: "10px",
              mb: "10px",
              "&:hover": {
                border: "1px solid #5a6894",
                backgroundColor: "transparent",
                color: "#b3bad0",
              },
            }}
            key={index}
            label={source.text || source}
            color="secondary"
            onClick={() => window.open(source.link || source)}
          />
        ))}
      </Box>
    </Box>
  );
};
