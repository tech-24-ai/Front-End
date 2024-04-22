import React, { useEffect, Fragment } from "react";
import { Drawer } from "antd";
import { Navbar, NavItem, Form } from "reactstrap";
import Link from "next/link";
import SearchModule from "../searchModule";
// import CategoryList from "../../components/categories/list";
import MobileLogo from "../../public/new_images/tech24_header_logo_white.svg";
import MobileLogoNew from "../../public/new_images/logo-white.png";
import Close from "../../public/images/header/close.svg";
import { useRouter } from "next/router";
import { BrowserView, MobileView } from "react-device-detect";
import Image from "next/future/image";
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
          {/* <MobileView viewClassName="logo-content-block">
            <div className="logo-wrapper">
              <Link href={"/"}>
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
                
                </div>
              </Link>
            </div>
          </MobileView> */}

          <Navbar className="p-0">
            <div className="close-icon" onClick={openSideMenu}>
              <img src={Close.src} className="close-btn" />
            </div>
            <div className="navbar-link-block">
              {/* {router.pathname !== "/" && (
                <NavItem>
                  <Link href="/">
                    <a className="active" onClick={openSideMenu}>
                      Home
                    </a>
                  </Link>
                </NavItem>
              )} */}
                  <NavItem>
                <Link href="/market-research" passHref>
                  <a onClick={openSideMenu}>Market Research</a>
                </Link>
              </NavItem>
              <hr color="white"/>
              <NavItem>
                <Link href="#">
                  <a onClick={openSideMenu}>Services</a>
                </Link>
              </NavItem>
              <hr color="white"/>
              <NavItem>
                <Link href="/connect">
                  <a onClick={openSideMenu}>Contact us</a>
                </Link>
              </NavItem>
              <hr color="white"/>
              <NavItem>
                <Link href="/blogs">
                  <a onClick={openSideMenu}>Blogs</a>
                </Link>
              </NavItem>
              <hr color="white"/>
              <NavItem>
                <Link href="/community">
                  <a onClick={openSideMenu}>Community</a>
                </Link>
              </NavItem>
{/*              
              {isloggedIn && (
                <NavItem>
                  <Link href="/Profile">
                    <a onClick={openSideMenu}>Profile</a>
                  </Link>
                </NavItem>
              )}
             
              {!isloggedIn && (
                <NavItem>
                  <Link href="/login">
                    <a onClick={openSideMenu}>Login</a>
                  </Link>
                </NavItem>
              )} */}
            </div>
          </Navbar>
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
