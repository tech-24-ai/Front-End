import React, { Component } from "react";
import { withRouter } from "next/router";
import { Container } from "reactstrap";
import BodyBackgroundColor from "../components/style/bodyBackgroundColor";
import Link from "next/link";
import Head from "next/head";

class Info extends Component {
  render() {
    return (
      <section className="connect-vendor-wrapper connect-inclusion-wrapper">
        <Head>
          <meta
            name="viewport"
            content="width=device-width, minimum-scale=1.0, maximum-scale=5.0, user-scalable=no"
          />
          <meta name="title" content="Legal" />
          <meta
            name="description"
            content="Learn more about our Terms & Conditions, Privacy policy and cookie settings"
          />
          <meta
            name="keywords"
            content="Legal, Terms & Conditions, Privacy policy and cookie settings"
          />
        </Head>
        <Container>
          <div className="site-title">
            <h5>Legal</h5>
          </div>

          <div style={{ marginTop: "10px" }}>
            <ul>
              <li>
                <Link
                  href="/content/[slug]"
                  as={`/content/terms-and-conditions`}
                  replace
                >
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/content/[slug]"
                  as={`/content/privacy-and-policy`}
                  replace
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/content/[slug]"
                  as={`/content/cookies-setting`}
                  replace
                >
                  Cookies Setting
                </Link>
              </li>
            </ul>
          </div>
        </Container>
        <BodyBackgroundColor color="#F4F6F6" />
      </section>
    );
  }
}

export default withRouter(Info);
