import React from "react";

export const RemoveButton = (props) => {
  const { icon, iconType, ...btnProps } = props;
  return (
    <button {...btnProps}>
      Remove
    </button>
  );
}
