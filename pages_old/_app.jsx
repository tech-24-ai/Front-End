import React from "react";
import App from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import { store, persistor } from "../_helpers";
import { isMobile, isBrowser } from "react-device-detect";
import Downloads from "../components/download";
import "bootstrap/dist/css/bootstrap.css";
import "react-phone-input-2/lib/bootstrap.css";
import "../public/scss/index.scss";

// custom components
import Header from "../components/header";
import Header1 from "../components/header/header1";
import Footer from "../components/footer";
import AlertComponent from "../components/alert";
import LoaderComponent from "../components/loader";
import { PersistGate } from "redux-persist/integration/react";
import Timer from "../components/Timer/Timer";
import Cookies from "../components/cookies/";
// import favicon from "../public/images/header/favicon-96x96.png";
// import appleIcon from "../public/images/header/apple-icon-57x57.png";
import favicon from "../public/images/header/favicon-32x32.png";
import appleIcon from "../public/images/header/apple-touch-icon.png";

class MyApp extends App {
  state = {
    user: null,
    sideMenu: false,
    downloadbtn: false,
    isToggle: false,
  };

  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  openSideMenu = () => {
    const { sideMenu } = this.state;
    this.setState({ sideMenu: !sideMenu });
  };
  openDownloadBtn = () => {
    const { downloadbtn } = this.state;
    this.setState({ downloadbtn: !downloadbtn });
  };

  onPageClick = () => {
    this.setState({ sideMenu: false });
    this.setState({ downloadbtn: false });
  };

  render() {
    const homeRoutes = ["/", "/signup", "/login"];
    const downloadRoutes = ["/questions", "/products"];
    const { Component, store, pageProps, router } = this.props;
    const { sideMenu, downloadbtn } = this.state;

    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <Head>
            <title>TECH24 - IT Market Research for All</title>
            <meta
              name="viewport"
              content="width=device-width, minimum-scale=1.0, maximum-scale=5.0, user-scalable=no"
            />
            <link rel="apple-touch-icon" href={appleIcon.src} />
            <link rel="shortcut icon" type="image/png" href={favicon.src} />
          </Head>
          <Timer />
          <Cookies />
          <LoaderComponent>
            {homeRoutes.includes(router.pathname) ? (
              <Header openSideMenu={this.openSideMenu} sideMenu={sideMenu} />
            ) : (
              <Header1
                openSideMenu={this.openSideMenu}
                sideMenu={sideMenu}
                openDownloadBtn={
                  downloadRoutes.includes(router.pathname)
                    ? this.openDownloadBtn
                    : false
                }
              />
            )}
            <div
              id="main-page-content"
              className="main-content"
              onClick={this.onPageClick}
            >
              <AlertComponent />
              <Component {...pageProps} />
              {isMobile && <div className="bottom-line"></div>}
            </div>
            <Footer />

            {/* {downloadRoutes.includes(router.pathname) ? (
              <Downloads
                downloadbtn={downloadbtn}
                openDownloadBtn={this.openDownloadBtn}
              />
            ) : (
              ""
            )} */}
          </LoaderComponent>
        </PersistGate>
      </Provider>
    );
  }
}

//makeStore function that returns a new store for every request
const makeStore = () => store;

//withRedux wrapper that passes the store to the App Component
export default withRedux(makeStore, { debug: true })(MyApp);
