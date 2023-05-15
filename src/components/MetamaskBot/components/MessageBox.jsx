/* eslint-disable react/prop-types */
import React from "react";
import { Avatar, Box, Skeleton, Stack, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import useBaseUrl from "@docusaurus/useBaseUrl";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { Sources } from "./Sources";

const MessageBox = (props) => {
  const { index, message, fullScreen } = props;
  const isUser = message?.ownerType === "User";
  const loading = message.loading;
  const sources = message.sources || [];

  return (
    <>
      {loading ? (
        <Skeleton
          variant="rounded"
          width={fullScreen ? "95%" : "88%"}
          height={64}
          sx={{
            margin: fullScreen ? "0px" : "5px",
            borderRadius: "10px",
            bgcolor: "grey.600",
          }}
        />
      ) : (
        <Stack
          key={index}
          direction={"row"}
          alignItems="flex-start"
          gap={fullScreen ? 1 : 2}
          sx={{
            width: fullScreen ? "95%" : "88%",
            backgroundColor: isUser ? "#6895b4" : "#5a6894",
            padding: "12px",
            margin: fullScreen ? "0px" : "5px",
            float: isUser ? "right" : "left",
            borderRadius: "10px",
            color: "white",
          }}
        >
          {isUser ? (
            <AccountCircleIcon sx={{ fontSize: 40 }} />
          ) : (
            <Avatar
              sx={{
                bgcolor: "white",
              }}
              alt="MetaMask Bot"
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
