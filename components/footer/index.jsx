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
import LogoNew from "../../public/images/header/tech24-logo-white.png";
import InstaIcon from "../../public/new_images/instagram.svg";
import GlobIcon from "../../public/new_images/glob.svg";
import TwitterIcon from "../../public/new_images/twitter.svg";
import YoutubeIcon from "../../public/new_images/youtube.svg";
import themeConfig from "../../config/themeConfig";

const Footer = (props) => {
  return (
    <Fragment>
      <footer className="footer-block">
        <Container>
          <Row>
            <Col
              md={12}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div className="logo-content-block">
                <div className="logo-wrapper">
                  <Link href="/" style={{ marginTop: "-10px", width: "125px" }}>
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
              {/* <Row>
              <Col md={12}> */}
              <div className="link-wrapper">
                <Link href="/about-us">
                  <a>About Us</a>
                </Link>
                <Link href="/faqs">FAQs</Link>
                <Link href="/legal">Legal</Link>
                <Link href="/blogs">Blogs</Link>
                <Link href="/connect">Connect</Link>
              </div>
              {/* </Col>
            </Row> */}
            </Col>
          </Row>
          {/* <Row className="link-wrapper">
            <Col sm={4} md={4} xs={4}>
              <Link href="/about-us">
                <a>About Us</a>
              </Link>
            </Col>
            <Col sm={4} md={4} xs={4}>
              <Link href="/faqs">FAQs</Link>
            </Col>
            <Col sm={4} md={4} xs={4}>
              <Link href="/legal">Legal</Link>
            </Col>
            <Col sm={4} md={4} xs={4}>
              <Link href="/blogs">Blogs</Link>
            </Col>
            <Col sm={4} md={4} xs={4}>
              <Link href="/connect">Connect</Link>
            </Col>
          </Row> */}
          <div className="divider"></div>
          <Row>
            <Col md={12}>
              <div className="social-wrapper">
                <div className="copy-right">
                  © {new Date().getFullYear()} {themeConfig.appName}. All rights
                  reserved
                </div>
                <div className="social-link">
                  {/* <a
                    href=""
                    target="_blank"
                    style={{ marginTop: "10px" }}
                    aria-label="redirect to twitter page"
                  >
                    <Image
                      loader={myImageLoader}
                      src={InstaIcon}
                      alt=""
                      placeholder="InstagramIcon"
                      layout="raw"
                      height={30}
                      width={25}
                    />
                  </a> */}
                  {/* <a
                    href=""
                    target="_blank"
                    style={{ marginTop: "10px" }}
                    aria-label="redirect to website"
                  >
                    <Image
                      loader={myImageLoader}
                      src={GlobIcon}
                      alt=""
                      placeholder="Website"
                      layout="raw"
                      height={30}
                      width={25}
                    />
                  </a> */}
                  <a
                    href="https://www.linkedin.com/company/tech24.ai/"
                    target="_blank"
                    aria-label="redirect to LinkedIn page"
                  >
                    <Icon icon={linkedin} size={16} />
                  </a>
                  <a
                    href="https://twitter.com/tech24.ai"
                    target="_blank"
                    aria-label="redirect to twitter page"
                  >
                    <Icon icon={twitter} size={16} />
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
