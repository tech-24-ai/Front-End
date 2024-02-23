import React from "react";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import { Container, Row, Col, Card, CardHeader } from "reactstrap";
import { crudActions } from "../../_actions";
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

class DocumentList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      documentValue: "",
      documentName: "",
      searchText: "",
      documentList: this.props.documents,
      isAnyChanged: false,
      bgColor: "",
      loggedIn: this.props.authentication.loggedIn,
      category: "",
      typeSlug: "",
      activeTab: 1,
    };
  }

  componentDidUpdate(prevProps) {
    const { typeSlug, category } = this.state;
    if (this.props.documents != prevProps.documents) {
      this.setState({ documentList: this.props.documents });
    }
    if (
      this.props.documentsType &&
      this.props.documentsType !== prevProps.documentsType
    ) {
      if (typeSlug) {
        const currentCategory = this.props.documentsType.filter(
          (e) => e.seo_url_slug === typeSlug
        )[0];
        this.setState(
          {
            documentValue: currentCategory.id,
            activeTab: currentCategory.id,
            documentName: currentCategory.name,
          },
          () => this.fetchDocuments()
        );
      } else {
        if (isBrowser) {
          const { id, name, seo_url_slug } = this.props.documentsType[0];
          this.props.router.push(`${category}/${seo_url_slug}`);
          this.setState(
            {
              documentValue: id,
              activeTab: id,
              documentName: name,
            },
            () => this.fetchDocuments()
          );
        }
      }
    }
  }

  async componentDidMount() {
    let categoryId = sessionStorage.getItem("categoryId");
    const bgColor = sessionStorage.getItem("bgColor");
    this.setState({ bgColor: bgColor });

    let asPath = this.props.router.asPath;
    asPath = asPath.slice(1).split("/").slice(1);
    console.log("asPath", asPath);

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

    this.props.getAllCrud(
      "documentsType",
      `documents/types?category_id=${categoryId}`
    );
    if (
      isBrowser &&
      this.props.documentsType &&
      this.props.documentsType != undefined &&
      this.props.documentsType.length > 0
    ) {
      // if (asPath && asPath.length > 1) {
      //   const { seo_url_slug, id, name } = this.props.documentsType.filter(
      //     (e) => e.seo_url_slug === asPath[1]
      //   )[0];
      //   console.log("seo_url_slug", seo_url_slug);
      //   this.setState(
      //     {
      //       documentValue: id,
      //       activeTab: id,
      //       documentName: name,
      //     },
      //     () => this.fetchDocuments()
      //   );
      // } else {

      // }
      this.setState(
        {
          documentValue: this.props.documentsType[0].id,
          activeTab: this.props.documentsType[0].id,
          documentName: this.props.documentsType[0].name,
        },
        () => this.fetchDocuments()
      );
    }

    this.props.clearAllCrud("documents");
    if (this.state.loggedIn) {
      this.props.getAllCrud("get_subscription", "get_subscription");
    }
  }

  fetchDocuments = async () => {
    const { documentValue, activeTab } = this.state;
    const categoryId = sessionStorage.getItem("categoryId");
    const filterData = {
      category_id: categoryId,
      document_type_id: documentValue,
    };
    if (this.state.loggedIn) {
      // if activetab is not calculator
      if (activeTab) {
        await this.props.getAllCrud(
          "documents",
          "documents/listdata",
          filterData
        );
      }
    } else {
      await this.props.getAllCrud("documents", "documents/list", filterData);
    }
  };

  onChange = (data) => {
    const currentCategory = this.props.documentsType.filter(
      (e) => e.id == data
    )[0];
    this.props.router.push(
      `${this.state.category}/${currentCategory.seo_url_slug}`
    );

    if (data === "calculator") {
      this.setState({
        activeTab: data,
      });
    } else {
      this.setState(
        {
          documentValue: data,
          activeTab: data,
        },
        () => this.fetchDocuments()
      );
    }
  };

  onMobileChange = (data) => {
    console.log("data", data);
    this.setState(
      {
        documentValue: data.id,
        documentName: data.name,
        activeTab: data.id,
      },
      () => this.fetchDocuments()
    );
  };

  onReset = () => {
    this.setState({
      documentValue: null,
      documentName: null,
      activeTab: 1,
      category: "",
      typeSlug: "",
    });
  };

  searchDocument = (searchText) => {
    const { documentList } = this.state;
    if (searchText) {
      let filteredDocument = documentList.filter((d) =>
        d.name.toLowerCase().includes(searchText.toLowerCase())
      );
      this.setState({ documentList: filteredDocument });
    } else {
      this.setState({ documentList: this.props.documents });
    }
  };

  render() {
    const { documents, documentsType } = this.props;
    const {
      documentValue,
      documentName,
      documentList,
      isAnyChanged,
      category,
      activeTab,
    } = this.state;
    return (
      <React.Fragment>
        <Container>
          {
            <CustomBreadcrumb
              isAnyChanged={isAnyChanged}
              onChange={() => this.setState({ isAnyChanged: false })}
              updateNote={(e) => {}}
              setMeta={(e) => {}}
            />
          }
          <BrowserView>
            <div style={{}}>
              <Tabs
                activeKey={`${activeTab}`}
                onChange={(e) => this.onChange(e)}
              >
                {documentsType &&
                  documentsType.map((tab) => (
                    <Tabs.TabPane tab={`${tab.name}`} key={tab.id}>
                      {activeTab != "calculator" &&
                        documents &&
                        documents.length > 0 && (
                          <div className="documentSearchPanel">
                            <Input
                              placeholder="Search this section"
                              onInput={(e) =>
                                this.searchDocument(e.target.value)
                              }
                              style={{
                                width: "25%",
                                height: "40px",
                              }}
                            />
                          </div>
                        )}
                    </Tabs.TabPane>
                  ))}
              </Tabs>
            </div>
            <div className="documentListContainer">
              {activeTab === "calculator" ? (
                <Calculator />
              ) : sessionStorage.getItem("categoryId") &&
                documentList &&
                documentList.length ? (
                <WebList
                  documents={documentList}
                  columns={["name", "description", "price", "option"]}
                />
              ) : (
                <div style={{ textAlign: "center", marginTop: "50px" }}>
                  No Document found
                </div>
              )}
            </div>
          </BrowserView>

          <MobileView>
            <Row className="documentListContainer">
              <Col sm={12} md={6} lg={6}>
                <div className="selectType">
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
              </Col>
              <Col sm={12} md={12} lg={12}>
                <MobileView>
                  {activeTab == "calculator" ? (
                    <Calculator />
                  ) : (
                    documentName && <MobileList documents={documents} />
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
  };
};

const actionCreators = {
  getAllCrud: crudActions._getAll,
  clearAllCrud: crudActions._clear,
};

export default withRouter(
  connect(mapStateToProps, actionCreators)(DocumentList)
);
