import React, { useEffect } from "react";
import { crudActions } from "../../_actions";
import { connect } from "react-redux";
import { withRouter, useRouter } from "next/router";
import { Container, Button, Pagination } from "reactstrap";
import ResearchCard from "../../components/marketResearch/ResearchCard";
import moment from "moment";
import { ShareAltOutlined } from "@ant-design/icons";
import CustomBreadcrumb from "../../components/breadcrumbs/Breadcrumb";
CustomBreadcrumb;

function Detail({ getAllCrud, research_detail, router }) {
  const slug = router.query.slug;
  useEffect(() => {
    getAllCrud("research_detail", `market_research/show/${slug}`, {});
  }, []);

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
            <div className="date">Contributor:</div>
            <div className="custom-divider"></div>
            <div className="date share-btn">
              <ShareAltOutlined /> Share
            </div>
          </div>
        </div>
        <div className="research-content-wrapper">
          <div className="research-content-section">
            <p
              dangerouslySetInnerHTML={{ __html: research_detail?.description }}
            ></p>
          </div>
          <div className="related-research-section">
            <div className="download-report-card">
              <h6 className="heading">{research_detail?.name}</h6>
              <p className="content">{research_detail?.details}</p>
              <button className="custom-btn with-bg">Download Report</button>
            </div>
            <h6 className="heading">Related Research</h6>
            <div className="related-research-wrapper">
              {research_detail?.related_research.map((data, index) => (
                <ResearchCard data={data} key={index} />
              ))}
            </div>
          </div>
        </div>
      </Container>
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
};

export default withRouter(connect(mapStateToProps, actionCreators)(Detail));
