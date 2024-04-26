import React, { Fragment, useEffect, useState } from "react";
import { crudActions } from "../../_actions";
import { connect } from "react-redux";
import { withRouter, useRouter } from "next/router";
import { Container, Button, Pagination } from "reactstrap";
import ResearchCard from "../../components/marketResearch/ResearchCard";
import moment from "moment";
import { ShareAltOutlined } from "@ant-design/icons";
import CustomBreadcrumb from "../../components/breadcrumbs/Breadcrumb";
import { MobileView, BrowserView } from "react-device-detect";
import BodyBackgroundColor from "../../components/style/bodyBackgroundColor";

function Detail({ getAllCrud, research_detail, router, downloadDocument }) {
  const slug = router.query.slug;

  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");

  useEffect(() => {
    getAllCrud("research_detail", `market_research/show/${slug}`, {});
  }, []);

  useEffect(() => {
    if (research_detail?.document_content_type == 4) {
      const editorData = JSON.parse(research_detail?.description);

      if (editorData?.css) {
        setCss(editorData.css);
      }
      if (editorData?.html) {
        setHtml(editorData.html);
      }
    } else {
      setHtml(research_detail?.description);
    }
  }, [research_detail]);

  if (!research_detail) {
    return false;
  }

  const handleDocumentDownload = ({ id, extension, name }) => {
    downloadDocument(id, `${name}.${extension}`);
  };

  return (
    <section className="latest-research research-detail-section">
      <Container className="research-section">
        <CustomBreadcrumb
          data={[
            { label: "Market Research", url: "/market-research" },
            { label: "Recently Added", url: "/market-research/research-list" },
            { label: research_detail?.name, url: "" },
          ]}
        />
        <br />
        <div className="research-detail-heading">
          <h5 className="title">{research_detail?.name}</h5>
          <div className="date-section">
            <div className="date">
              {moment(research_detail?.created_at).format("LL")}
            </div>
            <div className="custom-divider"></div>
            <div className="date share-btn">
              <ShareAltOutlined /> Share
            </div>
          </div>
        </div>
        <BrowserView>
          <div className="research-content-wrapper">
            <div className="research-content-section">
              <div
                dangerouslySetInnerHTML={{
                  __html: html,
                }}
              ></div>
              {(research_detail?.document_content_type == 1 ||
                research_detail?.document_content_type == 2) && (
                <iframe
                  src={research_detail?.url}
                  height="500"
                  width="100%"
                  frameBorder="0"
                  allowFullScreen=""
                  title="market research"
                  className="mt-4"
                />
              )}
            </div>
            <div className="related-research-section">
              <div className="download-report-card">
                <h6 className="heading">{research_detail?.name}</h6>
                <p className="content">{research_detail?.details}</p>
                <button
                  className="custom-btn with-bg"
                  onClick={() => handleDocumentDownload(research_detail)}
                  style={{
                    display:
                      research_detail?.document_content_type == 3
                        ? "block"
                        : "none",
                  }}
                >
                  Download Report
                </button>
              </div>
              {research_detail?.related_research.length > 0 && (
                <Fragment>
                  <h6 className="heading">Related Research</h6>
                  <div className="related-research-wrapper">
                    {research_detail?.related_research.map((data, index) => (
                      <ResearchCard data={data} key={index} />
                    ))}
                  </div>
                </Fragment>
              )}
            </div>
          </div>
        </BrowserView>
        <MobileView>
          <div className="research-content-wrapper">
            <div className="download-report-card">
              <h6 className="heading">{research_detail?.name}</h6>
              <p className="content">{research_detail?.details}</p>
              <button
                className="custom-btn with-bg"
                style={{
                  display:
                    research_detail?.document_content_type == 3
                      ? "block"
                      : "none",
                }}
              >
                Download Report
              </button>
            </div>
            <div className="research-content-section">
              <div
                dangerouslySetInnerHTML={{
                  __html: html,
                }}
              ></div>
              {(research_detail?.document_content_type == 1 ||
                research_detail?.document_content_type == 2) && (
                <iframe
                  src={research_detail?.url}
                  height="300"
                  width="100%"
                  frameborder="0"
                  allowfullscreen=""
                  title="market research"
                  className="mt-4"
                />
              )}
            </div>
            <div className="related-research-section">
              {research_detail?.related_research.length > 0 && (
                <Fragment>
                  <h6 className="heading">Related Research</h6>
                  <div className="related-research-wrapper">
                    {research_detail?.related_research.map((data, index) => (
                      <ResearchCard data={data} key={index} />
                    ))}
                  </div>
                </Fragment>
              )}
            </div>
          </div>
        </MobileView>
      </Container>
      {css && <BodyBackgroundColor style={css} />}
    </section>
  );
}

const mapStateToProps = (state) => {
  const { research_detail } = state;
  return {
    research_detail,
  };
};

const actionCreators = {
  getAllCrud: crudActions._getAll,
  downloadInvoice: crudActions._downloadWithPost,
  downloadDocument: crudActions._download,
};

export default withRouter(connect(mapStateToProps, actionCreators)(Detail));
