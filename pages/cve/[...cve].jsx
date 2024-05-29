import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { loaderActions } from "../../_actions";
import BodyBackgroundColor from "../../components/style/bodyBackgroundColor";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  Container,
} from "reactstrap";
import moment from "moment";
import { useRouter } from "next/router";
import Link from "next/link";

const index = ({ showLoader, hideLoader }) => {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("1");
  const [errorMsg, setErrorMsg] = useState("");

  const router = useRouter();

  // useEffect(() => {
  //   const data = localStorage.getItem("vulnerability");
  //   const { asPath, back, query } = router;
  //   console.log("router", query);
  //   if (data) {
  //     setData(JSON.parse(data));
  //   } else {
  //     window.location.replace("/");
  //   }
  // }, []);

  useEffect(async () => {
    const { asPath, back, query } = router;
    if (query && query.cve.length) {
      showLoader();
      await axios
        .get(
          `https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=${query.cve[0]}`
        )
        .then((res) => {
          const { vulnerabilities, totalResults } = res.data;
          let list = [];
          vulnerabilities.map(({ cve }) => {
            const {
              descriptions,
              metrics,
              id,
              published,
              lastModified,
              configurations,
              references,
              weaknesses,
              sourceIdentifier,
            } = cve;
            let data = {
              name: id,
              published: published,
              updated: lastModified,
              configurations: configurations,
              references: references,
              source: sourceIdentifier,
              description:
                descriptions && descriptions.filter((d) => d.lang === "en")[0],
            };

            if (Object.keys(metrics).length) {
              let LatestSeverity = Object.keys(metrics).sort((a, b) => {
                let severityOne = a.toLocaleLowerCase();
                let severityTwo = b.toLocaleLowerCase();

                if (severityOne > severityTwo) {
                  return 1;
                }
                if (severityOne < severityTwo) {
                  return -1;
                }
              });
              LatestSeverity = LatestSeverity[LatestSeverity.length - 1];
              const { cvssData, baseSeverity } = metrics[LatestSeverity][0];
              if (baseSeverity === undefined) {
                data["severity"] = cvssData.baseSeverity;
              } else {
                data["severity"] = baseSeverity;
              }
              // data["severity"] = metrics[LatestSeverity][0].cvssData.baseSeverity;
            }

            if (weaknesses && weaknesses.length) {
              const { description } = weaknesses[0];
              let type = description.filter((d) => d.lang === "en")[0];
              data["type"] = type.value;
            }
            setData(data);
          });

          hideLoader();
        })
        .catch((error) => {
          console.log(error);
          setErrorMsg("Oops, something went wrong..!");
          setData(null);
          hideLoader();
        });
    }
  }, [router]);

  const tabs = [
    {
      id: 1,
      name: "Information",
    },
    {
      id: 2,
      name: "CPEs",
    },
  ];
  const severityColor = {
    LOW: "#ffc701",
    MEDIUM: "#ff8d3c",
    HIGH: "#e42329",
    CRITICAL: "#a51c49",
    DEFAULT: "#415465",
  };

  return (
    <Container style={{ marginTop: "2rem" }}>
      <div className="vulnerability-detail-section site-title">
        <div style={{ display: "flex" }}>
          <h5 style={{ display: "flex" }}>
            <Link href={{ pathname: "/cves" }}>
              <a style={{ display: "flex" }}>
                <div className="mr-span">Vulnerabilities</div>
                <div style={{ margin: "0px 4px", color: "#70798b" }}>{">"}</div>
              </a>
            </Link>
            {data && (
              <a>
                <div className="mr-respan">{data.name}</div>
              </a>
            )}
          </h5>
        </div>
        {errorMsg && (
          <div
            style={{
              textAlign: "center",
              marginTop: "5rem",
              fontSize: "18px",
              fontWeight: "500",
              color: "lightgray",
              userSelect: "none",
            }}
          >
            {errorMsg}
          </div>
        )}
        {data && (
          <Fragment>
            <div className="top-title-section">
              <h2 className="name-title">{data.name}</h2>
              <h4
                className="severity"
                style={{
                  backgroundColor: severityColor[data.severity],
                }}
              >
                {data.severity}
              </h4>
            </div>

            <Nav tabs>
              {tabs.map((tab, key) => (
                <NavItem key={key}>
                  <NavLink
                    className={activeTab == tab.id ? "active" : null}
                    onClick={() => {
                      setActiveTab(`${tab.id}`);
                    }}
                  >
                    {tab.name}
                  </NavLink>
                </NavItem>
              ))}
            </Nav>
          </Fragment>
        )}

        {data && (
          <TabContent activeTab={activeTab} style={{ marginTop: "2rem" }}>
            <TabPane tabId="1">
              <Row>
                <Col sm="8">
                  <h4 className="heading">Description</h4>
                  <p>{data.description.value}</p>
                  <h4 className="heading">References</h4>

                  {data.references &&
                    data.references.map((ref, redIndex) => (
                      <p key={redIndex}>
                        <a className="reference" target="_blank" href={ref.url}>
                          {ref.url}
                        </a>
                      </p>
                    ))}
                </Col>
                <Col sm="4" className="details-section">
                  <h4 className="heading">Details</h4>
                  <div>
                    <p>
                      <strong>Source: </strong>
                      <span>{data.source}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Published: </strong>
                      <span>{moment(data.published).format("DD-MM-YYYY")}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Updated: </strong>
                      <span>{moment(data.updated).format("DD-MM-YYYY")}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Type: </strong>
                      <span>{data.type}</span>
                    </p>
                  </div>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="12">
                  <h3 className="title">Vulnerable Software</h3>
                  {data.configurations &&
                    data.configurations.map((config, index1) => (
                      <section key={index1}>
                        <h5 className="config">Configuration {index1 + 1}</h5>
                        <p>{config.operator}</p>
                        {config.nodes &&
                          config.nodes.map((node, index2) => (
                            <section key={index2}>
                              <p>{node.operator}</p>
                              {node.cpeMatch &&
                                node.cpeMatch.map((cpe, index3) => (
                                  <p key={index3}>
                                    <a
                                      rel="noopener noreferrer"
                                      target="_blank"
                                      href="#"
                                      onClick={(event) =>
                                        event.preventDefault()
                                      }
                                    >
                                      {cpe.criteria}
                                    </a>
                                  </p>
                                ))}
                            </section>
                          ))}
                      </section>
                    ))}
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        )}
      </div>
    </Container>
  );
};

const actionCreators = {
  showLoader: loaderActions.show,
  hideLoader: loaderActions.hide,
};

export default connect(null, actionCreators)(index);
