import React, { useEffect, useState } from "react";
import { useCookieConsent } from "@use-cookie-consent/core";
import LogoNew from "../../public/images/header/Group 3194.png";
import { cookiesActions } from "../../_actions";
import { crudService } from "../../_services";
import { connect } from "react-redux";
import Link from "next/link";

const cookies = ({ cookies, showCookieBox, hideCookieBox }) => {
  const { consent, acceptAllCookies, declineAllCookies, acceptCookies } =
    useCookieConsent();

  const [isRejected, setIsRejected] = useState(false);
  const [isCustomized, setIsCustomized] = useState(false);
  const [activeOption, setActiveOption] = useState("");
  const [cookiesOption, setCookiesOption] = useState({
    functional: false,
    analytical: false,
    advertisement: false,
  });
  const [customCookies, setCustomCookies] = useState({
    session: true,
    persistent: false,
    necessary: true,
    preferences: false,
    statistics: false,
    marketing: false,
    firstParty: false,
    thirdParty: false,
  });

  useEffect(() => {
    if (consent.session == undefined) {
      showCookieBox();
    }
  }, [consent]);

  const handleAccept = () => {
    acceptAllCookies();
    hideCookieBox();
  };
  const handleReject = () => {
    declineAllCookies();
    hideCookieBox();
  };

  const handleCustomize = () => {
    acceptCookies(customCookies);
    hideCookieBox();
  };

  const handleChange = (panel) => (event) => {
    setActiveOption(activeOption === panel ? "" : panel);
  };

  const checkHandler = (event) => {
    const { name, checked } = event.target;
    setCookiesOption({ ...cookiesOption, [name]: checked });
    if (name === "functional") {
      setCustomCookies({
        ...customCookies,
        firstParty: checked,
        thirdParty: checked,
      });
    }
    if (name === "analytical") {
      setCustomCookies({
        ...customCookies,
        persistent: checked,
        preferences: checked,
      });
    }
    if (name === "advertisement") {
      setCustomCookies({
        ...customCookies,
        marketing: checked,
        statistics: checked,
      });
    }
  };

  if (!cookies.isVisible) {
    return <div></div>;
  }

  if (isCustomized) {
    return (
      <div className="cky-modal cky-modal-open">
        <div
          className="cky-preference-center"
          data-cky-tag="detail"
          style={{
            color: "#212121",
            borderColor: "#F4F4F4",
            backgroundColor: "#FFFFFF",
          }}
        >
          <div className="cky-preference-header">
            <span
              className="cky-preference-title"
              data-cky-tag="detail-title"
              style={{ color: "#212121" }}
            >
              Customize Consent Preferences
            </span>
            <button
              className="cky-btn-close"
              aria-label="Close"
              data-cky-tag="detail-close"
              onClick={() => setIsCustomized(false)}
            >
              <img
                src="https://cdn-cookieyes.com/assets/images/close.svg"
                alt="Close"
              />
            </button>
          </div>
          <div className="cky-preference-body-wrapper">
            <div
              className="cky-preference-content-wrapper"
              data-cky-tag="detail-description"
              style={{ color: "#212121" }}
            >
              <p>
                We use cookies to help you navigate efficiently and perform
                certain functions. You will find detailed information about all
                cookies under each consent category below. The cookies that are
                categorized as "Necessary" are stored on your browser as they
                are essential for enabling the basic functionalities of the
                site. We also use third-party cookies that help us analyze how
                you use this website, store your preferences, and provide the
                content and advertisements that are relevant to you. These
                cookies will only be stored in your browser with your prior
                consent. You can choose to enable or disable some or all of
                these cookies but disabling some of them may affect your
                browsing experience.
              </p>
            </div>
            <div
              className="cky-accordion-wrapper"
              data-cky-tag="detail-categories"
            >
              <div
                className={`cky-accordion ${
                  activeOption === "necessary" ? "cky-accordion-active" : ""
                }`}
                id="ckyDetailCategorynecessary"
                onClick={handleChange("necessary")}
              >
                <div className="cky-accordion-item">
                  <div className="cky-accordion-chevron">
                    <i className="cky-chevron-right"></i>
                  </div>
                  <div className="cky-accordion-header-wrapper">
                    <div className="cky-accordion-header">
                      <button
                        className="cky-accordion-btn"
                        aria-label="Necessary"
                        data-cky-tag="detail-category-title"
                        style={{ color: "#212121" }}
                      >
                        Necessary
                      </button>
                      <span className="cky-always-active">Always Active</span>
                    </div>
                    <div
                      className="cky-accordion-header-des"
                      data-cky-tag="detail-category-description"
                      style={{ color: "#212121" }}
                    >
                      <p>
                        Necessary cookies are required to enable the basic
                        features of this site, such as providing secure log-in
                        or adjusting your consent preferences. These cookies do
                        not store any personally identifiable data.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="cky-accordion-body">
                  <div
                    className="cky-audit-table"
                    data-cky-tag="audit-table"
                    style={{
                      color: "#212121",
                      borderColor: "#ebebeb",
                      backgroundColor: "#f4f4f4",
                    }}
                  >
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>cky-active-check</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>1 day</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          CookieYes sets this cookie to check if the consent
                          banner is active on the website.
                        </div>
                      </li>
                    </ul>
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>_GRECAPTCHA</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>5 months 27 days</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          This cookie is set by the Google recaptcha service to
                          identify bots to protect the website against malicious
                          spam attacks.
                        </div>
                      </li>
                    </ul>
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>cookieyesID</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>1 year</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          CookieYes sets this cookie as a unique identifier for
                          visitors according to their consent.
                        </div>
                      </li>
                    </ul>
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>cky-consent</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>1 year</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          <p>
                            The cookie is set by CookieYes to remember the
                            users' consent settings so that the website
                            recognizes the users the next time they visit.
                          </p>
                        </div>
                      </li>
                    </ul>
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>cookieyes-necessary</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>1 year</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          CookieYes sets this cookie to remember the consent of
                          users for the use of cookies in the 'Necessary'
                          category.
                        </div>
                      </li>
                    </ul>
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>cookieyes-functional</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>1 year</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          CookieYes sets this cookie to remember the consent of
                          users for the use of cookies in the 'Functional'
                          category.
                        </div>
                      </li>
                    </ul>
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>cookieyes-analytics</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>1 year</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          CookieYes sets this cookie to remember the consent of
                          users for the use of cookies in the 'Analytics'
                          category.
                        </div>
                      </li>
                    </ul>
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>cookieyes-advertisement</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>1 year</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          CookieYes sets this cookie to remember the consent of
                          users for the use of cookies in the 'Advertisement'
                          category.
                        </div>
                      </li>
                    </ul>
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>ajs_anonymous_id</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>1 year</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          <p>
                            This cookie is set by Segment to count the number of
                            people who visit a certain site by tracking if they
                            have visited before.
                          </p>
                        </div>
                      </li>
                    </ul>
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>ajs_user_id</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>never</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          <p>
                            This cookie is set by Segment to help track visitor
                            usage, events, target marketing, and also measure
                            application performance and stability.
                          </p>
                        </div>
                      </li>
                    </ul>
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>token</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>session</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          <p>
                            This cookie is a URL-safe JSON web token (JWT)
                            designed to enable the single sign-on (SSO) web
                            browsing experience.
                          </p>
                        </div>
                      </li>
                    </ul>
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>m</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>2 years</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          <p>Stripe sets this cookie to process payments.</p>
                        </div>
                      </li>
                    </ul>
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>cookieyes_privacy_policy_generator_session</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>2 hours</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          <p>
                            CookieYes sets this cookie to identify a session
                            instance for a user.
                          </p>
                        </div>
                      </li>
                    </ul>
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>__stripe_mid</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>1 year</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          <p>Stripe sets this cookie to process payments.</p>
                        </div>
                      </li>
                    </ul>
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>XSRF-TOKEN</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>2 hours</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          This cookie is set by Wix and is used for security
                          purposes.
                        </div>
                      </li>
                    </ul>
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>cookieyes_session</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>2 hours</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          CookieYes sets this cookie to identify a session
                          instance for a user.
                        </div>
                      </li>
                    </ul>
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>__stripe_sid</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>30 minutes</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          <p>Stripe sets this cookie to process payments.</p>
                        </div>
                      </li>
                    </ul>
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>__cfruid</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>session</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          Cloudflare sets this cookie to identify trusted web
                          traffic.
                        </div>
                      </li>
                    </ul>
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>PHPSESSID</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>session</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          <p>
                            This cookie is native to PHP applications and is
                            used to store and identify a users' unique session
                            in order to manage user sessions on the website.
                          </p>
                        </div>
                      </li>
                    </ul>
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>JSESSIONID</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>session</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          The JSESSIONID cookie is used by New Relic to store a
                          session identifier so that New Relic can monitor
                          session counts for an application.
                        </div>
                      </li>
                    </ul>
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>cky-action</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>1 year</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          This cookie is set by CookieYes and is used to
                          remember the action taken by the user.
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div
                className={`cky-accordion ${
                  activeOption === "functional" ? "cky-accordion-active" : ""
                }`}
                id="ckyDetailCategoryfunctional"
                onClick={handleChange("functional")}
              >
                <div className="cky-accordion-item">
                  <div className="cky-accordion-chevron">
                    <i className="cky-chevron-right"></i>
                  </div>
                  <div className="cky-accordion-header-wrapper">
                    <div className="cky-accordion-header">
                      <button
                        className="cky-accordion-btn"
                        aria-label="Functional"
                        data-cky-tag="detail-category-title"
                        style={{ color: "#212121" }}
                      >
                        Functional
                      </button>
                      <div
                        className="cky-switch"
                        data-cky-tag="detail-category-toggle"
                      >
                        <input
                          type="checkbox"
                          name="functional"
                          id="ckySwitchfunctional"
                          checked={cookiesOption.functional}
                          aria-label="Enable Functional"
                          onChange={checkHandler}
                        />
                      </div>
                    </div>
                    <div
                      className="cky-accordion-header-des"
                      data-cky-tag="detail-category-description"
                      style={{ color: "#212121" }}
                    >
                      <p>
                        Functional cookies help perform certain functionalities
                        like sharing the content of the website on social media
                        platforms, collecting feedback, and other third-party
                        features.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="cky-accordion-body">
                  <div
                    className="cky-audit-table"
                    data-cky-tag="audit-table"
                    style={{
                      color: "#212121",
                      borderColor: "#ebebeb",
                      backgroundColor: "#f4f4f4",
                    }}
                  >
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>twk_idm_key</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>session</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          <p>
                            Tawk.to, a live chat functionality, sets this cookie
                            to remember users so that the previous chats can be
                            linked together.
                          </p>
                        </div>
                      </li>
                    </ul>
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>TawkConnectionTime</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>session</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          <p>
                            Tawk.to sets this cookie to remember users so that
                            the previous chats can be linked together.
                          </p>
                        </div>
                      </li>
                    </ul>
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>li_gc</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>2 years</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          <p>
                            LinkedIn sets this cookie to store visitor consents
                            regarding the use of cookies for non-essential
                            purposes.
                          </p>
                        </div>
                      </li>
                    </ul>
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>lang</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>session</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          <p>
                            LinkedIn sets this cookie to remember a user's
                            language settings.
                          </p>
                        </div>
                      </li>
                    </ul>
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>bcookie</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>2 years</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          LinkedIn sets this cookie from LinkedIn share buttons
                          and ad tags to recognize browser ID.
                        </div>
                      </li>
                    </ul>
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>bscookie</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>2 years</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          LinkedIn sets this cookie to store performed actions
                          on the website.
                        </div>
                      </li>
                    </ul>
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>lidc</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>1 day</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          LinkedIn sets the lidc cookie to facilitate data
                          center selection.
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div
                className={`cky-accordion ${
                  activeOption === "analytics" ? "cky-accordion-active" : ""
                }`}
                id="ckyDetailCategoryanalytics"
                onClick={handleChange("analytics")}
              >
                <div className="cky-accordion-item">
                  <div className="cky-accordion-chevron">
                    <i className="cky-chevron-right"></i>
                  </div>
                  <div className="cky-accordion-header-wrapper">
                    <div className="cky-accordion-header">
                      <button
                        className="cky-accordion-btn"
                        aria-label="Analytics"
                        data-cky-tag="detail-category-title"
                        style={{ color: "#212121" }}
                      >
                        Analytics
                      </button>
                      <div
                        className="cky-switch"
                        data-cky-tag="detail-category-toggle"
                      >
                        <input
                          type="checkbox"
                          name="analytical"
                          id="ckySwitchanalytics"
                          checked={cookiesOption.analytical}
                          aria-label="Enable Analytics"
                          onChange={checkHandler}
                        />
                      </div>
                    </div>
                    <div
                      className="cky-accordion-header-des"
                      data-cky-tag="detail-category-description"
                      style={{ color: "#212121" }}
                    >
                      <p>
                        Analytical cookies are used to understand how visitors
                        interact with the website. These cookies help provide
                        information on metrics such as the number of visitors,
                        bounce rate, traffic source, etc.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="cky-accordion-body">
                  <div
                    className="cky-audit-table"
                    data-cky-tag="audit-table"
                    style={{
                      color: "#212121",
                      borderColor: "#ebebeb",
                      backgroundColor: "#f4f4f4",
                    }}
                  >
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>_ga</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>2 years</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          <p>
                            The _ga cookie, installed by Google Analytics,
                            calculates visitor, session, campaign data, and also
                            keeps track of site usage for the site's analytics
                            report. The cookie stores information anonymously
                            and assigns a randomly generated number to recognize
                            unique visitors.
                          </p>
                        </div>
                      </li>
                    </ul>
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>_gid</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>1 day</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          <p>
                            Installed by Google Analytics, _gid cookie stores
                            information on how visitors use a website, while
                            also creating an analytics report of the website's
                            performance. Some of the data that are collected
                            include the number of visitors, their source, and
                            the pages they visit anonymously.
                          </p>
                        </div>
                      </li>
                    </ul>
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>_gat</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>1 minute</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          <p>
                            This cookie is installed by Google Universal
                            Analytics to restrain the request rate and thus
                            limit the collection of data on high-traffic sites.
                          </p>
                        </div>
                      </li>
                    </ul>
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>_octo</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>1 year</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          <p>
                            This cookie is used by Octolytics, GitHub’s internal
                            analytics service, to distinguish unique users and
                            clients.
                          </p>
                        </div>
                      </li>
                    </ul>
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>logged_in</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>1 year</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          <p>
                            This cookie is used to signal to GitHub that the
                            user is already logged in.
                          </p>
                        </div>
                      </li>
                    </ul>
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>_hjTLDTest</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>session</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          To determine the most generic cookie path that has to
                          be used instead of the page hostname, Hotjar sets the
                          _hjTLDTest cookie to store different URL substring
                          alternatives until it fails.
                        </div>
                      </li>
                    </ul>
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>CONSENT</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>2 years</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          YouTube sets this cookie via embedded youtube-videos
                          and registers anonymous statistical data.
                        </div>
                      </li>
                    </ul>
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>_gh_sess</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>session</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          <p>
                            GitHub sets this cookie for temporary applications
                            and the framework states between pages like what
                            step the user is on in a multiple step form.
                          </p>
                        </div>
                      </li>
                    </ul>
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>instap-spses.6a48</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>30 minutes</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          <p>
                            This cookie is used by Instapages to track unique
                            visitors.
                          </p>
                        </div>
                      </li>
                    </ul>
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>instap-spid.6a48</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>2 years</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          <p>
                            This cookie is used by Instapages to track unique
                            visitors.
                          </p>
                        </div>
                      </li>
                    </ul>
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>_it_</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>1 year</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          <p>
                            This cookie sets a unique ID for the session in
                            order to track the visitor behaviour for statistical
                            purposes.
                          </p>
                        </div>
                      </li>
                    </ul>
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>_gcl_au</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>3 months</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          Provided by Google Tag Manager to experiment
                          advertisement efficiency of websites using their
                          services.
                        </div>
                      </li>
                    </ul>
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>_gat_gtag_UA_144842869_1</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>1 minute</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>Set by Google to distinguish users.</div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div
                className={`cky-accordion ${
                  activeOption === "advertisement" ? "cky-accordion-active" : ""
                }`}
                id="ckyDetailCategoryadvertisement"
                onClick={handleChange("advertisement")}
              >
                <div className="cky-accordion-item">
                  <div className="cky-accordion-chevron">
                    <i className="cky-chevron-right"></i>
                  </div>
                  <div className="cky-accordion-header-wrapper">
                    <div className="cky-accordion-header">
                      <button
                        className="cky-accordion-btn"
                        aria-label="Advertisement"
                        data-cky-tag="detail-category-title"
                        style={{ color: "#212121" }}
                      >
                        Advertisement
                      </button>
                      <div
                        className="cky-switch"
                        data-cky-tag="detail-category-toggle"
                      >
                        <input
                          type="checkbox"
                          id="ckySwitchadvertisement"
                          name="advertisement"
                          aria-label="Enable Advertisement"
                          checked={cookiesOption.advertisement}
                          onChange={checkHandler}
                        />
                      </div>
                    </div>
                    <div
                      className="cky-accordion-header-des"
                      data-cky-tag="detail-category-description"
                      style={{ color: "#212121" }}
                    >
                      <p>
                        Advertisement cookies are used to provide visitors with
                        customized advertisements based on the pages you visited
                        previously and to analyze the effectiveness of the ad
                        campaigns.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="cky-accordion-body">
                  <div
                    className="cky-audit-table"
                    data-cky-tag="audit-table"
                    style={{
                      color: "#212121",
                      borderColor: "#ebebeb",
                      backgroundColor: "#f4f4f4",
                    }}
                  >
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>_fbp</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>3 months</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          <p>
                            Facebook sets this cookie to display advertisements
                            when the user is either on Facebook or on a digital
                            platform powered by Facebook advertising, after
                            visiting the website.
                          </p>
                        </div>
                      </li>
                    </ul>
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>__tld__</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>session</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          <p>
                            This cookie is used to track visitors on multiple
                            websites in order to present relevant advertisement
                            based on their preferences.
                          </p>
                        </div>
                      </li>
                    </ul>
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>fr</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>3 months</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          Facebook sets this cookie to show relevant
                          advertisements to users by tracking user behaviour
                          across the web, on sites that have Facebook pixel or
                          Facebook social plugin.
                        </div>
                      </li>
                    </ul>
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>YSC</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>session</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          YSC cookie is set by Youtube and is used to track the
                          views of embedded videos on Youtube pages.
                        </div>
                      </li>
                    </ul>
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>VISITOR_INFO1_LIVE</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>5 months 27 days</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          A cookie set by YouTube to measure bandwidth that
                          determines whether the user gets the new or old player
                          interface.
                        </div>
                      </li>
                    </ul>
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>test_cookie</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>15 minutes</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          The test_cookie is set by doubleclick.net and is used
                          to determine if the user's browser supports cookies.
                        </div>
                      </li>
                    </ul>
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>yt-remote-device-id</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>never</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          YouTube sets this cookie to store the video
                          preferences of the user using embedded YouTube video.
                        </div>
                      </li>
                    </ul>
                    <ul className="cky-cookie-des-table">
                      <li>
                        <div>Cookie</div>
                        <div>yt-remote-connected-devices</div>
                      </li>
                      <li>
                        <div>Duration</div>
                        <div>never</div>
                      </li>
                      <li>
                        <div>Description</div>
                        <div>
                          YouTube sets this cookie to store the video
                          preferences of the user using embedded YouTube video.
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cky-footer-wrapper">
            <span
              className="cky-footer-shadow"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%)",
              }}
            ></span>
            <div
              className="cky-prefrence-btn-wrapper"
              data-cky-tag="detail-buttons"
            >
              <button
                className="cky-btn cky-btn-reject"
                aria-label="Reject All"
                data-cky-tag="detail-reject-button"
                style={{
                  color: "#1863dc",
                  borderColor: "#1863dc",
                  backgroundColor: "transparent",
                }}
                onClick={handleReject}
              >
                Reject All
              </button>
              <button
                className="cky-btn cky-btn-preferences"
                aria-label="Save My Preferences"
                data-cky-tag="detail-save-button"
                style={{
                  color: "#1863dc",
                  borderColor: "#1863dc",
                  backgroundColor: "transparent",
                }}
                onClick={handleCustomize}
              >
                Save My Preferences
              </button>
              <button
                className="cky-btn cky-btn-accept"
                aria-label="Accept All"
                data-cky-tag="detail-accept-button"
                style={{
                  color: "#ffffff",
                  borderColor: "#1863dc",
                  backgroundColor: "#1863dc",
                }}
                onClick={handleAccept}
              >
                Accept All
              </button>
            </div>
            <div
              style={{
                padding: "8px 24px",
                fontSize: "12px",
                fontWeight: 400,
                lineHeight: "20px",
                textAlign: "right",
                borderRadius: "0 0 6px 6px",
                direction: "ltr",
                color: "#293C5B",
                backgroundColor: "#EDEDED",
              }}
              data-cky-tag="detail-powered-by"
            >
              Powered by
              <a
                target="_blank"
                rel="noopener"
                href="https://www.cookieyes.com/product/cookie-consent"
                style={{ marginLeft: "2px" }}
              >
                <img
                  src={LogoNew.src}
                  alt="Cookieyes logo"
                  style={{
                    display: "inline",
                    position: "relative",
                    top: "2px",
                    left: "3px",
                    verticalAlign: "top",
                    width: 50,
                  }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="cky-consent-container cky-box-bottom-left">
      <div
        className="cky-consent-bar"
        data-cky-tag="notice"
        style={{ borderColor: "#f4f4f4", backgroundColor: "#FFFFFF" }}
      >
        {
          <div className="cky-notice">
            <p
              className="cky-title"
              data-cky-tag="title"
              style={{ color: "#212121" }}
            >
              We value your privacy
            </p>
            <div className="cky-notice-group">
              <div
                className="cky-notice-des"
                data-cky-tag="description"
                style={{ color: "#212121" }}
              >
                <p>
                  We use cookies to enhance your browsing experience, serve
                  personalized ads or content, and analyze our traffic. By
                  clicking "Accept All", you consent to our use of
                  cookies.&nbsp;
                  <Link
                    href="/content/[slug]"
                    as={`/content/cookies-setting`}
                    className="cky-policy"
                    aria-label="Read more about cookies setting"
                    rel="noopener"
                    style={{
                      color: "#1863dc",
                      borderColor: "transparent",
                      backgroundColor: "transparent",
                    }}
                    data-cky-tag="readmore-button"
                  >
                    Read More about cookies settings
                  </Link>
                </p>
              </div>
              <div
                className="cky-notice-btn-wrapper"
                data-cky-tag="notice-buttons"
              >
                <button
                  className="cky-btn cky-btn-customize"
                  aria-label="Customize"
                  data-cky-tag="settings-button"
                  style={{
                    color: "#1863dc",
                    borderColor: "#1863dc",
                    backgroundColor: "transparent",
                  }}
                  onClick={() => setIsCustomized(true)}
                >
                  Customize
                </button>
                <button
                  className="cky-btn cky-btn-reject"
                  aria-label="Reject All"
                  data-cky-tag="reject-button"
                  style={{
                    color: "#1863dc",
                    borderColor: "#1863dc",
                    backgroundColor: "transparent",
                  }}
                  onClick={handleReject}
                >
                  Reject All
                </button>
                <button
                  className="cky-btn cky-btn-accept"
                  aria-label="Accept All"
                  data-cky-tag="accept-button"
                  style={{
                    color: "#FFFFFF",
                    borderColor: "#1863dc",
                    backgroundColor: "#1863dc",
                  }}
                  onClick={handleAccept}
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { cookies } = state;
  return {
    cookies,
  };
};

const actionCreators = {
  showCookieBox: cookiesActions.show,
  hideCookieBox: cookiesActions.hide,
};

export default connect(mapStateToProps, actionCreators)(cookies);
