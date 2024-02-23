import React, { useEffect, Fragment } from "react";
import { Drawer } from "antd";
import { Navbar, NavItem, Form } from "reactstrap";
import Link from "next/link";
import SearchModule from "../searchModule";
// import CategoryList from "../../components/categories/list";
import MobileLogo from "../../public/images/header/Group 3194.png";
import Close from "../../public/images/header/close.svg";
import { useRouter } from "next/router";
import { BrowserView, MobileView } from "react-device-detect";
import Image from "next/image";
import myImageLoader from "../imageLoader";

function Menu(props) {
  const router = useRouter();

  useEffect(() => {
    document.querySelector(".main-content").classList.add("sticky");
  }, []);
  const { isloggedIn, openSideMenu, sideMenu } = props;
  return (
    <Fragment>
      <div className="menu-search-block">
        <div className="search-wrapper">
          <BrowserView>
            <Form className="header-search">
              <SearchModule isHeader="true" />
            </Form>
          </BrowserView>
        </div>
        <div className="menu-block">
          <div className="menu-icon" onClick={openSideMenu}>
            <span></span>
            <span></span>
            {/* <span style={{ backgroundColor: "#2b7c9f" }}></span> */}
          </div>
        </div>
      </div>

      <Drawer
        placement="right"
        closable={false}
        onClose={openSideMenu}
        visible={sideMenu}
        key="right"
        className="menu-wrapper"
      >
        <div>
          <MobileView viewClassName="logo-content-block">
            <div className="logo-wrapper">
              <Link href="#!">
                <div>
                  <a>
                    <Image
                      loader={myImageLoader}
                      className="logo"
                      src={MobileLogo}
                      alt=""
                      placeholder="wellCuratedIcon"
                      layout="raw"
                    />
                  </a>
                  <p
                    className="m-0 p-0"
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      fontStretch: "normal",
                      fontStyle: "normal",
                      letterSpacing: "0.15px",
                      color: "#191970",
                    }}
                  >
                    Unbiased . Comprehensive
                  </p>
                </div>
              </Link>
            </div>
          </MobileView>

          <Navbar className="p-0">
            <div className="close-icon" onClick={openSideMenu}>
              <img src={Close.src} className="close-btn" />
            </div>
            <div className="navbar-link-block">
              <>
                {router.pathname !== "/" && (
                  <NavItem>
                    <Link href="/">
                      <a className="active" onClick={openSideMenu}>
                        Home
                      </a>
                    </Link>
                  </NavItem>
                )}
                <NavItem>
                  <Link href="/blogs">
                    <a onClick={openSideMenu}>Blogs</a>
                  </Link>
                </NavItem>
                {/* <NavItem>
                  <Link href="#">
                    <a>Market Intelligence</a>
                  </Link>
                </NavItem> */}
                <NavItem>
                  <Link href="/faq">
                    <a onClick={openSideMenu}>FAQ</a>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/about-us" passHref>
                    <a onClick={openSideMenu}>About Us</a>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/connect">
                    <a onClick={openSideMenu}>Connect</a>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/legal">
                    <a onClick={openSideMenu}>Legal</a>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/pricing">
                    <a onClick={openSideMenu}>Pricing</a>
                  </Link>
                </NavItem>
                {isloggedIn && (
                  <NavItem>
                    <Link href="/profile">
                      <a onClick={openSideMenu}>Profile</a>
                    </Link>
                  </NavItem>
                )}
                {isloggedIn && (
                  <NavItem>
                    <Link href="/logout">
                      <a onClick={openSideMenu}>Logout</a>
                    </Link>
                  </NavItem>
                )}
                {!isloggedIn && (
                  <NavItem>
                    <Link href="/login">
                      <a onClick={openSideMenu}>Login</a>
                    </Link>
                  </NavItem>
                )}
              </>
            </div>
          </Navbar>

          <BrowserView>{/* <CategoryList /> */}</BrowserView>
        </div>
      </Drawer>
      <style global jsx>{`
        @media (max-width: 575px) {
          // .menu-block .menu-icon span {
          //   background-color: ${router.pathname == "/" ? "white" : ""};
          // }
        }
      `}</style>
    </Fragment>
  );
}

export default Menu;
