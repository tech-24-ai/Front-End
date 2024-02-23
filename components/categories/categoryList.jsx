import React from "react";
import Router from "next/router";
import { connect } from "react-redux";
import { Container } from "reactstrap";
import { isMobile, isTablet, isBrowser } from "react-device-detect";
import { Icon } from "react-icons-kit";
import { iosArrowBack } from "react-icons-kit/ionicons/iosArrowBack";
import { iosArrowForward } from "react-icons-kit/ionicons/iosArrowForward";
import Arrow from "../../public/images/category/arrow.svg";
import { crudService } from "../../_services";
import ArrowDown from "../../public/images/category/arrowdown.svg";
import ArrowUp from "../../public/images/category/arrowup.svg";
import centerLogo from "../../public/images/header/Group 594.png";
import moreIcon from "../../public/images/header/Group 550.png";
import { Col, Row, FormGroup } from "reactstrap";
import { TreeSelect, Space } from "antd";
import Image from "next/image";
import myImageLoader from "../imageLoader";
import businessIcon from "../../public/new_images/business-application-icon.svg";

import roboAdvisorIcon from "../../public/new_images/robo_advisor.svg";
import CategoryCard from "../card/index";
import {
  BusinessApplication,
  ApplicationDevelopment,
  CyberSecurity,
  DataManagement,
  PhysicalSecurity,
  ItInfrastructure,
} from "../icons";

let counter = isMobile ? 7 : 7;
class categoryList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      slides: [],
      changeIcon: false,
      hoverId: false,
    };
  }

  componentDidMount() {
    crudService
      ._getAll(
        "categories?orderBy=sort_order&orderPos=ASC&not_categories=[1,5]",
        {}
      )
      .then((result) => {
        this.setState({ categories: result.data });
        this.bindSlides();
      });
  }

  bindSlides = () => {
    const { categories, changeIcon } = this.state;
    let slides = [];

    if (categories && categories.length) {
      categories.forEach((element, index) => {
        if (changeIcon) {
          if (index >= counter) {
            slides.push(element);
          }
        } else {
          if (index < counter) {
            slides.push(element);
          }
        }
      });
    }
    this.setState({
      slides: slides,
    });
  };

  goToModules = (data) => {
    console.log("Data", data);
    sessionStorage.removeItem("bgColor");
    sessionStorage.removeItem("categoryId");
    sessionStorage.removeItem("moduleId");
    sessionStorage.removeItem("childrenIds");
    sessionStorage.removeItem("isAdvanced");

    sessionStorage.setItem("categoryId", data.id);
    sessionStorage.setItem("bgColor", data.bg_color);
    const seoUrl = data.name.replace(/ /g, "_").toLowerCase();
    if (!!data.no_flow) {
      Router.push({
        pathname: `/d/${seoUrl.replace(/&/g, "and")}`,
        //pathname: `/${seoUrl.replace(/&/g, "and")}`,
      });
    } else {
      Router.push({
        pathname: `/technology/${seoUrl}`,
      });
    }
  };

  handleScroll = () => {
    const { changeIcon } = this.state;
    this.setState(
      {
        changeIcon: !changeIcon,
      },
      () => this.bindSlides()
    );
  };

  onCatHover = (id) => {
    this.setState({
      hoverId: id,
    });
  };
  render() {
    const { changeIcon, slides, hoverId } = this.state;

    const moduleIcons = [
      {
        name: "Business Applications",
        icon: <BusinessApplication style={{ with: 36, height: 36 }} />,
      },
      {
        name: "IT infrastructure",
        icon: <ItInfrastructure style={{ with: 36, height: 36 }} />,
      },
      {
        name: "Data management",
        icon: <DataManagement style={{ with: 36, height: 36 }} />,
      },
      {
        name: "Physical Security",
        icon: <PhysicalSecurity style={{ with: 36, height: 35 }} />,
      },
      {
        name: "Cyber Security",
        icon: <CyberSecurity style={{ with: 36, height: 32 }} />,
      },
      {
        name: "Application Developement",
        icon: <ApplicationDevelopment style={{ with: 36, height: 32 }} />,
      },
    ];

    const getIcon = (name) => {
      const [data] = moduleIcons.filter((m) => m.name == name);
      if (data) {
        return data.icon;
      } else {
        return <CyberSecurity style={{ with: 36, height: 32 }} />;
      }
    };
    return (
      <div className="category-container">
        {/* <Row>
          {slides.map((data) => (
            <Col md={4}>
              <CategoryCard
                icon={moduleIcons.filter((m) => m.name == data.name)[0]["icon"]}
                text={data.detail}
                title={data.name}
                button="Explore More"
                onClick={() => {
                  this.goToModules(data);
                }}
              />
            </Col>
          ))}
        </Row> */}

        <Space size={[30, 42]} wrap>
          {slides.map((data) => (
            <CategoryCard
              icon={getIcon(data.name)}
              text={data.detail}
              title={data.name}
              button="Explore More"
              onClick={() => {
                this.goToModules(data);
              }}
            />
          ))}
        </Space>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { authentication, confirm } = state;
  const { user } = authentication;
  return { user, confirm };
};

const actionCreators = {};

export default connect(mapStateToProps, actionCreators)(categoryList);
