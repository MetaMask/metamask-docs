/* eslint-disable react/prop-types */
/* eslint-disable comma-dangle */
import React from "react";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";

export const MessageInput = ({ onSubmit, loading }) => {
  const [question, setQuestion] = useState();

  const handleInputChange = (event) => {
    setQuestion(event.target.value);
  };

  /**
   * Listens to "Enter" key
   */
  function onKeyDown(e) {
    if (e.code === "Enter") {
      onInputSubmit();
    }
  }

  function onInputSubmit() {
    if (!question) {
      return;
    }
    onSubmit(question);
    setQuestion("");
  }

  return (
    <Stack
      sx={{
        marginTop: "10px",
      }}
      direction="row"
      alignItems="center"
      justifyContent="center"
    >
      <TextField
        color="secondary"
        placeholder="Type your question"
        id="question-input"
        minRows={2}
        maxRows={8}
        multiline
        onChange={handleInputChange}
        onKeyDown={onKeyDown}
        value={question}
        disabled={loading}
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            fontSize: "16px",
            lineHeight: "20px",
            padding: "12px",
          },
        }}
      />
      <Button
        sx={{
          width: "10%",
          height: "35px",
          margin: "10px",
          textTransform: "initial",
          borderRadius: "20px",
        }}
        disabled={!question}
        color="secondary"
        variant="contained"
        data-testid="submit-message"
        onClick={() => onInputSubmit()}
        endIcon={
          loading ? (
            <CircularProgress sx={{ color: "inherit" }} size={20} />
          ) : (
            <SendIcon />
          )
        }
      >
        Ask
      </Button>
    </Stack>
  );
};
