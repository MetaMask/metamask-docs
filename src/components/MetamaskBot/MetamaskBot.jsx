import React, { Fragment, useEffect, useRef, useState } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";

import { theme } from "./theme";
import MessageBox from "./components/MessageBox";
import { MessageInput } from "./components/MessageInput";
import { TransitionGroup } from "react-transition-group";
import { DialogTransition } from "./components/DialogTransition";
import {
  Avatar,
  Box,
  Collapse,
  Dialog,
  Divider,
  Fade,
  IconButton,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";

import { ask } from "./api/LLM";
import { INITIAL_BOT_MESSAGE } from "./constants";
import { ResetButton } from "./components/ResetButton";
import { PromptSuggestions } from "./components/PromptSuggestions";
import CloseIcon from "@mui/icons-material/Close";

export const MetamaskBot = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([INITIAL_BOT_MESSAGE]);
  const messageListRef = useRef(null);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    scrollToBottom();
  }, [loading]);
  const scrollToBottom = async () => {
    // Ugly hack, but well.. this is a hackathon!
    await delay(200);
    const messageList = messageListRef.current;
    if (!messageList) {
      return;
    }

    messageList.scrollTop = messageList.scrollHeight;
  };

  const resetChat = () => {
    setMessages([INITIAL_BOT_MESSAGE]);
  };

  const onPromptSuggestion = (question) => {
    onSubmit(question);
  };

  /**
   * Iterate through messages and check for Expert assign changes
   */
  const getContent = () => {
    return (
      <>
        <TransitionGroup>
          {messages.map((message, index) => {
            return (
              <Collapse key={message.createdAt} sx={{ width: "100%", display: "inline-block" }}>
                <Box sx={{ width: "100%", display: "inline-block" }}>
                  <MessageBox
                    fullScreen={fullScreen}
                    message={message}
                    index={index}
                  />
                </Box>
                {index + 1 < messages.length && (
                  <Divider sx={{ marginBottom: "8px", backgroundColor: "#444444" }} />
                )}
              </Collapse>
            );
          })}
        </TransitionGroup>
      </>
    );
  };

  // Handle errors
  const handleError = () => {
    setMessages((prevMessages) => {
      let newMessages = [...prevMessages];
      newMessages[prevMessages.length - 1] = {
        text: "Houston! There seems to be an error. Please try again.",
        ownerType: "Bot",
      };
      return newMessages;
    });

    setLoading(false);
  };

  const onSubmit = async (question) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: question, ownerType: "User" },
      { loading: true, ownerType: "Bot" },
    ]);
    try {
      setLoading(true);

      const data = await ask(question);
      if (!data.ok) {
        handleError();
        return;
      }

      delay(10000);

      setMessages((prevMessages) => {
        let newMessages = [...prevMessages];
        newMessages[prevMessages.length - 1] = {
          text: data.answer.text || data.answer,
          ownerType: "Bot",
          sources: data.sources,
        };
        return newMessages;
      });
    } catch (e) {
      handleError();
      console.error(e);
    }

    setLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Fade exit={false} in={!open}>
        <IconButton
          color="secondary"
          disableTouchRipple
          sx={{ position: "fixed", right: "2rem", bottom: "1rem" }}
          onClick={handleOpen}
        >
          <Avatar
            sx={{
              bgcolor: "white",
              width: 60,
              height: 60,
            }}
            alt="Metamask Bot"
            src={useBaseUrl("/img/mm-bot.png")}
          />
        </IconButton>
      </Fade>

      <Dialog
        open={open}
        fullScreen={fullScreen}
        TransitionComponent={DialogTransition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          sx: {
            borderRadius: "20px",
            minWidth: fullScreen ? "100%" : "800px",
          },
        }}
      >
        {fullScreen && (
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              color: (theme) => theme.palette.grey[500],
              zIndex: 1,
              top: 0,
              left: 0,
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
        <Box
          sx={{
            width: "100%",
            backgroundColor: "white",
            padding: fullScreen ? "0.2rem" : "1.2rem",
            marginTop: fullScreen ? "40px" : "0px",
          }}
        >
          <Box
            ref={messageListRef}
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#2e2e2e",
              padding: "4px",
              marginBottom: "20px",
              borderRadius: "0.4rem",
              maxHeight: "600px",
              overflowY: "auto",
            }}
          >
            {getContent()}
            <ResetButton
              fullScreen={fullScreen}
              onClick={resetChat}
              disabled={loading}
            />
            {messages.length === 1 && (
              <PromptSuggestions
                fullScreen={fullScreen}
                onClick={onPromptSuggestion}
              />
            )}
          </Box>
          <MessageInput onSubmit={onSubmit} loading={loading} />
        </Box>
      </Dialog>
    </ThemeProvider>
  );
};
