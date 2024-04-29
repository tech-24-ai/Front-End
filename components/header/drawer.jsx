import React, { useEffect, Fragment } from "react";
import { Drawer } from "antd";
import {
  Navbar,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
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
          {sideMenu ? (
            <div className="close-icon" onClick={openSideMenu}>
              <img src={Close.src} className="close-btn" />
            </div>
          ) : (
            <div className="menu-icon" onClick={openSideMenu}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
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
              <hr color="white" />
              <NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Service
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-service-custom">
                    <DropdownItem className="service-link">
                      <Link onClick={openSideMenu} href="/it-robo" style={{color: "black"}}>
                        AI-Based Robo Advisor
                      </Link>
                    </DropdownItem>
                    <DropdownItem className="service-link">
                      <Link onClick={openSideMenu} href="/consultant" style={{color: "black"}}>
                        Talk to a Consultant
                      </Link>
                    </DropdownItem>
                    <DropdownItem className="service-link">
                      <Link onClick={openSideMenu} href="/d/tools_calculators/calculators" style={{color: "black"}}>
                      Tools & Calculator
                      </Link>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </NavItem>
              <hr color="white" />
              <NavItem>
                <Link href="/connect">
                  <a onClick={openSideMenu}>Contact us</a>
                </Link>
              </NavItem>
              <hr color="white" />
              <NavItem>
                <Link href="/blogs">
                  <a onClick={openSideMenu}>Blogs</a>
                </Link>
              </NavItem>
              <hr color="white" />
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
