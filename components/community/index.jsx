import React, { Fragment } from "react";
import Router, { useRouter, withRouter } from "next/router";
import { connect } from "react-redux";
import { Button, Container } from "reactstrap";
import { crudService } from "../../_services";
import { userActions } from "../../_actions";
import { UsergroupAddOutlined, MessageOutlined } from "@ant-design/icons";
import { RoboAdvisor, ServiceProvider, Consultant } from "../icons";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { ArrowRightOutlined } from "@ant-design/icons";

let counter = 7;

class CommunityCategory extends React.PureComponent {
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

  handleGoToPage = (url) => {
    const restrictedUrls = ["/cummunity", "/community/query_detail"];
    if (!this.props.isloggedIn && restrictedUrls.includes(url)) {
      this.props.toggleLoginPopup(true);
      return false;
    }

    Router.push(url);
  };

  render() {
    const { changeIcon, slides, hoverId } = this.state;
    const { data } = this.props;
    if (!Array.isArray(data)) {
      return (
        <div style={{ paddingLeft: "100px" }}>No community data available</div>
      );
    }

    return (
      <div className="community-category-below">
        <div className="category-box">
          <div className="category-banner-wrapper" id="categoryWrapper">
            {data?.map((data, i) => (
              <div
                className="category-banner-block"
                data-index={i}
                key={i}
                // onClick={() => this.handleGoToPage(data.urlTarget)}
              >
                <div className="category-banner">
                  <div className="category-content">
                    <div className="content-head">
                      <div className="custom-icon white medium">
                        <Image
                          src={data.image_url}
                          alt={data.name}
                          width={100}
                          height={100}
                        />
                      </div>
                      <div
                        className="category-content"
                        style={{ minWidth: "70%" }}
                      >
                        <h6>{data.name}</h6>
                      </div>
                    </div>
                    <div className="card-body">
                      <p class="card-text">{data.description}</p>
                      <div className="content-x">
                        <div className="user-icon">
                          <p>
                            <UsergroupAddOutlined
                              style={{ fontSize: "16px" }}
                            />{" "}
                            Members : {data.__meta__.total_members}
                          </p>
                        </div>
                        <div className="query-icon">
                          <p>
                            <MessageOutlined style={{ fontSize: "16px" }} />{" "}
                            Queries : {data.__meta__.total_posts}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="learn-more-btn">
                      <Button className="btn-text">Join Community</Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link href="community/query_detail">
            <div
              className="view-more-icon"
              style={{ right: "15px", marginTop: "11%" }}
            >
              <ArrowRightOutlined />
            </div>
          </Link>
        </div>
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

export default withRouter(
  connect(mapStateToProps, actionCreators)(CommunityCategory)
);
