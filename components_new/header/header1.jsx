import React, { useEffect } from "react";
// import { Drawer } from 'antd';
import { Container, Row, Col, Button } from "reactstrap";
import Link from "next/link";
import { connect } from "react-redux";
import { crudActions } from "../../_actions";
// import SearchModule from "../../components/searchModule";
// import CategoryList from "../../components/categories/list";
import LogoNew from "../../public/images/header/Group 3194.png";
import MobileLogo from "../../public/images/header/mobilelogo.svg";
import HomeLogo from "../../public/images/header/home.svg";
import Close from "../../public/images/header/close.svg";
import Drawer from "../header/drawer";
import { BrowserView, MobileView } from "react-device-detect";
import myImageLoader from "../imageLoader";
import Image from "next/image";
import { useRouter } from "next/router";

function Header1(props) {
  const router = useRouter();
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
                      placeholder="ITMAPLogo"
                      width={140}
                      height={40}
                    />
                  </a>
                </Link>
                <div className="content-block">
                  <h5 style={{ fontSize: "15px" }}>Unbiased.Comprehensive</h5>
                </div>
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
            {/* openDownloadBtn && (
              <MobileView viewClassName="researchBtnWrapper">
                <Button
                  className="researchBtn"
                  size="sm"
                  onClick={openDownloadBtn}
                  style={{ padding: "5px 1.5rem" }}
                >
                  Research
                </Button>
              </MobileView>
            ) */}

            {
              <Drawer
                isloggedIn={isloggedIn}
                openSideMenu={openSideMenu}
                sideMenu={sideMenu}
              />
            }
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
