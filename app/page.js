'use client';

import { TextField } from "@mui/material";
import { Stack } from "expo-router";
import { useState } from "react";

export default function Home() {

  const [messages, setMessages] = useState([
    {
      role: "assisstant",
      content:
        "Hello, I'm the Headstarter support assistant. How can I help you?",
    },
  ]);

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
    >
      <Stack direction={"column"}>
        <Stack direction={"column"} spacing={2}>
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                message.role === "assistnat" ? "flex-start" : "flex-end"
              }
            >
              <Box
                bgcolor={
                  message.role === "assistant" ? "primary.main" : "second.main"
                }
                color="white"
                borderRadius={16}
                p={2}
              >
                {message.content}
              </Box>
            </Box>
          ))}
        </Stack>
      </Stack>
      <Stack direction='row' spacing={2}>
          <TextField label="Message" fullWidth />
          <Button variant="contained">Send</Button>
      </Stack>
    </Box>
  );
}
