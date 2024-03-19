import React from "react";
import PageBanner from "../components/card/pageBanner";
import ResearchCard from "../components/card/researchCard";
import cookiesImage from "../public/new_images/cookies-bg.svg";
import researchIcon from "../public/new_images/research-icon.svg";
import templateIcon from "../public/new_images/template-icon.svg";
import toolIcon from "../public/new_images/tools-calculator-icon.svg";
import { Container, Col, Row } from "reactstrap";
import Categories from "../components/categories/legal";
import Card from "../components/card/CategoryCard";
import {
  MarketTrends,
  InDepthProduct,
  Operational,
  Technology,
  Policy,
  Calculator,
  Description,
  Strategy,
  ToolKits,
  Chat,
  Clock,
  Cursor,
  User,
} from "../components/icons";
import themeConfig from "../config/themeConfig";

function PrivacyPolicy() {
  return (
    <section className="privacy-policy-portal-section">
      <PageBanner
        titleNode={
          <div>
            <h4>Privacy</h4>
            <h4>Policy</h4>
          </div>
        }
        image={cookiesImage}
      />
      <Container className="pr-body-container">
        <div className="para-box">
          <h4 className="para-title">Effective Date – September 2022</h4>
          <p className="para-graph">
            This privacy policy sets out how {themeConfig.appName} uses and
            protects any information that you give {themeConfig.appName} when
            you use this website.
          </p>
          <p className="para-graph">
            {themeConfig.appName} is committed to ensuring that your privacy is
            protected. Should we ask you to provide certain information by which
            you can be identified when using this website, then you can be
            assured that it will only be used in accordance with this privacy
            statement.
          </p>
          <p className="para-graph">
            {themeConfig.appName} may change this policy from time to time by
            updating this page. We encourage you to visit this page regularly.
          </p>
        </div>

        <div className="para-box">
          <h4 className="para-title">What we collect</h4>
          <p className="para-graph">
            When you register or log-in with your LinkedIn account,{" "}
            {themeConfig.appName}
            receives the following information: first name, last name, profile
            photo, and profile URL. When you login after registering with us
            directly or you are contacting us for consulting services through
            our website, we may collect personal information such as your full
            name, business email address, your company name, and your telephone
            number. If you are vendor reaching out to us for inclusion or
            correction, we collect your full name, business email address, your
            company name and location. Payment for subscription services can be
            made using a credit card or PayPal account. In such cases{" "}
            {themeConfig.appName}
            does not collect your personal data connected to your payment card
            or PayPal account.
          </p>
        </div>

        <div className="para-box">
          <h4 className="para-title">
            What we do with the information we gather
          </h4>
          <p className="para-graph">
            We require this information to understand your needs and provide you
            with a better service. We may periodically send emails or contact
            you via phone about our new services and promotions.{" "}
            {themeConfig.appName} may also use & share your personal information
            to investigate or respond to illegal or suspected illegal activities
            on our website. {themeConfig.appName} may share your organization
            name and interested services with technology providers.
          </p>
        </div>

        <div className="para-box">
          <h4 className="para-title">How we use cookies</h4>
          <p className="para-graph">
            A cookie is a small file which asks permission to be placed on your
            computer's hard drive. Once you agree, the file is added, and the
            cookie helps analyze web traffic or lets you know when you visit a
            particular site. Cookies allow web applications to respond to you as
            an individual. The web application can tailor its operations to your
            needs, likes and dislikes by gathering and remembering information
            about your preferences. We use traffic log cookies to identify which
            pages are being used. This helps us analyze data about webpage
            traffic and improve our website to tailor it to customer needs. We
            only use this information for statistical analysis purposes and then
            the data is removed from the system. Overall, cookies help us
            provide you with a better website, by enabling us to monitor which
            pages you find useful and which you do not. A cookie in no way gives
            us access to your computer or any information about you, other than
            the data you choose to share with us. You can choose to accept or
            decline cookies. Most web browsers automatically accept cookies, but
            you can usually modify your browser setting to decline cookies if
            you prefer. This may prevent you from taking full advantage of the
            website.
          </p>
        </div>

        <div className="para-box">
          <h4 className="para-title">Links to other websites</h4>
          <p className="para-graph">
            Our website may contain links to other websites of interest.
            However, once you have used these links to leave our site, you
            should note that we do not have any control over that other website.
            Therefore, we cannot be responsible for the protection and privacy
            of any information which you provide whilst visiting such sites and
            such sites are not governed by this privacy statement. You should
            exercise caution and look at the privacy statement applicable to the
            website in question.
          </p>
        </div>

        <div className="para-box">
          <h4 className="para-title">Controlling your personal information</h4>
          <p className="para-graph">
            This Privacy Policy is designed to comply with the laws of the
            European Union and California, USA. We will not sell, distribute, or
            lease your personal information to our partners or third parties
            unless you have consented to do so. If you would like a copy of the
            information held on you, or want to opt-out of marketing
            communications, or want to restrict the use of your personal
            information, please write to support@tech24.com.{" "}
            {themeConfig.appName} has implemented technical, administrative,
            security measures designed to help prevent unauthorized access.
            However, despite these measures, data transmissions over the
            Internet cannot be considered fully secure. Therefore,{" "}
            {themeConfig.appName} cannot guarantee or warrant the security of
            any information you transmit while using our website. We are not
            responsible for protecting any personal data that we share with a
            third-party based on an account connection that you have authorized.
          </p>
        </div>
      </Container>
    </section>
  );
}

export default PrivacyPolicy;
