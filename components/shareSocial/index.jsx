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
  EmailShareButton,
} from "next-share";
import Image from "next/future/image";

import linkedin_icon from "../../public/images/linkedin/Linkedin.svg";
import facebook_icon from "../../public/images/linkedin/Facebook.svg";
import email_icon from "../../public/images/linkedin/Email.svg";
import twitter_icon from "../../public/images/linkedin/X - jpeg.svg";
import myImageLoader from "../imageLoader";

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
            <Image
              loader={myImageLoader}
              style={{ borderRadius: "2px" }}
              width={25}
              height={25}
              preview="false"
              src={linkedin_icon}
              alt="share on linked"
              name="linked icon"
            />
          </LinkedinShareButton>
          <FacebookShareButton url={link} quote={title} hashtag={hashtag}>
            <Image
              loader={myImageLoader}
              style={{ borderRadius: "2px" }}
              width={25}
              height={25}
              preview="false"
              src={facebook_icon}
              alt="share on facebook"
              name="facebook icon"
            />
          </FacebookShareButton>
          <EmailShareButton url={link}  subject={title}>
            <Image
              loader={myImageLoader}
              style={{ borderRadius: "2px" }}
              width={25}
              height={25}
              preview="false"
              src={email_icon}
              alt="share on email"
              name="email icon"
            />
          </EmailShareButton>
          <TwitterShareButton url={link} title={title}>
            <Image
              loader={myImageLoader}
              style={{ borderRadius: "2px" }}
              width={25}
              height={25}
              preview="false"
              src={twitter_icon}
              alt="share on twitter"
              name="twitter icon"
            />
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
