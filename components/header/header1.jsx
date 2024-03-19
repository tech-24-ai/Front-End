import React, { useEffect, useState } from "react";
// import { Drawer } from 'antd';
import {
  Container,
  Row,
  Col,
  Button,
  Navbar,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import Link from "next/link";
import { connect } from "react-redux";
import { crudActions } from "../../_actions";
// import SearchModule from "../../components/searchModule";
// import CategoryList from "../../components/categories/list";
import LogoNew from "../../public/images/header/Group 3194.png";
import MobileLogo from "../../public/images/header/mobilelogo.svg";
import HomeLogo from "../../public/images/header/home.svg";
import Close from "../../public/images/header/close.svg";
import Drawer from "./drawer";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
import myImageLoader from "../imageLoader";
import Image from "next/image";
import { useRouter } from "next/router";

function Header1(props) {
  const [collapsed, setCollapsed] = useState(true);
  const router = useRouter();
  const toggleNavbar = () => setCollapsed(!collapsed);
  const { isloggedIn, openSideMenu, openDownloadBtn, sideMenu } = props;
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
    <header className="header-block header1" style={props.style}>
      <Container>
        <Row>
          <Col md={4} className="first-block">
            <div className="logo-content-block">
              <BrowserView viewClassName="" style={{ display: "flex" }}>
                <Link href="/">
                  <a style={{ marginTop: "-10px", width: "125px" }}>
                    <Image
                      loader={myImageLoader}
                      className="logo"
                      src={LogoNew}
                      alt=""
                      placeholder="Logo"
                      width={140}
                      height={40}
                    />
                  </a>
                </Link>
              </BrowserView>
              <MobileView viewClassName="logo-wrapper">
                <Link href="/">
                  <a>
                    <span>
                      <img src={HomeLogo.src} className="mobile-logo" />
                    </span>
                  </a>
                </Link>
              </MobileView>
            </div>
          </Col>
          <Col md={8} className="second-block">
            {isBrowser && (
              <div className="main-menu-wrapper">
                <Navbar expand="md" className="p-0">
                  <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                  <Collapse isOpen={true} navbar>
                    <BrowserView viewClassName="navbar-link-wrapper">
                      <Nav className="navbar-link-wrapper">
                        <NavItem>
                          <Link href="/platform">
                            <a>Platform</a>
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
                        {!isloggedIn && (
                          <NavItem>
                            <Link href="/contact-us">
                              <a>Contact us</a>
                            </Link>
                          </NavItem>
                        )}
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
    </header>
  );
}

function mapState(state) {
  const { authentication, category } = state;
  return {
    isloggedIn: authentication.loggedIn,
    category,
  };
}

const actionCreators = {
  clearsubModules: crudActions._clear,
  getAllCrud: crudActions._getAll,
};

export default connect(mapState, actionCreators)(Header1);
