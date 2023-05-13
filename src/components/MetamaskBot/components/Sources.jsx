import React from "react";
import { Chip, Typography } from "@mui/material";

/* eslint-disable react/prop-types */
export const Sources = (props) => {
  const { sources } = props;
  if (!sources || sources.length == 0) {
    return null;
  }

  return (
    <>
      {sources.length > 0 && (
        <Typography
          sx={{
            marginTop: "20px",
          }}
          variant="subtitle2"
          gutterBottom
        >
          {"Sources:"}
        </Typography>
      )}
      {sources.map((source, index) => (
        <Chip
          sx={{
            color: "white",
            maxWidth: "250px",
            mr: "10px",
            mb: "10px",
          }}
          key={index}
          label={source.text || source}
          color="secondary"
          onClick={() => window.open(source.link || source)}
        />
      ))}
    </>
  );
};
