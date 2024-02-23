import React, { Component } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { Container } from "reactstrap";
import BodyBackgroundColor from "../components/style/bodyBackgroundColor";

class Custom404 extends Component {
  render() {
    return (
      <section>
        <Container>
          <BrowserView>
            <h3 style={{textAlign:'center',marginBottom:'0', marginTop: `${window.innerHeight/4}px` }}>404 - Page Not Found</h3>
          </BrowserView>
          <MobileView>
            <h3 style={{textAlign:'center',marginBottom:'0', marginTop: `${window.innerHeight/3.5}px` }}>404<br />Page Not Found</h3>
          </MobileView>
        </Container>
        <BodyBackgroundColor color="#d4e0fe" />
      </section>
    );
  }
}

export default Custom404;
