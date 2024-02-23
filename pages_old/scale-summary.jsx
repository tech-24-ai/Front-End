import React, { useState } from "react";
import {
  Container,
  FormGroup,
  Input,
  Tooltip,
  Button,
  Row,
  Col,
  CustomInput,
} from "reactstrap";
import Link from "next/link";
import ContentTitle from "../components/contentTitle";
import AngleUp from "../public/images/angleup.svg";
import AngleDown from "../public/images/angledown.svg";
import Navigation from "../public/images/datacenter/navigation.svg";
import Icon from "react-icons-kit";
import { chevronRight } from "react-icons-kit/feather/chevronRight";

function DataScale() {
  const [search, setSearch] = useState(false);
  const [located, setLocated] = useState("India");
  const [navigation, setNavigation] = useState(false);

  const locatedClick = () => setNavigation(!navigation);

  const iconClick = () => {
    setSearch(!search);
  };

  return (
    <section className="datascale-wrapper">
      <Container>
        <ContentTitle path={true} />
        <div className="datascale-block">
          <div className="datascale-progress-wrapper">
            <div className="datascale-progress">
              <Row>
                <Col md={4} className="progress-col">
                  <div className="scale-wrapper scale-progress active">
                    <h5>Scale</h5>
                    <div className="progress-menu">
                      <span className="completed">1</span>
                      <span className="completed selected">2</span>
                      <span className="completed">3</span>
                      <span className="completed">4</span>
                      <span className="completed">5</span>
                    </div>
                  </div>
                </Col>
                <Col md={4} className="progress-col">
                  <div className="environment-wrapper scale-progress active">
                    <h5>Environment</h5>
                    <div className="progress-menu">
                      <span className="completed">1</span>
                      <span className="completed">2</span>
                      <span className="completed">3</span>
                      <span className="completed">4</span>
                      <span className="completed">5</span>
                    </div>
                  </div>
                </Col>
                <Col md={4} className="progress-col">
                  <div className="additional-wrapper scale-progress active">
                    <h5>Additional Information</h5>
                    <div className="progress-menu">
                      <span className="completed">1</span>
                      <span className="completed">2</span>
                      <span className="completed">3</span>
                      <span className="completed">4</span>
                      <span className="completed">5</span>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <div className="datascale-content">
            <div className="input-searchbox">
              <h4 className="datascale-title">
                Where are you located?{" "}
                <img src={Navigation.src} id="located" className="navigation" />
                <Tooltip
                  placement="right"
                  className="tooltip-located"
                  isOpen={navigation}
                  autohide={false}
                  target="located"
                  toggle={locatedClick}
                >
                  You can click here to auto locate country
                </Tooltip>
              </h4>
              <div className={`select-searchbox ${search ? "open" : ""}`}>
                <FormGroup>
                  <Input
                    type="text"
                    value={located}
                    placeholder="Select your country"
                    autoComplete="off"
                  />
                  <div className="search-icon" onClick={iconClick}>
                    <img src={AngleUp.src} className="angleup" />
                    <img src={AngleDown.src} className="angledown" />
                  </div>
                </FormGroup>
                <div className="search-list-box">
                  <ul>
                    <li
                      onClick={() => {
                        setLocated("Honduras"), iconClick();
                      }}
                    >
                      Honduras
                    </li>
                    <li
                      onClick={() => {
                        setLocated("Hungary"), iconClick();
                      }}
                    >
                      Hungary
                    </li>
                    <li
                      onClick={() => {
                        setLocated("Iceland"), iconClick();
                      }}
                    >
                      Iceland
                    </li>
                    <li
                      onClick={() => {
                        setLocated("India"), iconClick();
                      }}
                    >
                      India
                    </li>
                    <li
                      onClick={() => {
                        setLocated("Indonesia"), iconClick();
                      }}
                    >
                      Indonesia
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="site-btn margin">
              <Link href="/">
                <a className="back-btn">Back</a>
              </Link>
              <Link href="/">
                <a className="next-btn">Next</a>
              </Link>
            </div>
            <div className="site-back-summary">
              <Link href="/scale">
                <a>
                  Back to summary <Icon size={20} icon={chevronRight} />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default DataScale;
