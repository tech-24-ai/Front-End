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
import Link from "next/link";
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
      const currentCategory =
        documentType &&
        documentType.filter((e) => e.seo_url_slug == docType)[0];
      if (currentCategory) {
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
      }
    } else {
      if (isBrowser && documentType) {
        const { seo_url_slug, name, id } = documentType[0];
        this.props.router.push(`${category}/${seo_url_slug}`);
        if (docType === "calculators" || docType === "tools") {
          this.setState({
            documentValue: id,
            activeTab: id,
            documentName: name,
            typeSlug: seo_url_slug,
          });
        } else {
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
    }
  };

  async componentDidMount() {
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

    if (asPath.length && asPath[0]) {
      if (asPath.length && asPath[0] !== "tools_calculators") {
        await crudService
          ._getAll("documents/types", {
            category_name: asPath[0],
          })
          .then(async (result) => {
            if (result.data && result.data.length) {
              this.setState({ documentType: result.data });
            }
          });
      } else {
        this.setState({
          documentType: [
            {
              id: "calculators",
              name: "Calculators",
              seo_url_slug: "calculators",
            },
            {
              id: "tools",
              name: "Tools",
              seo_url_slug: "tools",
            },
          ],
          activeTab: asPath[1],
        });
      }
    }

    this.props.clearAllCrud("documents");
    // if (this.state.loggedIn) {
    //   this.props.getAllCrud("get_subscription", "get_subscription");
    // }

    this.bindSessionData("didmount");
    if (this.props && this.props.router) {
      this.props.router.events.on("routeChangeComplete", (url) => {
        this.bindSessionData("routeChange");
      });
    }
  }

  fetchDocuments = ({ searchText = null, page = 1, pageSize = 10 }) => {
    const { documentValue, activeTab, documentSlug } = this.state;
    const filterData = {
      category_id: 5,
      document_type_id: documentValue,
      seo_url_slug: documentSlug,
      page,
      pageSize,
    };
    if (searchText) {
      filterData["search_name"] = searchText;
    }
    this.props.showLoader();
    if (documentValue) {
      if (this.state.loggedIn) {
        // if activetab is not calculator
        if (Number(activeTab)) {
          this.props.getAllCrud("documents", "documents/listdata", filterData);
        }
      } else {
        this.props.getAllCrud("documents", "documents/list", filterData);
      }
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

  categories = {
    research: "Research",
    template: "Templates",
    tools_calculators: "Tools & Calculators",
  };

  render() {
    const { documents, documentsType } = this.props;
    const {
      documentValue,
      documentName,
      category,
      activeTab,
      documentType,
      documentSlug,
    } = this.state;
    return (
      <React.Fragment>
        <Container style={{ margin: "3rem 0" }}>
          <div className="site-title site-market">
            <div style={{ display: "flex" }}>
              <h5 style={{ display: "flex" }}>
                <Link href={{ pathname: "/market-research" }}>
                  <a style={{ display: "flex" }}>
                    <div className="mr-span">Market Research</div>
                    <div style={{ margin: "0px 4px", color: "#70798b" }}>
                      {">"}
                    </div>
                  </a>
                </Link>
                <Link href={{ pathname: "/d" }}>
                  <a>
                    <div className="mr-respan">{this.categories[category]}</div>
                  </a>
                </Link>
              </h5>
            </div>
            <Link href={"/donations"}>
              <div className="custom-btn with-bg">
                Donate to Keep Research Free!
              </div>
            </Link>
          </div>
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
          {/* <BodyBackgroundColor color="#fdfdfd" /> */}
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
