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
import TwitterIcon from "../../public/images/header/Twitter-icon.svg";
import myImageLoader from "../imageLoader";
import Image from "next/image";

const Footer = (props) => {
  return (
    <Fragment>
      {isBrowser ? (
        <footer className="footer-block">
          <Container>
            <Row className="align-items-center">
              <Col md={10}>
                <div className="logo-wrapper">
                  <div className="input-link">
                    <Link href="/about-us">
                      <a>About Us</a>
                    </Link>
                    &nbsp;|&nbsp;
                    <Link href="/faq">FAQ</Link>&nbsp;|&nbsp;
                    <Link href="/legal">Legal</Link>&nbsp;|&nbsp;
                    <Link href="/blogs">Blogs</Link>&nbsp;|&nbsp;
                    {/* {this.props.isloggedIn && (
                    <Link href="/connect">Connect</Link>
                  )} */}
                    <Link href="/connect">Connect</Link>
                  </div>
                  <Link href="/">
                    <div>
                      <span
                        style={{
                          color: "rgb(112, 112, 112)",
                          fontSize: "14px",
                        }}
                      >
                        © {new Date().getFullYear()} TECH24 : An IT Research &
                        Advisory company
                      </span>
                    </div>
                  </Link>
                </div>
              </Col>
              <Col md={2}>
                <div className="social-wrapper">
                  <div
                    className="social-link"
                    style={{
                      marginRight: "20px",
                      marginTop: "10px",
                      display: "flex",
                      justifyContent: "end",
                      alignItems: "center",
                    }}
                  >
                    {/* <a href="https://www.linkedin.com/company/itmap-research-advisory-services/" target="_blank" style={{marginTop:'5px'}} aria-label="redirect to LinkedIn page">
                    <Image
                      loader={myImageLoader}
                      src={LinkedinIcon}
                      alt=""
                      placeholder="LinkedinIcon"
                      layout="raw"
                      height={35}
                      width={35}
                    />
                  </a> */}
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
                        placeholder="TwitterIcon"
                        layout="raw"
                        height={35}
                        width={30}
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
