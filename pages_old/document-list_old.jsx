import React from "react";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import { Container, Row, Col, Card, CardHeader } from "reactstrap";
import { crudActions } from "../_actions";
import BodyBackgroundColor from "../components/style/bodyBackgroundColor";
import CustomBreadcrumb from "../components/breadcrumbs";
import MobileList from "../components/document/mobileList";
import WebList from "../components/document/webList";
import SelectBox from "../components/form/select";

import { Icon } from "react-icons-kit";
import { chevronLeft } from "react-icons-kit/feather";
import { BrowserView, MobileView } from "react-device-detect";

class DocumentList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      docuemntValue: "",
      documentName: "",
      bgColor: "",
      loggedIn: this.props.authentication.loggedIn,
    };
  }

  componentDidMount() {
    const categoryId = sessionStorage.getItem("categoryId");
    this.props.getAllCrud(
      "documentsType",
      `documents/types?category_id=${categoryId}`
    );
    const bgColor = sessionStorage.getItem("bgColor");
    this.setState({ bgColor: bgColor });
    this.props.clearAllCrud("documents");
    if (this.state.loggedIn)
      this.props.getAllCrud("get_subscription", "get_subscription");
  }

  fetchDocuments = () => {
    const { docuemntValue } = this.state;
    const categoryId = sessionStorage.getItem("categoryId");
    const filterData = {
      category_id: categoryId,
      document_type_id: docuemntValue,
    };
    if (this.state.loggedIn) {
      this.props.getAllCrud("documents", "documents/listdata", filterData);
    } else {
      this.props.getAllCrud("documents", "documents/list", filterData);
    }
  };

  onChange = (data) => {
    this.setState(
      {
        docuemntValue: data.value,
      },
      () => this.fetchDocuments()
    );
  };

  onMobileChange = (data) => {
    this.setState(
      {
        docuemntValue: data.id,
        documentName: data.name,
      },
      () => this.fetchDocuments()
    );
  };

  onReset = () => {
    this.setState({
      docuemntValue: null,
      documentName: null,
    });
  };

  render() {
    const { documents, documentsType } = this.props;
    const { docuemntValue, documentName } = this.state;

    return (
      <React.Fragment>
        <Container>
          <CustomBreadcrumb updateNote={(e) => {}} setMeta={(e) => {}} />
          <Row className="documentListContainer">
            <Col sm={12} md={6} lg={6}>
              <BrowserView>
                <SelectBox
                  istoolKits="true"
                  isClearable={false}
                  value={docuemntValue}
                  onChange={this.onChange}
                  options={documentsType}
                />
                {documents && documents.length && (
                  <p className="document-detail">
                    {documents.length} documents found
                  </p>
                )}
                <br />
              </BrowserView>
              <MobileView>
                <div className="selectType">
                  {/* {!documentName && <p style={{ padding: "25px 0px 20px 0px", borderBottom: "1px solid" }}>Select a section</p>} */}
                  {documentName && (
                    <p
                      style={{
                        padding: "25px 0px 20px 0px",
                        borderBottom: "1px solid",
                      }}
                      onClick={() => this.onReset()}
                    >
                      <Icon size={18} icon={chevronLeft} />

                      {/* Document for select <b>{documentName}</b> */}
                      <b>Back</b>
                    </p>
                  )}
                </div>

                {!documentName &&
                  documentsType &&
                  documentsType.map((documentsTyp, key) => {
                    return (
                      <Card
                        key={key}
                        style={{ marginBottom: "10px" }}
                        onClick={() => this.onMobileChange(documentsTyp)}
                      >
                        <CardHeader>{documentsTyp.name}</CardHeader>
                      </Card>
                    );
                  })}
              </MobileView>
            </Col>

            <Col sm={12} md={12} lg={12}>
              <BrowserView>
                {documents && (
                  <WebList
                    documents={documents}
                    columns={["name", "description", "price", "option"]}
                  />
                )}
              </BrowserView>
              <MobileView>
                {documentName && <MobileList documents={documents} />}
              </MobileView>
            </Col>
          </Row>
          <BodyBackgroundColor color="#fdfdfd" />
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { category, documents, documentsType, authentication } = state;
  return {
    category,
    documents,
    documentsType,
    authentication,
  };
};

const actionCreators = {
  getAllCrud: crudActions._getAll,
  clearAllCrud: crudActions._clear,
};

export default withRouter(
  connect(mapStateToProps, actionCreators)(DocumentList)
);
