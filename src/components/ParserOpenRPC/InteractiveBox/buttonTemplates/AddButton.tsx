import React from "react";

export const AddButton = (props) => {
  const { icon, iconType, ...btnProps } = props;
  return (
    <button {...btnProps}>
      Add
    </button>
  );
}
