import React, { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import { Container, Row, Col, Card, CardHeader } from "reactstrap";
import { Tabs } from "antd";
import { Icon } from "react-icons-kit";
import { chevronLeft } from "react-icons-kit/feather";
import { BrowserView, MobileView, isBrowser } from "react-device-detect";
import Calculator from "../../components/calculator";
import Vulnerability from "../../components/vulnerability";
function Tools() {
  const router = useRouter();
  const { tools } = router.query;
  console.log("toolsRouter", tools);

  const [activeTab, setActiveTab] = useState(tools ?? "tools");

  const fetchDocuments = ({ searchText = null, page = 1, pageSize = 10 }) => {
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

  const onTabChange = (data) => {
    const currentCategory = documentType.filter((e) => e.id == data)[0];
    Router.push(`${currentCategory.seo_url_slug}`);
    console.log("currentCategory", currentCategory);
    console.log("data", data);
    setActiveTab(data);
  };
  const documentType = [
    {
      id: "calculators",
      name: "Calculators",
      seo_url_slug: "calculators",
      component: <Calculator />,
    },
    {
      id: "tools",
      name: "Tools",
      seo_url_slug: "tools",
      component: <Vulnerability />,
    },
  ];
  return (
    <Container style={{ margin: "3rem 0" }}>
      <div className="site-title site-market">
        <div style={{ display: "flex" }}>
          <h5 style={{ display: "flex" }}>
            <div className="mr-respan">Tools & Calculators</div>
          </h5>
        </div>
      </div>
      <BrowserView>
        <Tabs activeKey={`${activeTab}`} onChange={(e) => onTabChange(e)}>
          {documentType.map((tab) => (
            <Tabs.TabPane tab={`${tab.name}`} key={tab.id}>
              <div className="documentListContainer">{tab.component}</div>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </BrowserView>

      <MobileView>
        <Row className="documentListContainer">
          <Col sm={12} md={6} lg={6}>
            <div className="selectType">
              <p
                style={{
                  padding: "25px 0px 20px 0px",
                  borderBottom: "1px solid",
                }}
                onClick={() => this.onReset()}
              >
                <Icon size={18} icon={chevronLeft} />

                <b>{"documentName"}</b>
              </p>
            </div>

            {documentType &&
              documentType.map((documentsTyp, key) => {
                return (
                  <Card
                    key={key}
                    style={{ marginBottom: "10px" }}
                    onClick={() => onTabChange(documentsTyp.id)}
                  >
                    <CardHeader>{documentsTyp.name}</CardHeader>
                  </Card>
                );
              })}
          </Col>
          <Col sm={12} md={12} lg={12}>
            <MobileView>
              {activeTab === "tools" ? <Vulnerability /> : <Calculator />}
            </MobileView>
          </Col>
        </Row>
      </MobileView>
    </Container>
  );
}

export default Tools;
