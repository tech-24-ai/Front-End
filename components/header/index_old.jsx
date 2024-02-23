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
import LogoNew from "../../public/images/header/Group 3194.png";
import Drawer from "./drawer";
import myImageLoader from "../imageLoader";
import Image from "next/image";

function Header(props) {
  const [collapsed, setCollapsed] = useState(true);
  const router = useRouter();
  const toggleNavbar = () => setCollapsed(!collapsed);

  useEffect(() => {
    document.querySelector(".main-content").classList.remove("sticky");
  }, []);
  const { isloggedIn, openSideMenu, sideMenu } = props;
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
  ];
  if (!isloggedIn && !unProtectedRoutes.includes(router.pathname)) {
    // window.location.replace("/login");
  }
  return (
    <header
      className={`header-block main-header ${
        router.pathname === "/" ? "market" : ""
      }`}
    >
      <Container>
        <Row className="align-items-center">
          <Col md={4} className="left-block">
            {isBrowser && (
              <div className="logo-content-block">
                <div className="logo-wrapper">
                  <Link href="/" style={{ marginTop: "-10px", width: "125px" }}>
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
                <div className="content-block">
                  <h5 style={{ fontSize: "14px" }}>Unbiased.Comprehensive</h5>
                </div>
              </div>
            )}
            <MobileView>
              <Image
                loader={myImageLoader}
                src={LogoNew}
                alt=""
                placeholder="ITMAPLogo"
                layout="raw"
                style={{ objectFit: "contain", width: "100px", height: "auto" }}
              />
            </MobileView>
          </Col>
          <Col md={8} className="right-block">
            {isBrowser && (
              <div className="main-menu-wrapper">
                <Navbar expand="md" className="p-0">
                  <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                  <Collapse isOpen={true} navbar>
                    <BrowserView viewClassName="navbar-link-wrapper">
                      <Nav className="navbar-link-wrapper">
                        {/* <NavItem>

                          <Link href="#">
                            <a className="active">Market Intelligence</a>
                          </Link>
                        </NavItem> */}

                        {/* {isloggedIn && ( */}

                        <NavItem>
                          <Link href="/pricing">
                            <a>Pricing</a>
                          </Link>
                        </NavItem>

                        {/* <NavItem>
                            <Link href="/connect">
                              <a>Connect</a>
                            </Link>
                          </NavItem> */}
                        {/* )} */}
                        {isloggedIn && (
                          <NavItem>
                            <Link href="/profile">
                              <a>Profile</a>
                            </Link>
                          </NavItem>
                        )}
                        {!isloggedIn && (
                          <NavItem>
                            <Link href="/login">
                              <a>Sign in</a>
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
            background: rgb(212, 212, 212);
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
            background: linear-gradient(
              to left,
              rgba(255, 255, 255, 0),
              #d9d9d9
            );
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
