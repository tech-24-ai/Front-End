import React from "react";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import { Container, Row, Col, Card, CardHeader } from "reactstrap";
import { crudActions, loaderActions } from "../../_actions";
import { crudService } from "../../_services/crud.service";
import BodyBackgroundColor from "../../components/style/bodyBackgroundColor";
import CustomBreadcrumb from "../../components/breadcrumbs";
import MobileList from "../../components/document/mobileList";
import WebList from "../../components/document/webList";
import SelectBox from "../../components/form/select";
import RadioBox from "../../components/form/radioBox";
import { Tabs, Input } from "antd";

import { Icon } from "react-icons-kit";
import { chevronLeft } from "react-icons-kit/feather";
import { BrowserView, MobileView, isBrowser } from "react-device-detect";
import Calculator from "../../components/calculator";
import Vulnerability from "../../components/vulnerability";

class DocumentList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      documentValue: "",
      documentName: "",
      searchText: "",
      isAnyChanged: false,
      bgColor: "",
      loggedIn: this.props.authentication.loggedIn,
      category: "",
      typeSlug: "",
      activeTab: 1,
      documentType: null,
      documentSlug: null,
    };
  }

  bindSessionData = async (param) => {
    let docType = this.props.router.asPath;
    let docSlug = this.props.router.asPath;
    docType = docType.slice(1).split("/").slice(2)[0];
    docSlug = docSlug.slice(1).split("/").slice(3)[0];
    const { category, documentType } = this.state;

    if (docType) {
      const currentCategory = documentType.filter(
        (e) => e.seo_url_slug == docType
      )[0];
      if (docSlug) {
        this.setState(
          {
            documentValue: currentCategory.id,
            documentName: currentCategory.name,
            documentSlug: docSlug,
          },
          () => this.fetchDocuments({})
        );
      } else {
        if (docType === "calculators" || docType === "tools") {
          this.setState({
            documentValue: currentCategory.id,
            activeTab: currentCategory.id,
            documentName: currentCategory.name,
            documentSlug: null,
          });
        } else {
          this.setState(
            {
              documentValue: currentCategory.id,
              activeTab: currentCategory.id,
              documentName: currentCategory.name,
              documentSlug: null,
            },
            () => this.fetchDocuments({})
          );
        }
      }
    } else {
      if (isBrowser) {
        const { seo_url_slug, name, id } = documentType[0];
        this.props.router.push(`${category}/${seo_url_slug}`);
        this.setState(
          {
            documentValue: id,
            activeTab: id,
            documentName: name,
            typeSlug: seo_url_slug,
          },
          () => this.fetchDocuments({})
        );
      }
    }
  };

  async componentDidMount() {
    let categoryId = sessionStorage.getItem("categoryId");
    const bgColor = sessionStorage.getItem("bgColor");
    this.setState({ bgColor: bgColor });

    let asPath = this.props.router.asPath;
    asPath = asPath.slice(1).split("/").slice(1);
    if (asPath && asPath.length) {
      this.setState({
        category: asPath[0],
      });
    }
    if (asPath && asPath.length > 1) {
      this.setState({
        typeSlug: asPath[1],
      });
    }

    if (asPath && asPath.length > 2) {
      this.setState({
        documentSlug: asPath[2],
      });
    }

    if (!categoryId && asPath.length) {
      await crudService
        ._getAll("categories", {
          category_name: asPath[0].replace(/_/g, " ").replace(/and/g, "&"),
        })
        .then(async (result) => {
          if (result.data && result.data.length) {
            const { id, bg_color } = result.data[0];
            sessionStorage.setItem("categoryId", id);
            categoryId = id;
            this.setState({ bgColor: bg_color });
            sessionStorage.setItem("bgColor", bg_color);
          }
        });
      this.setState({ isAnyChanged: true });
    }

    await crudService
      ._getAll(`documents/types?category_id=${categoryId}`)
      .then(({ data }) => {
        if (data && data.length) {
          this.setState({
            documentType: data,
          });
        }
      });

    // this.props.getAllCrud(
    //   "documentsType",
    //   `documents/types?category_id=${categoryId}`
    // );

    // if (
    //   isBrowser &&
    //   this.props.documentsType &&
    //   this.props.documentsType != undefined &&
    //   this.props.documentsType.length > 0
    // ) {
    //   console.log("documentsType", this.props.documentsType);
    //   this.setState(
    //     {
    //       documentValue: this.props.documentsType[0].id,
    //       activeTab: this.props.documentsType[0].id,
    //       documentName: this.props.documentsType[0].name,
    //     },
    //     () => this.fetchDocuments({})
    //   );
    // }

    this.props.clearAllCrud("documents");
    if (this.state.loggedIn) {
      this.props.getAllCrud("get_subscription", "get_subscription");
    }

    this.bindSessionData("didmount");
    if (this.props && this.props.router) {
      this.props.router.events.on("routeChangeComplete", (url) => {
        this.bindSessionData("routeChange");
      });
    }
  }

  fetchDocuments = ({ searchText = null, page = 1, pageSize = 10 }) => {
    const { documentValue, activeTab, documentSlug } = this.state;
    const categoryId = sessionStorage.getItem("categoryId");
    const filterData = {
      category_id: categoryId,
      document_type_id: documentValue,
      seo_url_slug: documentSlug,
      page,
      pageSize,
    };
    if (searchText) {
      filterData["search_name"] = searchText;
    }
    this.props.showLoader();
    if (this.state.loggedIn) {
      // if activetab is not calculator
      if (Number(activeTab)) {
        this.props.getAllCrud("documents", "documents/listdata", filterData);
      }
    } else {
      this.props.getAllCrud("documents", "documents/list", filterData);
    }
  };

  onTabChange = (data) => {
    const currentCategory = this.state.documentType.filter(
      (e) => e.id == data
    )[0];
    this.props.router.push(
      `${this.state.category}/${currentCategory.seo_url_slug}`
    );
  };

  onMobileChange = (data) => {
    this.setState(
      {
        documentValue: data.id,
        documentName: data.name,
        activeTab: data.id,
      },
      () => this.fetchDocuments({})
    );
  };

  onReset = () => {
    this.setState({
      documentValue: null,
      documentName: null,
      activeTab: 1,
      typeSlug: "",
    });
    this.props.router.push(this.state.category);
  };

  render() {
    const { documents, documentsType } = this.props;
    const {
      documentValue,
      documentName,
      isAnyChanged,
      category,
      activeTab,
      documentType,
      documentSlug,
    } = this.state;
    return (
      <React.Fragment>
        <Container>
          {!documentSlug && (
            <CustomBreadcrumb
              isAnyChanged={isAnyChanged}
              onChange={() => this.setState({ isAnyChanged: false })}
              updateNote={(e) => {}}
              setMeta={(e) => {}}
            />
          )}
          <BrowserView>
            {!documentSlug && (
              <div>
                <Tabs
                  activeKey={`${activeTab}`}
                  onChange={(e) => this.onTabChange(e)}
                >
                  {documentType &&
                    documentType.map((tab) => (
                      <Tabs.TabPane
                        tab={`${tab.name}`}
                        key={tab.id}
                      ></Tabs.TabPane>
                    ))}
                </Tabs>
              </div>
            )}

            <div className="documentListContainer">
              {activeTab === "calculators" ? (
                <Calculator />
              ) : activeTab === "tools" ? (
                <Vulnerability />
              ) : (
                <WebList
                  handleFetchDocuments={(props) => this.fetchDocuments(props)}
                />
              )}
            </div>
          </BrowserView>

          <MobileView>
            <Row className="documentListContainer">
              <Col sm={12} md={6} lg={6}>
                <div className="selectType">
                  {!documentSlug && documentName && (
                    <p
                      style={{
                        padding: "25px 0px 20px 0px",
                        borderBottom: "1px solid",
                      }}
                      onClick={() => this.onReset()}
                    >
                      <Icon size={18} icon={chevronLeft} />

                      <b>{documentName}</b>
                    </p>
                  )}
                </div>

                {!documentSlug &&
                  !documentName &&
                  documentType &&
                  documentType.map((documentsTyp, key) => {
                    return (
                      <Card
                        key={key}
                        style={{ marginBottom: "10px" }}
                        onClick={() => this.onTabChange(documentsTyp.id)}
                      >
                        <CardHeader>{documentsTyp.name}</CardHeader>
                      </Card>
                    );
                  })}
              </Col>
              <Col sm={12} md={12} lg={12}>
                <MobileView>
                  {activeTab == "calculators" ? (
                    <Calculator />
                  ) : activeTab === "tools" ? (
                    <Vulnerability />
                  ) : (
                    documentName && (
                      <MobileList
                        handleFetchDocuments={(props) =>
                          this.fetchDocuments(props)
                        }
                      />
                    )
                  )}
                </MobileView>
              </Col>
            </Row>
          </MobileView>
          {/* <Row className="documentListContainer">
            <Col sm={12} md={6} lg={6}>
              <BrowserView>
                <SelectBox
                  istoolKits="true"
                  isClearable={false}
                  value={documentValue}
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
                  {/* {!documentName && <p style={{ padding: "25px 0px 20px 0px", borderBottom: "1px solid" }}>Select a section</p>} //}
                  {documentName && (
                    <p
                      style={{
                        padding: "25px 0px 20px 0px",
                        borderBottom: "1px solid",
                      }}
                      onClick={() => this.onReset()}
                    >
                      <Icon size={18} icon={chevronLeft} />

                      <b>{documentName}</b>
                      
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
          </Row> */}
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
    AllState: state,
  };
};

const actionCreators = {
  getAllCrud: crudActions._getAll,
  clearAllCrud: crudActions._clear,
  showLoader: loaderActions.show,
};

export default withRouter(
  connect(mapStateToProps, actionCreators)(DocumentList)
);
