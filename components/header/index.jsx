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
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
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
import LogoBlack from "../../public/new_images/tech24_header_logo_white.svg";
import LogoWhite from "../../public/new_images/tech24_header_logo_white.svg";
import Drawer from "./drawer";
import myImageLoader from "../imageLoader";
import Image from "next/image";

function Header(props) {
  const [collapsed, setCollapsed] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
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
                        width={150}
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
                          <Link href="/market-research">
                            <a
                              className={`${
                                router.pathname.includes("/market-research")
                                  ? "active-nav-link"
                                  : ""
                              }`}
                            >
                              Market Research
                            </a>
                          </Link>
                        </NavItem>

                        <UncontrolledDropdown nav inNavbar isOpen={isOpen}>
                          <DropdownToggle
                            nav
                            caret
                            onMouseOver={() => setIsOpen(true)}
                            onMouseOut={() => setIsOpen(false)}
                          >
                            Service
                          </DropdownToggle>
                          <DropdownMenu
                            className="dropdown-service-custom"
                            onMouseOver={() => setIsOpen(true)}
                            onMouseOut={() => setIsOpen(false)}
                          >
                            <DropdownItem className="service-link">
                              <Link href="/it-robo">AI-Based Robo Advisor</Link>
                            </DropdownItem>
                            <DropdownItem className="service-link">
                              <Link href="/consultant">
                                Talk to a Consultant
                              </Link>
                            </DropdownItem>
                            <DropdownItem className="service-link">
                              <Link href="/access">Access Communities</Link>
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>

                        {/* <NavItem>
                          <Link href="/pricing">
                            <a>Services</a>
                          </Link>
                        </NavItem> */}

                        <NavItem>
                          <Link href="/connect">
                            <a
                              className={`${
                                router.pathname.includes("/connect")
                                  ? "active-nav-link"
                                  : ""
                              }`}
                            >
                              Contact Us
                            </a>
                          </Link>
                        </NavItem>

                        <NavItem>
                          <Link href="/blogs">
                            <a
                              className={`${
                                router.pathname.includes("/blogs")
                                  ? "active-nav-link"
                                  : ""
                              }`}
                            >
                              Blogs
                            </a>
                          </Link>
                        </NavItem>
                        <NavItem>
                          <Link href="/community">
                            <a
                              className={`${
                                router.pathname.includes("/community")
                                  ? "active-nav-link"
                                  : ""
                              }`}
                            >
                              Community
                            </a>
                          </Link>
                        </NavItem>

                        <NavItem
                          className="mx-2"
                          style={{ color: "#54616C", fontSize: "30px" }}
                        >
                          |
                        </NavItem>

                        <NavItem>
                          <img src="/new_images/search.svg" alt="search" />
                        </NavItem>

                        {isloggedIn && (
                          <NavItem style={{ margin: 0 }}>
                            <Link href="/Profile">
                              <img
                                src="/new_images/Avatar.svg"
                                alt="avatar"
                                style={{ cursor: "pointer" }}
                              />
                            </Link>
                          </NavItem>
                        )}
                        {!isloggedIn && (
                          <NavItem>
                            <Link href="/login">
                              <Button color="light" className="px-4">
                                Sign up
                              </Button>
                            </Link>
                          </NavItem>
                        )}

                        {/* <NavItem>
                          <Link href="/blogs">
                            <a>Blogs</a>
                          </Link>
                        </NavItem>
 */}
                        {/* {isloggedIn && (
                         <NavItem>
                            <Link href="/logout">
                              <a>Logout</a>
                            </Link>
                          </NavItem>
                        )} */}
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
