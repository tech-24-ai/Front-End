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
import { alignCenter } from "react-icons-kit/fa";
import Link from "next/link";

let timeoutTime = 1000 * 60 * 15000;
// let timeoutTime = 60 * 2;
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

      // setTimeout(() => {
      //   toggleLoginPopup(true);
      // }, time);
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
              width="576px"
              className="timer-modal linkedin-login-modal"
              onCancel={() => toggleLoginPopup(false)}
              closable={true}
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
              <div className="linkedin-modal-content">
                <div className="modal-head">
                  {message ? message : "Welcome to Tech24"}
                </div>
                <p className="modal-description">
                  Sign up or sign in to join the conversation, address your
                  questions, share your ideas, and engage with other members who
                  share similar interests!
                </p>
                <div className="loginWrapper">
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
                      className="modal-linkedin-btn"
                    >
                      <img
                        style={{ width: "25px", marginRight: "10px" }}
                        src={LinkedinIcon.src}
                      />
                      <div
                        style={{
                          fontSize: 18,
                          lineHeight: "28px",
                        }}
                      >
                        {BtnText ? BtnText : "Continue with LinkedIn"}
                      </div>
                      {/* <img
                        style={{ width: "10px", marginLeft: "10px" }}
                        src={RightLinArrow.src}
                      /> */}
                    </Button>
                  </ButtonGroup>
                </div>
                <div className="footer-section">
                  <div>By creating an account, you agree to our</div>
                  <div>
                    <Link href="/terms_and_conditions">Terms & Conditions</Link>
                    <span style={{ padding: "0 5px" }}>and</span>
                    <Link href="/privacy_policy">Privacy Policy</Link>
                  </div>
                </div>
                {/* <div
                  key="submit"
                  className="custom-btn outline"
                  style={{
                    position: "relative",
                    float: "right",
                    height: "40px",
                  }}
                  // onClick={() => toggleLoginPopup(false)}
                  onClick={redirectLogin}
                >
                  OK
                </div> */}
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
