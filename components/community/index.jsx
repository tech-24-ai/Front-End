import React, { Fragment } from "react";
import Router, { useRouter, withRouter } from "next/router";
import { connect } from "react-redux";
import { Container } from "reactstrap";
import { isMobile, isTablet, isBrowser } from "react-device-detect";
import { Icon } from "react-icons-kit";
import { iosArrowBack } from "react-icons-kit/ionicons/iosArrowBack";
import { iosArrowForward } from "react-icons-kit/ionicons/iosArrowForward";
import Arrow from "../../public/images/category/arrow.svg";
import { crudService } from "../../_services";
import { userActions } from "../../_actions";

import ArrowDown from "../../public/images/category/arrowdown.svg";
import ArrowUp from "../../public/images/category/arrowup.svg";
import centerLogo from "../../public/images/header/Group 594.png";
import moreIcon from "../../public/images/header/Group 550.png";
import { Col, Row, FormGroup } from "reactstrap";
import { TreeSelect } from "antd";
import Image from "next/image";
import myImageLoader from "../imageLoader";
import { UsergroupAddOutlined } from "@ant-design/icons";
import { MessageOutlined } from "@ant-design/icons";

import {
    RoboAdvisor,
    ResearchTool,
    ServiceProvider,
    Consultant,
} from "../icons";

let counter = isMobile ? 7 : 7;
class CommunityCategory extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            slides: [],
            changeIcon: false,
            hoverId: false,
        };
        console.log("props", props);
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

    handleGoToPage = (url) => {
        const restrictedUrls = ["/consultant", "/consultant/service_provider"];
        if (!this.props.isloggedIn && restrictedUrls.includes(url)) {
            this.props.toggleLoginPopup(true);
            return false;
        }

        Router.push(url);
    };

    render() {
        const { changeIcon, slides, hoverId } = this.state;
        const categoryList = [
            {
                title: (
                    <Fragment>
                        Primary Storage Discussion Group
                    </Fragment>
                ),
                description: [
                    "Find the right software, hardware or service",
                    "Troubleshoot problems",
                    "Reduce costs",
                    "Get best practice guidance",
                ],
                icon: <RoboAdvisor />,
                urlTarge: "/it-robo",
            },
            {
                title: "File & Object Storage",
                description: [
                    "Engage with a consultant over a video conference.",
                    "Pay per minute.",
                    "Discuss strategy, technology and costs.",
                ],

                icon: <Consultant />,
                urlTarge: "/consultant",
            },
            {
                title: "Data Protection",
                description: [
                    "Pay at 20% less than market rates",
                    "App development, managed services, custom integration, UI design, Assessments & more",
                ],
                icon: <ServiceProvider />,

                urlTarge: "/consultant/service_provider",
            },
        ];

        return (
            <div className="community-category-below">
                <Container>
                    <div className="category-box">
                        <div className="category-banner-wrapper" id="categoryWrapper">
                            {categoryList.map((data, i) => (
                                <div
                                    className="category-banner-block"
                                    data-index={i}
                                    key={i}
                                // onClick={() => this.handleGoToPage(data.urlTarge)}
                                >
                                    <div className="category-banner">
                                        <div className="category-content">
                                            <div className="content-head">
                                                <div className="custom-icon white medium">
                                                    {data.icon}
                                                </div>
                                                <div className="category-content" style={{ minWidth: "70%" }}>
                                                    <h6>{data.title}</h6>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                                                <div className="content-x">
                                                 <div className="user-icon">
                                                        <p><UsergroupAddOutlined style={{ fontSize: "16px" }} /> {" "}Members : 103</p>
                                                 </div>
                                                    <div className="query-icon">
                                                        <p><MessageOutlined style={{ fontSize: "16px" }} /> {" "}Queries : 103</p>
                                                 </div>
                                                </div>

                                            </div>
                                            <div className="learn-more-btn">
                                                <h6 className="btn-text">
                                                    Join Community
                                                </h6>
                                            </div>
                                        </div>
                                        {/* {isBrowser && (
                                            <div className="category-hover">
                                                <div className="category-hover-content">
                                                    <div className="custom-icon white medium">
                                                        {data.icon}
                                                    </div>
                                                    <div className="category-content">
                                                        <h6>{data.title}</h6>
                                                    </div>
                                                    <ul>
                                                        {data.description.map((des, idx) => (
                                                            <li key={idx}>{des}</li>
                                                        ))}
                                                    </ul>
                                                    <a href={data.urlTarge} className="learn-more-btn">
                                                        Join CommunityCategory
                                                    </a>
                                                </div>
                                            </div>
                                        )} */}
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
    const { user, loggedIn } = authentication;
    return { user, confirm, isloggedIn: loggedIn };
};

const actionCreators = {
    toggleLoginPopup: userActions.toggleLoginPopup,
};

export default withRouter(connect(mapStateToProps, actionCreators)(CommunityCategory));
