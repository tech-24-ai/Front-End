import React, { Component, Fragment } from "react";
import { Container, Col, Row } from "reactstrap";
import { Icon } from "react-icons-kit";
import { socialTwitter } from "react-icons-kit/ionicons/socialTwitter";
import { socialLinkedin } from "react-icons-kit/ionicons/socialLinkedin";
import { linkedin, twitter } from "react-icons-kit/fa";

import Link from "next/link";
import { connect } from "react-redux";
import { isMobile, isBrowser } from "react-device-detect";
import { useLayoutEffect, useEffect } from "react";

import LinkedinIcon from "../../public/images/header/Linkedin-icon.svg";
import myImageLoader from "../imageLoader";
import Image from "next/image";
import LogoNew from "../../public/new_images/tech24_header_logo_black.svg";
import InstaIcon from "../../public/new_images/instagram.svg";
import GlobIcon from "../../public/new_images/glob.svg";
import TwitterIcon from "../../public/new_images/twitter.svg";
import YoutubeIcon from "../../public/new_images/youtube.svg";
import themeConfig from "../../config/themeConfig";
import x_logo from "../../public/new_images/x_logo.svg";
import instagram_logo from "../../public/new_images/instagram_logo.svg";
import youtube_logo from "../../public/new_images/youtube_logo.svg";
import sports_logo from "../../public/new_images/sports_logo.svg";

const Footer = (props) => {
  return (
    <Fragment>
      <footer className="footer-block">
        <Container>
          <Row style={{paddingTop:40}}>
            <Col
              md={12}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div className="logo-content-block">
                <div className="logo-wrapper" style={{ marginTop: "15px" }}>
                  <Link href="/" style={{ width: "125px" }}>
                    <a aria-label="redirect to home page">
                      <Image
                        loader={myImageLoader}
                        className="mdg"
                        src={LogoNew}
                        alt=""
                        placeholder="Logo"
                        width={140}
                        height={40}
                      />
                    </a>
                  </Link>
                </div>
              </div>

              <div className="link-wrapper">
                <a>Quick Links</a>
                <Link href="/market-research">Market Research</Link>
                <Link href="/blogs">Blogs</Link>
                <Link href="/community">
                  <a className="community" href="">
                    Community
                  </a>
                </Link>
              </div>
              <div className="link-wrapper">
                <a>Services</a>
                <Link href="/it-robo">AI-Based Robo Advisor</Link>
                <Link href="/consultant">Talk to a Consultant</Link>
                <Link href="/access">Access Communities</Link>
              </div>
              <div className="link-wrapper">
                <a>Help</a>
                <Link href="/terms_and_conditions">Terms and Conditions</Link>
                <Link href="/privacy_policy">Privacy Policy</Link>
                <Link href="/contact-us">Contact Us</Link>
              </div>
            </Col>
          </Row>

          {/* <div className="divider"></div> */}
          <hr className="line-break" />
          <Row
            style={{
              marginBottom: "10px",
            }}
          >
            <Col md={12}>
              <div className="social-wrapper">
                <div className="copy-right">
                  © {new Date().getFullYear()} {themeConfig.appName}. All rights
                  reserved
                </div>
                <div className="social-link">
                  <a
                    href="https://www.linkedin.com/company/tech24.ai/"
                    target="_blank"
                    aria-label="redirect to LinkedIn page"
                  >
                    {/* <Icon icon={linkedin} size={16} /> */}
                    <Image
                      loader={myImageLoader}
                      style={{ borderRadius: "5px" }}
                      width={24}
                      height={24}
                      preview="false"
                      src={x_logo}
                      alt="profile"
                    />
                  </a>
                  <a
                    href="https://twitter.com/tech24.ai"
                    target="_blank"
                    aria-label="redirect to twitter page"
                  >
                    {/* <Icon icon={twitter} size={16} /> */}
                    <Image
                      loader={myImageLoader}
                      style={{ borderRadius: "5px" }}
                      width={24}
                      height={24}
                      preview="false"
                      src={instagram_logo}
                      alt="profile"
                    />
                  </a>
                  <a
                    href="https://twitter.com/tech24.ai"
                    target="_blank"
                    aria-label="redirect to twitter page"
                  >
                    {/* <Icon icon={twitter} size={16} /> */}
                    <Image
                      loader={myImageLoader}
                      style={{ borderRadius: "5px" }}
                      width={24}
                      height={24}
                      preview="false"
                      src={youtube_logo}
                      alt="profile"
                    />
                  </a>
                  <a
                    href="https://twitter.com/tech24.ai"
                    target="_blank"
                    aria-label="redirect to twitter page"
                  >
                    {/* <Icon icon={twitter} size={16} /> */}
                    <Image
                      loader={myImageLoader}
                      style={{ borderRadius: "5px" }}
                      width={24}
                      height={24}
                      preview="false"
                      src={sports_logo}
                      alt="profile"
                    />
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>

      {/*  <footer
          style={{
            padding: "10px 20px",
            backgroundColor: "#000",
            color: "#fff",
            textAlign: "center",
          }}
        >
          © {new Date().getFullYear()} {themeConfig.appName} : An IT Research & Advisory company
        </footer> */}
    </Fragment>
  );
};

function mapState(state) {
  const { authentication } = state;
  return {
    isloggedIn: authentication.loggedIn,
  };
}

export default connect(mapState, null)(Footer);
