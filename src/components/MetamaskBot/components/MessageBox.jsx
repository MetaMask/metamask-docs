/* eslint-disable react/prop-types */
import React from "react";
import { Avatar, Box, Skeleton, Stack, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import useBaseUrl from "@docusaurus/useBaseUrl";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { Sources } from "./Sources";

const MessageBox = (props) => {
  const { index, message } = props;
  const isUser = message?.ownerType === "User";
  const loading = message.loading;
  const sources = message.sources || [];

  return (
    <>
      {loading ? (
        <Skeleton
          variant="rounded"
          width={"88%"}
          height={60}
          sx={{
            margin: "10px 5px",
            borderRadius: "10px",
            bgcolor: "grey.600",
          }}
        />
      ) : (
        <Stack
          key={index}
          direction={"row"}
          alignItems="center"
          gap={2}
          sx={{
            width: "88%",
            backgroundColor: isUser ? "white" : "#0d1117",
            border: isUser ? "2px solid rgb(246, 133, 27)" : "none",
            padding: "10px",
            margin: "10px 5px",
            float: isUser ? "right" : "left",
            borderRadius: "10px",
            color: isUser ? "black" : "white",
          }}
        >
          {isUser ? (
            <AccountCircleIcon sx={{ fontSize: 40 }} />
          ) : (
            <Avatar
              sx={{
                bgcolor: "white",
              }}
              alt="Metamask Bot"
              src={useBaseUrl("/img/mm-bot.png")}
            />
          )}
          {isUser ? (
            <Typography variant="body1" gutterBottom>
              {message.text}
            </Typography>
          ) : (
            <Box sx={{ width: "92%" }}>
              <MarkdownPreview
                wrapperElement={{
                  "data-color-mode": "dark",
                }}
                source={message.text}
              />
              <Sources sources={sources} />
            </Box>
          )}
        </Stack>
      )}
    </>
  );
};

export default MessageBox;
