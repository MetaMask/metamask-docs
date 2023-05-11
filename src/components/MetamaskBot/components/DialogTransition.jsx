/* eslint-disable comma-dangle */
import { Fade } from "@mui/material";
import React from "react";

export const DialogTransition = React.forwardRef(function Transition(
  props,
  ref
) {
  return (
    <Fade
      timeout={{
        enter: 800,
      }}
      direction="up"
      ref={ref}
      {...props}
    />
  );
});
