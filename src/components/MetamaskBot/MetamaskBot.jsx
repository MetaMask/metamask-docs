import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Collapse,
  Dialog,
  Divider,
  Fade,
  IconButton,
  ThemeProvider,
} from "@mui/material";
import MessageBox from "./components/MessageBox";
import { MessageInput } from "./components/MessageInput";
import { TransitionGroup } from "react-transition-group";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { theme } from "./theme";
import { ask } from "./api/LLM";
import { DialogTransition } from "./components/DialogTransition";

export const MetamaskBot = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      ownerType: "Bot",
      text: "Hello, I'm the Metamask bot. How can i help you?",
    },
  ]);
  const messageListRef = useRef(null);

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

  /**
   * Iterate through messages and check for Expert assign changes
   */
  const getContent = () => {
    return (
      <>
        <TransitionGroup>
          {messages.map((message, index) => {
            return (
              <Collapse key={message.createdAt}>
                <Box sx={{ width: "100%", display: "inline-block" }}>
                  <MessageBox message={message} index={index} />
                </Box>
                {index + 1 < messages.length && (
                  <Divider sx={{ marginBottom: "8px" }} />
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
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        message: "Houston! There seems to be an error. Please try again.",
        type: "Bot",
      },
    ]);
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
        };
        return newMessages;
      });
    } catch (e) {
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
        >
          <Avatar
            sx={{
              bgcolor: "white",
              width: 60,
              height: 60,
            }}
            alt="Metamask Bot"
            src={useBaseUrl("/img/mm-bot.png")}
            onClick={handleOpen}
          />
        </IconButton>
      </Fade>

      <Dialog
        open={open}
        TransitionComponent={DialogTransition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          sx: {
            borderRadius: "20px",
            maxWidth: "800px",
          },
        }}
      >
        <Box
          sx={{
            width: "800px",
            backgroundColor: "white",
            padding: "1.2rem",
          }}
        >
          <Box
            ref={messageListRef}
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "rgb(233, 235, 238)",
              padding: "5px",
              marginBottom: "20px",
              borderRadius: "0.5rem",
              maxHeight: "600px",
              overflowY: "auto",
            }}
          >
            {getContent()}
          </Box>
          <MessageInput onSubmit={onSubmit} loading={loading} />
        </Box>
      </Dialog>
    </ThemeProvider>
  );
};
