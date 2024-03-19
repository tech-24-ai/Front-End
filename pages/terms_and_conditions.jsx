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

function TermsConditions() {
  return (
    <section className="terms-conditions-portal-section">
      <PageBanner
        titleNode={
          <div>
            <h4>Terms &</h4>
            <h4>Conditions</h4>
          </div>
        }
        image={cookiesImage}
      />
      <Container className="pr-body-container">
        <div className="para-box">
          <p className="para-graph">
            Welcome to {themeConfig.appName}.AI, (“{themeConfig.appName}” or
            “we” or “our” or “this website”). Subject to and without limiting
            the terms of or your obligations under any legally binding contract
            pertaining to the subject matter hereof between{" "}
            {themeConfig.appName} and you or between {themeConfig.appName} and
            your employer or a party for whom you perform services, by using{" "}
            {themeConfig.appName}.ai or any mobile application or other website
            operated by {themeConfig.appName} (each, a “Site”), you agree to
            each of the terms of use set forth herein.
          </p>

          <p className="para-graph">
            {themeConfig.appName} reserves the right to modify these Terms of
            Use at any time without prior notice to you or your organization.
            Your continued use of the Site after any such changes constitutes
            your agreement to follow and be bound by these Terms of Use as
            modified.
          </p>
        </div>

        <div className="body-box">
          <h4 className="step-title">Usage Restrictions</h4>
          <ul className="step-list">
            <li className="step-cookies">
              External citation to the Content on this website is prohibited
              without {themeConfig.appName}’s written permission.
            </li>
            <li className="step-cookies">
              You will not reverse engineer, impair or otherwise bypass any
              technical measure implemented by us to administer and protect our
              website and services.
            </li>
            <li className="step-cookies">
              You will not access, monitor, mirror, or copy any content or
              information from this Site using any scripts, spider, scrapping
              tool or robot or through any other automated means or any manual
              process for any purpose.
            </li>
            <li className="step-cookies">
              You will not mirror, publish, host or otherwise distribute our
              Content for any purpose.
            </li>
            <li className="step-cookies">
              You will not Interfere with, restrict, or inhibit any other person
              from using this website.
            </li>
            <li className="step-cookies">
              You will not impersonate any person or entity that otherwise
              misrepresents your affiliation with a person or entity, including
              {themeConfig.appName}.
            </li>
            <li className="step-cookies">
              You will not infringe on any third party's copyright, patent,
              trademark, trade secret or other proprietary rights or rights of
              publicity or privacy.
            </li>
          </ul>
          <p className="para-graph">
            This above list of restrictions is not exhaustive.{" "}
            {themeConfig.appName} reserves the right to terminate access to your
            account with or without cause or notice for any action that is
            determined as inappropriate to this website or to any other user of
            this website. {themeConfig.appName} may report to law enforcement
            authorities any actions that may be illegal, and any reports it
            receives of such conduct.
          </p>
        </div>

        <div className="para-box">
          <h4 className="para-title">PAYMENT TERMS:</h4>
          <ul className="step-list">
            <li className="step-cookies">
              {themeConfig.appName} uses the PayPal payment gateway for all
              transactions made through the {themeConfig.appName}.com portal.
              Registered users can complete the transaction through a credit
              card, Debit card or through their PayPal account.{" "}
              {themeConfig.appName} does not store any card or account
              information on its servers.
            </li>
            <li className="step-cookies">
              If using a corporate card, you assume all liability and warrant
              that you have the right to use your chosen method of payment for
              the purpose of accessing our Services.
            </li>
            <li className="step-cookies">
              The prices are subject to offers, discounts and changes that may
              be applied at any time. We also reserve the right to alter our
              Subscription Packages at any time
            </li>
            <li className="step-cookies">
              We may at our discretion offer free trials as publicized on the
              Site. You will require to cancel your free trial prior to the
              expiry of the trial period, to stop automatic billing occurring
            </li>
            <li className="step-cookies">
              Please contact support@tech24.ai with a view to resolving the
              dispute prior to making a formal notification to your credit card
              company. You must contact us, stating your reasons for dispute of
              the charge. This will enable us to assess your complaint
              accurately and promptly and, where justified, credit your card
              with the disputed amount in a timely manner to avoid any further
              inconvenience to you.
            </li>
            <li className="step-cookies">
              As the Services are targeted at business customers and not
              consumers, we do not offer any refunds, unless there has been
              evidence provided in an acceptable form of unauthorized activity
              by a third party. You further acknowledge that Subscription
              Packages are not refundable, in whole or part, upon membership
              termination either by you, or us.
            </li>
            <li className="step-cookies">
              We reserve the right to immediately suspend or terminate your
              access to any of the Services (including the Site), without
              notice, and for any reason. We also reserve the right to remove
              your account information, User Content, Uploaded Data, or any
              other data from our Services and any other records at any time at
              our sole discretion. If your access to any of the Services is
              suspended due to any suspected (in our opinion acting reasonably)
              or actual breach of these terms of use, you agree that all
              Subscriptions paid to us are final and all outstanding or pending
              payments will immediately be due.
            </li>
          </ul>
        </div>

        <div className="para-box">
          <h4 className="step-title">LIMITATION OF LIABILITY:</h4>
          <p className="para-graph">
            {themeConfig.appName} DOES NOT WARRANT OR MAKE ANY REPRESENTATIONS
            REGARDING THE USE, VALIDITY, ACCURACY OR RELIABILITY OF THIS WEBSITE
            ({themeConfig.appName}.COM) OR THE RESULTS OF THE USE OF THE
            WEBSITE. IN NO EVENT SHALL {themeConfig.appName}
            BE LIABLE FOR ANY DAMAGES, INCLUDING THOSE ARISING AS A RESULT OF
            {themeConfig.appName}'S NEGLIGENCE, WHETHER THOSE DAMAGES ARE
            DIRECT, CONSEQUENTIAL, INCIDENTAL, OR SPECIAL, FLOWING FROM YOUR USE
            OF OR INABILITY TO USE THE WEBSITE OR INFORMATION PROVIDED HEREWITH
            OR RESULTS OF THE WEBSITE.THE ULTIMATE RESPONSIBILITY FOR ACHIEVING
            THE RESULTS REMAINS WITH YOU.
          </p>
        </div>
      </Container>
    </section>
  );
}

export default TermsConditions;
