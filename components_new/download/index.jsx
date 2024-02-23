import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import { crudActions } from "../../_actions";
import Pervarrow from "../../public/images/downloads/perv.svg";
import Nextarrow from "../../public/images/downloads/next.svg";
import CloseIcon from "../../public/images/downloads/close.svg";
import DownloadDown from "../../public/images/downloads/angledown.svg";
import SMresearch from "./SMresearch";
import { BrowserView, MobileView } from "react-device-detect";

import DocumentResearchMV from "../document/documentResearchMV";
import DocumentResearchBV from "../document/documentResearchBV";
class Downloads extends Component {
  constructor(props) {
    super(props);
    this.state = {
      downloadbtn: true,
    };
  }

  componentDidMount() {
    let moduleId;
    if (sessionStorage.getItem("childrenIds")) {
      let childrenIds = JSON.parse(sessionStorage.getItem("childrenIds"));
      childrenIds.forEach((element) => {
        moduleId = element;
      });
    }
    const filterData = {
      module_id: moduleId,
    };
    this.props.getAllCrud("documents", "documents/list", filterData);
  }

  handleEmailSend = (data) => {
    const documentId = data.currentTarget.dataset.id;
    const filterData = {
      document_id: documentId,
    };
    this.props.createCrud("sendmail", "documents/sendmail", filterData, true);
  };

  render() {
    const { documents, openDownloadBtn, downloadbtn, router, loggedIn } =
      this.props;
    const path = router.pathname;
    return (
      <div
        className={`downloads-wrapper ${downloadbtn ? "open" : ""} ${
          loggedIn ? "" : "d-none"
        }`}
      >
        <div className="downloads-block">
          {documents && documents.length != 0 && (
            <div className="downloads-click" onClick={openDownloadBtn}>
              <BrowserView viewClassName="downloads-btn">
                <div className="arrow-block">
                  <img src={Pervarrow.src} className="pervarrow" />
                  <img src={Nextarrow.src} className="nextarrow" />
                </div>
                <h5>Research</h5>
              </BrowserView>
              {/* <MobileView viewClassName='downloads-btn' style={path == "/steps" ? { writingMode: "horizontal-tb", bottom: "100px", left: "-90px" } : { bottom: "70%" }}>
                <h5 style={path == "/steps" ? { transform: "none", fontWeight: "600" } : { fontWeight: "600" }}>Research</h5>
              </MobileView> */}
            </div>
          )}
          <BrowserView viewClassName="downloads-table-block">
            <div className="documentListContainer">
              {/* documents && (
                <WebList
                  documents={documents}
                  columns={["image", "name", "price", "option"]}
                />
              ) */}
              {documents && <DocumentResearchBV documents={documents} />}
            </div>
          </BrowserView>

          {/* my code start here */}

          {/* <SMresearch /> */}

          <div>
            <MobileView viewClassName="downloads-table-block">
              <div className="downloads-title-close" onClick={openDownloadBtn}>
                <div className="close-btn">
                  <img src={CloseIcon.src} className="closeicon" />
                </div>
                <h5>Researchs</h5>
              </div>
              <div className="documentListContainer">
                {documents && <DocumentResearchMV documents={documents} />}
              </div>
            </MobileView>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { documents, authentication } = state;
  const { user, loggedIn } = authentication;
  return {
    documents,
    user,
    loggedIn,
  };
};

const actionCreators = {
  getAllCrud: crudActions._getAll,
  createCrud: crudActions._create,
};

export default withRouter(connect(mapStateToProps, actionCreators)(Downloads));
