// import React, { useEffect, useState } from "react";
// import { Container } from "reactstrap";
// import Image from "next/image";
// import { ArrowRightOutlined } from "@ant-design/icons";
// import Link from "next/link";
// import { crudActions } from "../../_actions";
// import { connect } from "react-redux";
// import Router, { withRouter } from "next/router";
// import moment from "moment";
// const TopQuestion = ({ getAllCrud, communitypost }) => {
//   useEffect(() => {
//     getAllCrud("communitypost", "tranding_question", {
//       pageSize: 3,
//     });
//   }, []);

//   return (
//     <Container>
//       <div className="top-question">
//         <div className="title-section">
//           <p className="title">
//             Top <span className="title bg">Question</span>
//           </p>
//           <Link href="community">
//             <p className="view-more">View more</p>
//           </Link>
//         </div>
//         <div className="question-section">
//           {communitypost?.map((data) => (
//             <div className="question-list">
//               <div className="question-card">
//                 <div className="profile-section">
//                   <div className="profile">
//                     <Image
//                       width={50}
//                       height={55}
//                       src={
//                         data.visitor.profile_pic_url ??
//                         "https://iaauae.s3.me-central-1.amazonaws.com/mR0LnX8AYR"
//                       }
//                       alt=""
//                       placeholder="blog banner"
//                     />
//                     <p className="badge">{data?.__meta__.total_helpful}</p>
//                   </div>
//                   <div className="name-section">
//                     <p className="name">{data?.visitor?.name}</p>
//                     <p className="time">15min ago</p>
//                   </div>
//                 </div>

//                 <p className="question-heading">{data.title}</p>

//                 <div className="skill-section">
//                   {data.postTags?.map((tag) => (
//                     <div className="skill">{tag.name}</div>
//                   ))}
//                 </div>
//                 <div className="button">Answer</div>
//               </div>
//             </div>
//           ))}
//           <Link href="community">
//             <div className="view-more-icon">
//               <ArrowRightOutlined />
//             </div>
//           </Link>
//         </div>
//       </div>
//     </Container>
//   );
// };

// const mapStateToProps = (state) => {
//   const { communitypost, authentication } = state;
//   return {
//     communitypost,
//     authentication,
//   };
// };

// const actionCreators = {
//   getAllCrud: crudActions._getAll,
// };

// export default withRouter(
//   connect(mapStateToProps, actionCreators)(TopQuestion)
// );

//

import React, { Fragment } from "react";
import Router, { useRouter, withRouter } from "next/router";
import { connect } from "react-redux";
import { Container } from "reactstrap";
import { crudService } from "../../_services";
import { userActions } from "../../_actions";
import { UsergroupAddOutlined, MessageOutlined } from "@ant-design/icons";
import { RoboAdvisor, ServiceProvider, Consultant } from "../icons";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import SwiperCore, { Navigation } from "swiper/core";
import { formatDistanceToNow } from 'date-fns';


let counter = 7;

class TrendingQuestion extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      slides: [],
      changeIcon: false,
      hoverId: false,
    };
    this.swiperRef = React.createRef();
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
    const { trendingQuestions } = this.props;

    return (
      <Container>
        <div className="top-question">
          <div className="title-section">
            <p className="title">
              Top <span className="title bg">Questions</span>
            </p>
            <Link href="community">
              <p className="view-more">View more</p>
            </Link>
          </div>
        </div>
        <div className="trending-category-below">
          <div
            onClick={() => this.swiperRef.current.swiper.slidePrev()}
            className="view-more-icon"
            style={{
              left: "110px",
              marginTop: "7%",
              zIndex: "99",
              position: "absolute",
              width: "36px",
              height: "36px",
            }}
          >
            <ArrowLeftOutlined
              style={{
                color: "#fff",
                fontSize: "16px",
              }}
            />
          </div>
          <div
            onClick={() => this.swiperRef.current.swiper.slideNext()}
            className="view-more-icon"
            style={{
              right: "110px",
              marginTop: "7%",
              zIndex: "99",
              position: "absolute",
              width: "36px",
              height: "36px",
            }}
          >
            <ArrowRightOutlined
              style={{
                color: "#fff",
                fontSize: "16px",
              }}
            />
          </div>
          <div className="category-box">
            <div className="category-banner-wrapper" id="categoryWrapper">
              <Fragment>
                <Swiper
                  spaceBetween={50}
                  slidesPerView={3}
                  navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                  }}
                  ref={this.swiperRef}
                >
                  {trendingQuestions?.map((data, index) => (
                    <SwiperSlide key={index}>
                      <div
                        className="category-banner-block"
                        data-index={index}
                        key={index}
                      >
                        <div className="category-banner">
                          <div className="category-content">
                            <div className="content-head">
                              <div className="medium">
                                <Image
                                  style={{
                                    borderRadius: "8px",
                                  }}
                                  src={
                                    data.visitor.profile_pic_url ||
                                    "https://tech24-uat.s3.amazonaws.com/D10dkiDJHM"
                                  }
                                  alt={data.visitor.name}
                                  width={48}
                                  height={48}
                                />
                              </div>
                              <div
                                className="category-text"
                                style={{ minWidth: "70%" }}
                              >
                                <h6>{data?.visitor?.name}</h6>
                                <p>{data.created_at}</p>
                              </div>
                            </div>

                            <div className="card-trend-body">
                              <p class="card-text">{data.description}</p>
                              <div className="content-x">
                                <div
                                  className="design-content"
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                  }}
                                >
                                  {data.postTags.map((tag, index) => (
                                    <p key={index}>{tag.name}</p>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="learn-more-btn">
                              <h6 className="btn-text">Answer</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Fragment>
            </div>
          </div>
        </div>
      </Container>
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
  connect(mapStateToProps, actionCreators)(TrendingQuestion)
);
