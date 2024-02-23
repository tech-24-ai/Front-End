import React, { Component, Fragment } from "react";
import { Container, Col, Row } from "reactstrap";
import { Icon } from "react-icons-kit";
import { socialTwitter } from "react-icons-kit/ionicons/socialTwitter";
import { socialLinkedin } from "react-icons-kit/ionicons/socialLinkedin";
import Link from "next/link";
import { connect } from "react-redux";
import { isMobile, isBrowser } from "react-device-detect";
import { useLayoutEffect, useEffect } from "react";

import LinkedinIcon from "../../public/images/header/Linkedin-icon.svg";
import myImageLoader from "../imageLoader";
import Image from "next/image";
import LogoNew from "../../public/new_images/Logo-itmap.png";
import InstaIcon from "../../public/new_images/instagram.svg";
import GlobIcon from "../../public/new_images/glob.svg";
import TwitterIcon from "../../public/new_images/twitter.svg";
import YoutubeIcon from "../../public/new_images/youtube.svg";

const Footer = (props) => {
  return (
    <Fragment>
      {isBrowser ? (
        <footer className="footer-block">
          <Container>
            <Row>
              <Col md={12}>
                <div className="logo-content-block">
                  <div className="logo-wrapper">
                    <Link
                      href="/"
                      style={{ marginTop: "-10px", width: "125px" }}
                    >
                      <a aria-label="redirect to home page">
                        <Image
                          loader={myImageLoader}
                          className="mdg"
                          src={LogoNew}
                          alt=""
                          placeholder="ITMAPLogo"
                          width={140}
                          height={40}
                        />
                      </a>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <div className="link-wrapper">
                  <Link href="/about-us">
                    <a>About Us</a>
                  </Link>
                  <Link href="/faq">FAQs</Link>
                  <Link href="/legal">Legal</Link>
                  <Link href="/blogs">Blogs</Link>
                  <Link href="/connect">Connect</Link>
                </div>
              </Col>
            </Row>
            <div className="divider"></div>
            <Row>
              <Col md={12}>
                <div className="social-wrapper">
                  <div className="copy-right">
                    © {new Date().getFullYear()} Tech24. All rights reserved
                  </div>
                  <div className="social-link">
                    <a
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
                    </a>
                    <a
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
                    </a>
                    <a
                      href="https://twitter.com/ITMAP_research"
                      target="_blank"
                      style={{ marginTop: "10px" }}
                      aria-label="redirect to twitter page"
                    >
                      <Image
                        loader={myImageLoader}
                        src={TwitterIcon}
                        alt=""
                        placeholder="twitter"
                        layout="raw"
                        height={30}
                        width={25}
                      />
                    </a>
                    <a
                      href=""
                      target="_blank"
                      style={{ marginTop: "10px" }}
                      aria-label="redirect to youtube page"
                    >
                      <Image
                        loader={myImageLoader}
                        src={YoutubeIcon}
                        alt=""
                        placeholder="Youtube"
                        layout="raw"
                        height={30}
                        width={25}
                      />
                    </a>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </footer>
      ) : (
        <footer
          style={{
            padding: "10px 20px",
            backgroundColor: "#000",
            color: "#fff",
            textAlign: "center",
          }}
        >
          © {new Date().getFullYear()} TECH24 : An IT Research & Advisory
          company
        </footer>
      )}
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
