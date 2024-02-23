import React, { useEffect, useLayoutEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Modal } from "antd";
import { withRouter, useRouter } from "next/router";
import { userActions } from "../../_actions";
import LinkedinIcon from "../../public/images/linkedin/linked_icon.png";
import RightLinArrow from "../../public/images/linkedin/arrow.png";
import { linkedinConstants } from "../../_constants";
import { Button, ButtonGroup } from "reactstrap";
import { isBrowser, isMobile } from "react-device-detect";
import LogoNew from "../../public/images/header/Group 3194_Purple.png";
import RightArrow from "../../public/images/input/rightarrow.svg";
// let timeoutTime = 1000 * 60 * 120;
let timeoutTime = 60;
function Timer({ isloggedIn, showLoginPopup, popupMsg, toggleLoginPopup }) {
  const { message, BtnText, isVideo, videoLink } = popupMsg;
  let time = null;
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem("time")) {
      let timeUsed = new Date() - new Date(sessionStorage.getItem("time"));
      time = timeoutTime - timeUsed;
    } else {
      sessionStorage.setItem("time", new Date().toISOString());
      time = timeoutTime;
    }
    if (!isloggedIn) {
      toggleLoginPopup(false);

      setTimeout(() => {
        toggleLoginPopup(true);
      }, time);
    }
  }, []);

  useEffect(() => {
    if (isloggedIn) {
      clearTimeout(time);
      sessionStorage.removeItem("time");
      toggleLoginPopup(false);
    }
  }, [isloggedIn]);

  const linkedinOpenUrl = () => {
    toggleLoginPopup(false);
    const linkedinUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI}&scope=${process.env.NEXT_PUBLIC_LINKEDIN_SCOPE}&state=${process.env.NEXT_PUBLIC_LINKEDIN_STATE}`;
    window.open(linkedinUrl, "_self");
  };

  const redirectLogin = () => {
    toggleLoginPopup(false);
    router.push("/login");
  };

  return (
    <Fragment>
      {showLoginPopup && (
        <Fragment>
          {isVideo ? (
            <Modal
              centered={true}
              visible={showLoginPopup}
              transitionName="none"
              maskTransitionName="none"
              footer={null}
              width="650px"
              className="timer-modal vimeo"
              onCancel={() => toggleLoginPopup(false)}
              // footer={[
              //   <Button
              //     key="submit"
              //     type="primary"
              //     onClick={() => toggleLoginPopup(false)}
              //   >
              //     OK
              //   </Button>,
              // ]}
            >
              <div>
                <iframe
                  // src="https://player.vimeo.com/video/707006786?h=1157c4f2cc"
                  src={videoLink}
                  width={isMobile ? "320" : "640"}
                  height={isMobile ? "190" : "360"}
                  frameBorder="0"
                  allow="autoplay; picture-in-picture"
                  allowFullScreen={true}
                ></iframe>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "15px",
                  }}
                >
                  <img src={LogoNew.src} width={53} height={15} alt="" />
                </div>
              </div>
            </Modal>
          ) : (
            <Modal
              centered={true}
              visible={showLoginPopup}
              transitionName="none"
              maskTransitionName="none"
              maskClosable={false}
              footer={null}
              width="500px"
              className="timer-modal"
              onCancel={() => toggleLoginPopup(false)}
              closable={false}
              keyboard={false}
              // footer={[
              //   <Button
              //     key="submit"
              //     type="primary"
              //     onClick={() => toggleLoginPopup(false)}
              //   >
              //     OK
              //   </Button>,
              // ]}
            >
              {/* Please register to download Report
          Register with LinkedIn  
      */}
              <div>
                {message ? message : "Join Today For Free!"}
                <div
                  className="loginWrapper"
                  style={{ marginTop: "5%", marginBottom: "5%" }}
                >
                  <ButtonGroup>
                    <Button color="default" hidden></Button>
                    {/* <Button color="default" onClick={redirectLogin}>
                      Login{" "}
                      {isMobile && (
                        <span>
                          <img src={RightArrow.src} className="arrow" />
                        </span>
                      )}
                    </Button> */}
                    <Button
                      onClick={linkedinOpenUrl}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <img
                        style={{ width: "25px", marginRight: "10px" }}
                        src={LinkedinIcon.src}
                      />
                      <div>{BtnText ? BtnText : "Login with LinkedIn"}</div>
                      <img
                        style={{ width: "10px", marginLeft: "10px" }}
                        src={RightLinArrow.src}
                      />
                    </Button>
                  </ButtonGroup>
                </div>
                <Button
                  key="submit"
                  className="submit-btn"
                  style={{ position: "relative", float: "right" }}
                  // onClick={() => toggleLoginPopup(false)}
                  onClick={redirectLogin}
                >
                  OK
                </Button>
              </div>
            </Modal>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

const actionCreators = {
  toggleLoginPopup: userActions.toggleLoginPopup,
};
function mapState(state) {
  const { authentication } = state;
  return {
    isloggedIn: authentication.loggedIn,
    showLoginPopup: authentication.showLoginPopup,
    popupMsg: authentication.popupMsg,
  };
}

export default withRouter(connect(mapState, actionCreators)(Timer));
