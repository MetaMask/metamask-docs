import React from "react";
import Icon from "@site/src/components/Icon/Icon";
import { MSG_TYPES } from "@site/src/lib/constants";

const MessageBox = ({ opened, type, title, description }) => {
  if (!opened) {
    return null;
  }
  const renderIcon = () => {
    switch (type) {
      case MSG_TYPES.ERROR:
        return <Icon name="alert-error" />;
      case MSG_TYPES.SUCCESS:
        return <Icon name="alert-success" />;
      default:
        return <Icon name="alert-info" />;
    }
  };

  return (
    <div className={`message-box ${type}`}>
      <div className="message-box-heading">
        {renderIcon()}
        <strong>{title}</strong>
      </div>
      <div className="message-box-body">{description}</div>
    </div>
  );
};

export default MessageBox;
