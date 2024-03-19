import React, { useState, useEffect, Fragment } from "react";
import Router from "next/router";
import axios from "axios";
import { connect } from "react-redux";
import { loaderActions } from "../_actions";
import ReactPaginate from "react-paginate-next";
import { Input, Select } from "antd";
import {
  isMobile,
  isTablet,
  isBrowser,
  MobileView,
  BrowserView,
} from "react-device-detect";
import { Row, Col, Container } from "reactstrap";
import { useRouter } from "next/router";
import BodyBackgroundColor from "../components/style/bodyBackgroundColor";
import moment from "moment";

const index = ({ showLoader, hideLoader }) => {
  const [data, setData] = useState(null);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [startIndex, setStartIndex] = useState(0);
  const [keywordSearch, setKeywordSearch] = useState(null);
  const [totalResults, setTotalResults] = useState(10);
  const [selectedTimeline, setSelectedTimeline] = useState(1);
  const [criticalFilter, setCriticalFilter] = useState("ALL");
  const { Search } = Input;

  const router = useRouter();

  const fetchData = async () => {
    let searchString = `resultsPerPage=${resultsPerPage}&startIndex=${startIndex}`;
    if (keywordSearch) {
      searchString = `${searchString}&keywordSearch=${keywordSearch}`;
    }
    //&virtualMatchString=${keywordSearch}
    if (selectedTimeline != 1) {
      let [{ date }] = timelineFilterOptions.filter(
        (t) => t.value === selectedTimeline
      );
      const { startDate, endDate } = date;
      searchString = `${searchString}&pubStartDate=${startDate}&pubEndDate=${endDate}`;
    }

    if (criticalFilter != "ALL") {
      searchString = `${searchString}&cvssV3Severity=${criticalFilter}`;
    }

    showLoader();
    await axios
      .get(`https://services.nvd.nist.gov/rest/json/cves/2.0?${searchString}`)
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

          list.push(data);
        });
        setData(list);
        setTotalResults(totalResults);

        hideLoader();
      })
      .catch((error) => {
        console.log(error);
        setData([]);
        setTotalResults(0);
        hideLoader();
      });
  };

  useEffect(() => {
    fetchData();
  }, [startIndex, selectedTimeline, criticalFilter]);

  useEffect(() => {
    if (keywordSearch == null) {
      return false;
    }

    // const timerId = setTimeout(() => {
    //   fetchData();
    //   // make a request after 2 second since there's no typing
    // }, 2000);

    // return () => {
    //   clearTimeout(timerId);
    // };
  }, [keywordSearch]);

  const handleChangePage = ({ selected }) => {
    setStartIndex(selected);
  };
  const handleRedirect = (name) => {
    const rowData = data.filter((d) => d.name == name);
    localStorage.setItem("vulnerability", JSON.stringify(rowData[0]));

    // const win = window.open(`/cve/${rowData[0].name}`, "_blank");
    // win.focus();
    Router.push({
      pathname: `/cve/${rowData[0].name}`,
      //pathname: `/${seoUrl.replace(/&/g, "and")}`,
    });
  };

  const dateManipulator = (type = "None", value = 0, calendarType = "days") => {
    let currentTimestamp = moment();
    let startTimestamp = moment();

    if (type == "add") {
      startTimestamp.add(value, calendarType);
    }
    if (type == "subtract") {
      startTimestamp.subtract(value, calendarType);
    }
    const newDate = {
      startDate: startTimestamp.format("YYYY-MM-DD[T]00:00:00"),
      endDate: currentTimestamp.format("YYYY-MM-DD[T]00:00:00"),
    };
    return newDate;
  };

  const severityColor = {
    LOW: "#ffc701",
    MEDIUM: "#ff8d3c",
    HIGH: "#e42329",
    CRITICAL: "#a51c49",
    DEFAULT: "#415465",
  };

  const timelineFilterOptions = [
    { value: 1, label: "No range" },
    {
      value: 2,
      label: "Last 30 Days",
      date: dateManipulator("subtract", 30, "days"),
    },
    {
      value: 3,
      label: "Last 60 Days",
      date: dateManipulator("subtract", 60, "days"),
    },
    {
      value: 4,
      label: "Last 90 Days",
      date: dateManipulator("subtract", 90, "days"),
    },
    {
      value: 5,
      label: "Last 120 Days",
      date: dateManipulator("subtract", 120, "days"),
    },
  ];
  const criticalityOptions = [
    { value: "ALL", label: "All" },
    { value: "LOW", label: "LOW" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HIGH", label: "HIGH" },
    { value: "CRITICAL", label: "CRITICAL" },
  ];

  // fetch data after click
  const onSearch = (value) => {
    fetchData();
  };

  return (
    <Container style={{ marginTop: "2rem" }}>
      <div className="site-title">
        <h5
          style={{
            fontSize: "20px",
          }}
        >
          Vulnerabilities
        </h5>
      </div>
      <div
        className="documentListContainer"
        style={{ marginTop: isBrowser ? "40px" : "20px" }}
      >
        <div className="vulnerability-section">
          <BrowserView>
            <div className="datatable mt-2">
              <div className="react-bootstrap-table">
                {data && (
                  <div className="documentSearchPanel">
                    <div
                      style={{
                        width: "35%",
                      }}
                    >
                      <label className="sub-title">Search</label>
                      <Search
                        placeholder="Search vulnerability by Name or Description"
                        onChange={(e) => setKeywordSearch(e.target.value)}
                        value={keywordSearch}
                        size="large"
                        onSearch={onSearch}
                      />
                    </div>
                    <div style={{ marginLeft: "10px" }}>
                      <label className="sub-title">Timeline Filter</label>
                      <Select
                        size="large"
                        style={{
                          width: 200,
                        }}
                        placeholder="Select Timeline"
                        optionFilterProp="children"
                        options={timelineFilterOptions}
                        onChange={setSelectedTimeline}
                        value={selectedTimeline}
                      />
                    </div>
                    <div style={{ marginLeft: "10px" }}>
                      <label className="sub-title">Criticality Filter</label>
                      <Select
                        size="large"
                        style={{
                          width: 200,
                        }}
                        placeholder="Select Filter"
                        optionFilterProp="children"
                        options={criticalityOptions}
                        onChange={setCriticalFilter}
                        value={criticalFilter}
                      />
                    </div>
                  </div>
                )}
                <p
                  style={{
                    color: "#0079dd",
                    marginLeft: "12px",
                    fontSize: "17px",
                  }}
                >
                  Newest CVEs
                </p>
                {data && data.length > 0 ? (
                  <table className="table table-bordered document-table">
                    <thead>
                      <tr
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <th style={{ mixWidth: "150px", textAlign: "left" }}>
                          Name
                        </th>
                        <th style={{ width: "730px" }}>Description</th>
                        <th style={{ mixWidth: "80px", textAlign: "right" }}>
                          Severity
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data &&
                        data.map((row, key) => {
                          hideLoader();
                          return (
                            <tr
                              key={key}
                              onClick={() => handleRedirect(row.name)}
                            >
                              <td
                                style={{
                                  mixWidth: "150px",
                                  textAlign: "left",
                                  color: "#0079dd",
                                  fontWeight: 600,
                                }}
                              >
                                {row.name}
                              </td>
                              <td style={{ width: "800px" }} id="description">
                                {row.description.value}
                              </td>
                              <td
                                style={{
                                  mixWidth: "80px",
                                  textAlign: "right",
                                  fontWeight: "500",
                                  color: severityColor[row.severity],
                                }}
                              >
                                {row.severity}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                ) : (
                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "3rem",
                      fontSize: "18px",
                      fontWeight: "500",
                      color: "lightgray",
                      userSelect: "none",
                    }}
                  >
                    {data && data.length == 0 ? "No Document Found" : ""}
                  </div>
                )}
              </div>

              {totalResults > 10 && (
                <div className="pagination d-flex justify-content-between align-items-center">
                  <div></div>
                  <div className="issuesPagination">
                    <div style={{ marginRight: "0.5rem" }}>
                      <ReactPaginate
                        pageCount={totalResults}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handleChangePage}
                        nextLabel="Next"
                        previousLabel="Previous"
                      />
                    </div>
                  </div>
                </div>
              )}
              {data && (
                <p
                  style={{
                    fontWeight: "500",
                    fontSize: "17px",
                    marginTop: "1.5rem",
                  }}
                >
                  This product uses data from the NVD API but is not endorsed or
                  certified by the NVD
                </p>
              )}
            </div>
          </BrowserView>
          <MobileView>
            <div
              className="documentSearchPanel"
              style={{ flexDirection: "column" }}
            >
              <Search
                placeholder="Search vulnerability by Name or Description"
                onChange={(e) => setKeywordSearch(e.target.value)}
                style={{
                  width: "100%",
                  fontSize: "13px",
                }}
                size="large"
                onSearch={onSearch}
              />
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Select
                  size="large"
                  style={{
                    width: "48%",
                    height: "40px",
                  }}
                  placeholder="Select Timeline"
                  optionFilterProp="children"
                  options={timelineFilterOptions}
                  onChange={setSelectedTimeline}
                  value={selectedTimeline}
                />
                <Select
                  size="large"
                  style={{
                    width: "48%",
                    height: "40px",
                  }}
                  placeholder="Select Filter"
                  optionFilterProp="children"
                  options={criticalityOptions}
                  onChange={setCriticalFilter}
                  value={criticalFilter}
                />
              </div>
            </div>
            <p
              style={{
                color: "#0079dd",
                marginLeft: "12px",
                fontSize: "17px",
              }}
            >
              Newest CVEs
            </p>
            {data && data.length > 0 ? (
              <Fragment>
                {data &&
                  data.map((row, key) => {
                    hideLoader();
                    return (
                      <Row
                        key={key}
                        className="d-flex flex-column documentMV"
                        onClick={() => handleRedirect(row.name)}
                      >
                        <Col className="documentCardHead-mobile">
                          <div>
                            <h5 className="cve-name">{row.name}</h5>

                            <h4
                              className="severity"
                              style={{
                                backgroundColor: severityColor[row.severity],
                              }}
                            >
                              {row.severity}
                            </h4>
                          </div>
                        </Col>
                        <Col className="documentCardBody-mobile">
                          <p className="cve-description">
                            {row.description.value}
                          </p>
                        </Col>
                      </Row>
                    );
                  })}
              </Fragment>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  marginTop: "3rem",
                  fontSize: "18px",
                  fontWeight: "500",
                  color: "lightgray",
                  userSelect: "none",
                }}
              >
                {data && data.length == 0 ? "No Document Found" : ""}
              </div>
            )}
            {totalResults > 10 && (
              <div className="pagination d-flex justify-content-between align-items-center">
                <div></div>
                <div className="issuesPagination">
                  <div>
                    <ReactPaginate
                      pageCount={totalResults}
                      marginPagesDisplayed={0}
                      pageRangeDisplayed={3}
                      onPageChange={handleChangePage}
                      nextLabel="Next"
                      previousLabel="Previous"
                    />
                  </div>
                </div>
              </div>
            )}
            {data && (
              <p
                style={{
                  fontWeight: "500",
                  fontSize: "17px",
                  marginTop: "1rem",
                }}
              >
                This product uses data from the NVD API but is not endorsed or
                certified by the NVD
              </p>
            )}
          </MobileView>
        </div>
      </div>
    </Container>
  );
};

// const mapStateToProps = (state) => {
//   const { authentication, get_subscription } = state;
//   return {
//     get_subscription,
//     authentication,
//   };
// };

const actionCreators = {
  showLoader: loaderActions.show,
  hideLoader: loaderActions.hide,
};

export default connect(null, actionCreators)(index);
