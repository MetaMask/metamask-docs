/* eslint-disable react/prop-types */
import React from "react";
import { Chip, Stack } from "@mui/material";
import { METAMASK_PROMPT_SUGGESTIONS } from "../constants";

export const PromptSuggestions = (props) => {
  const { onClick } = props;
  return (
    <Stack direction="row" sx={{
      padding: "6px"
    }}>
      {METAMASK_PROMPT_SUGGESTIONS.map((s, index) => (
        <Chip
          sx={{
            mr: "10px",
            mb: "10px",

            border: "1px solid #555555",
            color: "white",
            backgroundColor: "#555555",
            maxWidth: "250px",
            mr: "10px",
            mb: "10px",
            "&:hover": {
              border: "1px solid #555555",
              backgroundColor: "transparent",
              color: "#ADADAD",
            },
          }}
          key={index}
          label={s}
          color="secondary"
          variant="outlined"
          onClick={() => onClick(s)}
        />
      ))}
    </Stack>
  );
};
