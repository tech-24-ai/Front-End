import React, { Fragment, useEffect, useState } from "react";
import { crudActions } from "../../_actions";
import { connect } from "react-redux";
import { withRouter, useRouter } from "next/router";
import { Container, Button, Pagination } from "reactstrap";
import ResearchCard from "../../components/marketResearch/ResearchCard";
import moment from "moment";
import { ShareAltOutlined, SaveOutlined } from "@ant-design/icons";
import CustomBreadcrumb from "../../components/breadcrumbs/Breadcrumb";
import { MobileView, BrowserView, isMobile } from "react-device-detect";
import BodyBackgroundColor from "../../components/style/bodyBackgroundColor";
import { BookmarkIcon } from "../../components/icons";

import ShareSocialMedia from "../../components/shareSocial";
function Detail({
  getAllCrud,
  research_detail,
  router,
  downloadDocument,
  createCrud,
  authentication,
}) {
  const slug = router.query.slug;
  const { loggedIn } = authentication;

  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");

  useEffect(() => {
    if (slug) {
      getAllCrud("research_detail", `market_research/show/${slug}`, {});
    }
  }, [slug]);

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

  const saveToLibrary = ({ id, is_saved_document }) => {
    if (loggedIn && is_saved_document == null) {
      createCrud("save_to_library", "market_research/save", { id });
    }
  };

  return (
    <section className="latest-research research-detail-section">
      <Container className="research-section">
        <CustomBreadcrumb
          data={[
            { label: "Market Research", url: "/market-research" },
            { label: "All Research", url: "/market-research/research-list" },
            { label: research_detail?.name, url: "" },
          ]}
        />
        <br />
        <div className="research-detail-heading">
          <h5 className="research-title research-category-name">
            {"Category : "}
            {research_detail?.category?.name}
          </h5>
          <h5 className="research-title">{research_detail?.name}</h5>
          <div className="date-section">
            <div className="date">
              {moment(research_detail?.created_at).format("LL")}
            </div>
            <div className="custom-divider" style={{ margin: "0 20px" }}></div>
            <ShareSocialMedia
              link={window.location.href}
              title={research_detail?.name}
            >
              <div className="date share-btn">
                <ShareAltOutlined /> Share
              </div>
            </ShareSocialMedia>
            <br />

            <Fragment>
              <div
                className="custom-divider"
                style={{ margin: "0 20px" }}
              ></div>
              <div
                className="date save-btn"
                onClick={() => saveToLibrary(research_detail)}
              >
                <BookmarkIcon height={13} width={10} />
                {research_detail?.is_saved_document ? "Saved" : "Save"}
              </div>
            </Fragment>
          </div>
          <p className="date-section">
            {"Research Topic : "}
            {research_detail?.researchTopic?.title}
          </p>
        </div>
        {isMobile == false && (
          <BrowserView>
            <div className="research-content-wrapper">
              <div className="research-content-section">
                <div className="research-tags-container">
                  {research_detail?.documentTags.map((tag) => (
                    <div className="research-tags">{tag.name}</div>
                  ))}
                </div>
                <br />
                <div
                  dangerouslySetInnerHTML={{
                    __html: html,
                  }}
                ></div>
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
                        <ResearchCard
                          data={data}
                          key={index}
                          redirectUrl={`/market-research/${data?.seo_url_slug}`}
                        />
                      ))}
                    </div>
                  </Fragment>
                )}
              </div>
            </div>
          </BrowserView>
        )}
        {isMobile == true && (
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
        )}
      </Container>
      {css && <BodyBackgroundColor style={css} />}
    </section>
  );
}

const mapStateToProps = (state) => {
  const { research_detail, authentication } = state;
  return {
    research_detail,
    authentication,
  };
};

const actionCreators = {
  getAllCrud: crudActions._getAll,
  createCrud: crudActions._create,
  downloadDocument: crudActions._download,
};

export default withRouter(connect(mapStateToProps, actionCreators)(Detail));
