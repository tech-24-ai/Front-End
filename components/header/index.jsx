import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Navbar,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import Link from "next/link";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
import LogoBlack from "../../public/images/header/logo.svg";
import LogoWhite from "../../public/images/header/tech24-logo-white.png";
import Drawer from "./drawer";
import myImageLoader from "../imageLoader";
import Image from "next/image";

function Header(props) {
  const [collapsed, setCollapsed] = useState(true);
  const router = useRouter();
  const toggleNavbar = () => setCollapsed(!collapsed);
  const { isloggedIn, openSideMenu, sideMenu, isMainHeader = true } = props;

  useEffect(() => {
    if (isMainHeader) {
      document.querySelector(".main-content").classList.remove("sticky");
    } else {
      document.querySelector(".main-content").classList.add("sticky");
    }
  }, [isMainHeader]);

  useEffect(() => {
    const url = router.pathname.slice(1).replace("/", "_");
    if (url) {
      const classList = document.querySelector(".main-content").classList;
      if (classList.length > 2) {
        const extraClasses = Object.keys(classList)
          .filter((data, ind) => ind > 1)
          .map((data) => classList[data]);

        document
          .querySelector(".main-content")
          .classList.remove(...extraClasses);
      }
      document.querySelector(".main-content").classList.add(url);
    }
  }, [router]);

  const unProtectedRoutes = [
    "/",
    "/content/[slug]",
    "/about-us",
    "/faq",
    "/legal",
    "/blogs",
    "/blogs/[slug]",
    "/connect",
    "/login",
    "/community",
  ];
  if (!isloggedIn && !unProtectedRoutes.includes(router.pathname)) {
    // window.location.replace("/login");
  }
  return (
    <header
      className={`header-block ${isMainHeader ? "main-header" : "header1"} ${
        router.pathname === "/" ? "market" : ""
      }`}
    >
      <Container>
        <Row className="align-items-center">
          <Col md={3} className="left-block">
            {isBrowser && (
              <div className="logo-content-block">
                <div className="logo-wrapper">
                  <Link href="/" style={{ marginTop: "-10px", width: "125px" }}>
                    <a aria-label="redirect to home page">
                      <Image
                        loader={myImageLoader}
                        className="mdg"
                        src={isMainHeader ? LogoBlack : LogoWhite}
                        alt=""
                        placeholder="Logo"
                        width={140}
                        height={40}
                      />
                    </a>
                  </Link>
                </div>
              </div>
            )}
            <MobileView>
              <Link href={"/"}>
                <Image
                  loader={myImageLoader}
                  src={isMainHeader ? LogoBlack : LogoWhite}
                  alt=""
                  placeholder="Logo"
                  layout="raw"
                  style={{
                    objectFit: "contain",
                    width: "100px",
                    height: "auto",
                  }}
                />
              </Link>
            </MobileView>
          </Col>
          <Col md={9} className="right-block">
            {isBrowser && (
              <div className="main-menu-wrapper">
                <Navbar expand="md" className="p-0">
                  <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                  <Collapse isOpen={true} navbar>
                    <BrowserView viewClassName="navbar-link-wrapper">
                      <Nav className="navbar-link-wrapper">
                        {/* <NavItem>
                          <Link href="/platform">
                            <a>Platform</a>
                          </Link>
                        </NavItem> */}
                        <NavItem>
                          <Link href="/">
                            <a>Home</a>
                          </Link>
                        </NavItem>

                        <NavItem>
                          <Link href="/pricing">
                            <a>Pricing</a>
                          </Link>
                        </NavItem>

                        <NavItem>
                          <Link href="/about-us">
                            <a>About us</a>
                          </Link>
                        </NavItem>
                        <NavItem>
                          <Link href="/community">
                            <a>Community</a>
                          </Link>
                        </NavItem>
                        {!isloggedIn && (
                          <NavItem>
                            <Link href="/connect">
                              <a>Connect</a>
                            </Link>
                          </NavItem>
                        )}
                        {isloggedIn && (
                          <NavItem>
                            <Link href="/Profile">
                              <a>Profile</a>
                            </Link>
                          </NavItem>
                        )}
                        {!isloggedIn && (
                          <NavItem>
                            <Link href="/login">
                              <a className="with-bg">Login / Sign up</a>
                            </Link>
                          </NavItem>
                        )}
                        {/* <NavItem>
                          <Link href="/blogs">
                            <a>Blogs</a>
                          </Link>
                        </NavItem>
 */}
                        {isloggedIn && (
                          <NavItem>
                            <Link href="/logout">
                              <a>Logout</a>
                            </Link>
                          </NavItem>
                        )}
                      </Nav>
                    </BrowserView>
                    {/* <MobileView viewClassName='navbar-link-wrapper'>
                        <Link href="#"><a className="Market-link">Market Intelligence</a></Link>
                      </MobileView> */}
                  </Collapse>
                </Navbar>
              </div>
            )}
            <MobileView>
              <Drawer
                isloggedIn={isloggedIn}
                openSideMenu={openSideMenu}
                sideMenu={sideMenu}
              />
            </MobileView>
          </Col>
        </Row>
      </Container>
      <style global jsx>{`
        @media (min-width: 576px) {
          body {
            // background: #ffffff;
            // background: rgb(212, 212, 212);
            // background: linear-gradient(
            //   90deg,
            //   rgba(204, 204, 204, 1) 0%,
            //   rgba(255, 255, 255, 0) 75%,
            //   rgba(255, 255, 255, 1) 100%
            // );
          }
        }
        @media (max-width: 575px) {
          body {
            // background: linear-gradient(
            //   to left,
            //   rgba(255, 255, 255, 0),
            //   #d9d9d9
            // );
          }
        }
      `}</style>
    </header>
  );
}

function mapState(state) {
  const { authentication } = state;
  return {
    isloggedIn: authentication.loggedIn,
  };
}

export default connect(mapState, null)(Header);
