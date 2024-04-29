import React, { Fragment, useState } from "react";
import { Button, Popover } from "antd";
import {
  LinkedinShareButton,
  LinkedinIcon,
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
} from "next-share";

function ShareSocialMedia({ children, link, title = "", hashtag = "" }) {
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  return (
    <Popover
      overlayClassName="share-social-media"
      content={
        <div className="share-social-media-wrapper">
          <LinkedinShareButton url={link}>
            <LinkedinIcon size={25} round />
          </LinkedinShareButton>
          <FacebookShareButton url={link} quote={title} hashtag={hashtag}>
            <FacebookIcon size={25} round />
          </FacebookShareButton>
          <TelegramShareButton url={link} title={title}>
            <TelegramIcon size={25} round />
          </TelegramShareButton>
          <TwitterShareButton url={link} title={title}>
            <TwitterIcon size={25} round />
          </TwitterShareButton>
        </div>
      }
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
      {children}
    </Popover>
  );
}

export default ShareSocialMedia;
