import React from "react";
import Router from "next/router";
import { connect } from "react-redux";
import { Container } from "reactstrap";
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
import { TreeSelect } from "antd";
import Image from "next/image";
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile,
} from "react-device-detect";
import myImageLoader from "../imageLoader";

import {
    RoboAdvisor,
    TermsConditions,
    ResearchTool,
    ServiceProvider,
    Consultant,
    PrivacyPolicy,
    Cookies,
} from "../icons";
import Link from "next/link";

let counter = isMobile ? 7 : 7;
class LegalCategories extends React.PureComponent {
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
        const categoryList = [
            {
                title: "Terms and Conditions",
                description: [
                    "Terms and Conditions",
                ],
                icon: <TermsConditions />,
                urlTarge: "/terms_and_conditions",
            },
            {
                title: "Privacy Policy",
                description: [
                    "Privacy Policy.",
                ],

                icon: <PrivacyPolicy />,
                urlTarge: "/privacy_policy",
            },
            {
                title: "Cookies Setting",
                description: [
                    "Cookies Setting",
                    "App development, managed services, custom integration, UI design, Assessments & more",
                ],
                icon: <Cookies />,
                urlTarge: "/cookies",
            },

        ];

        return (
            <div className="legal-below">
                <Container>
                    <div className="legal-box">
              
                                <div className="legal-banner-wrapper" id="categoryWrapper">
                                    {categoryList.map((data, i) => (
                                        <div className="card legal-banner-block legal-banner-legal-block" data-index={i} key={i}>
                                            <div className="legal-banner">
                                                <div className="category-content category-content-legal">
                                                    <div className="custom-icon custom-icon-legal">{data.icon}</div>
                                                    <h6>{data.title}</h6>
                                                    <div className="learn-more-btn">
                                                        <Link style={{ color: "inherit" }} href={data.urlTarge}>
                                                            Learn More
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                     

                    </div>
                </Container>

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

export default connect(mapStateToProps, actionCreators)(LegalCategories);
