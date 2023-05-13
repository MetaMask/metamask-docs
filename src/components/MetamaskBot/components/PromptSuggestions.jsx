/* eslint-disable react/prop-types */
import React from "react";
import { Chip, Stack } from "@mui/material";
import { METAMASK_PROMPT_SUGGESTIONS } from "../constants";

export const PromptSuggestions = (props) => {
  const { onClick } = props;
  return (
    <Stack direction="row">
      {METAMASK_PROMPT_SUGGESTIONS.map((s, index) => (
        <Chip
          sx={{
            mr: "10px",
            mb: "10px",
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
