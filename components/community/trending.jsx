// import React, { Fragment } from "react";
// import Router, { useRouter, withRouter } from "next/router";
// import { connect } from "react-redux";
// import { Button, Container } from "reactstrap";
// import { crudService } from "../../_services";
// import { userActions } from "../../_actions";
// import { UsergroupAddOutlined, MessageOutlined } from "@ant-design/icons";
// import { RoboAdvisor, ServiceProvider, Consultant } from "../icons";
// import Image from "next/image";
// import Link from "next/link";
// import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper-bundle.min.css";
// import SwiperCore, { Navigation, Pagination } from "swiper/core";
// import { formatDistanceToNow } from 'date-fns';
// import moment from "moment";
// import { isMobile } from "react-device-detect";

// SwiperCore.use([Navigation, Pagination]);
// let counter = 7;

// class TrendingQuestion extends React.PureComponent {
//   constructor(props) {
//     super(props);
//     this.state = {
//       categories: [],
//       slides: [],
//       changeIcon: false,
//       hoverId: false,
//     };
//     this.swiperRef = React.createRef();
//   }

//   componentDidMount() {
//     crudService
//       ._getAll(
//         "categories?orderBy=sort_order&orderPos=ASC&not_categories=[1,5]",
//         {}
//       )
//       .then((result) => {
//         this.setState({ categories: result.data });
//         this.bindSlides();
//       });
//   }

//   bindSlides = () => {
//     const { categories, changeIcon } = this.state;
//     let slides = [];

//     if (categories && categories.length) {
//       categories.forEach((element, index) => {
//         if (changeIcon) {
//           if (index >= counter) {
//             slides.push(element);
//           }
//         } else {
//           if (index < counter) {
//             slides.push(element);
//           }
//         }
//       });
//     }
//     this.setState({
//       slides: slides,
//     });
//   };

//   goToModules = (data) => {
//     sessionStorage.removeItem("bgColor");
//     sessionStorage.removeItem("categoryId");
//     sessionStorage.removeItem("moduleId");
//     sessionStorage.removeItem("childrenIds");
//     sessionStorage.removeItem("isAdvanced");

//     sessionStorage.setItem("categoryId", data.id);
//     sessionStorage.setItem("bgColor", data.bg_color);
//     const seoUrl = data.name.replace(/ /g, "_").toLowerCase();
//     if (!!data.no_flow) {
//       Router.push({
//         pathname: `/d/${seoUrl.replace(/&/g, "and")}`,
//         //pathname: `/${seoUrl.replace(/&/g, "and")}`,
//       });
//     } else {
//       Router.push({
//         pathname: `/technology/${seoUrl}`,
//       });
//     }
//   };

//   handleScroll = () => {
//     const { changeIcon } = this.state;
//     this.setState(
//       {
//         changeIcon: !changeIcon,
//       },
//       () => this.bindSlides()
//     );
//   };

//   onCatHover = (id) => {
//     this.setState({
//       hoverId: id,
//     });
//   };

//   handleGoToPage = (url) => {
//     const restrictedUrls = ["/consultant", "/consultant/service_provider"];
//     if (!this.props.isloggedIn && restrictedUrls.includes(url)) {
//       this.props.toggleLoginPopup(true);
//       return false;
//     }

//     Router.push(url);
//   };

//   render() {
//     const { changeIcon, slides, hoverId } = this.state;
//     const { trendingQuestions } = this.props;

//     const calculateTimeAgo = (createdAt) => {
//       const currentDateTime = moment().format("MM-DD-YYYY hh:mm A");
//       const blogPostDateTime = moment(createdAt, "MM-DD-YYYY hh:mm A");
//       const diffMilliseconds = blogPostDateTime.diff(currentDateTime);
//       const duration = moment.duration(diffMilliseconds);
//       const humanReadableDiff = duration.humanize(true);
//       return humanReadableDiff;
//     };

//     return (
//       <div className="trending-category-below">
//         {!isMobile && (
//           <div
//             onClick={() => this.swiperRef.current.swiper.slidePrev()}
//             className="view-more-icon"
//             style={{
//               left: "73px",
//               marginTop: "7%",
//               zIndex: "99",
//               position: "absolute",
//               width: "36px",
//               height: "36px",
//             }}
//           >
//             <ArrowLeftOutlined
//               style={{
//                 color: "#fff",
//                 fontSize: "16px",
//               }}
//             />
//           </div>
//         )}
//         <div className="category-box">
//           <div className="category-banner-wrapper" id="categoryWrapper">
//             <Fragment>
//               <Swiper
//                 spaceBetween={50}
//                 // slidesPerView={isMobile ? 1 : 3}
//                 slidesPerView={(window.innerWidth <= 767 ? 1 : 3)}
//                 pagination={
//                   isMobile
//                     ? {
//                         clickable: true,
//                         renderBullet: function (index, className) {
//                           if (index < 6) {
//                             return `<span class="${className}"></span>`;
//                           } else {
//                             return "";
//                           }
//                         },
//                       }
//                     : false
//                 }
//                 navigation={{
//                   nextEl: ".swiper-button-next",
//                   prevEl: ".swiper-button-prev",
//                 }}
//                 ref={this.swiperRef}
//               >
//                 {trendingQuestions?.map((data, index) => (
//                   <SwiperSlide key={index}>
//                     <div
//                       className="category-banner-block"
//                       data-index={index}
//                       key={index}
//                     >
//                       <div className="category-banner">
//                         <div className="category-content">
//                           <div className="content-head">
//                             <div className="medium">
//                               <Image
//                                 style={{
//                                   borderRadius: "8px",
//                                 }}
//                                 src={
//                                   data.visitor.profile_pic_url ||
//                                   "https://tech24-uat.s3.amazonaws.com/D10dkiDJHM"
//                                 }
//                                 alt={data.visitor.name}
//                                 width={48}
//                                 height={48}
//                               />
//                               {/* <img src={data.visitor.profile_pic_url}
//                                 style={{
//                                   borderRadius: "8px",
//                                   width: "48px",
//                                   height: "48px"
//                                 }}
//                                 alt={data.visitor.name}
//                                 /> */}
//                             </div>
//                             <div
//                               className="category-text"
//                               style={{ minWidth: "70%" }}
//                             >
//                               <h6>{data?.visitor?.name}</h6>
//                               <p>
//                                 {calculateTimeAgo(data?.created_at)}
//                               </p>
//                             </div>
//                           </div>

//                           <div className="card-trend-body">
//                             <p class="card-text">
//                               <span
//                                 dangerouslySetInnerHTML={{
//                                   __html: data.description,
//                                 }}
//                               ></span>
//                             </p>
//                             <div className="content-x">
//                               <div
//                                 className="design-content"
//                                 style={{
//                                   display: "flex",
//                                   flexDirection: "row",
//                                 }}
//                               >
//                                 {data.postTags.map((tag, index) => (
//                                   <p key={index}>{tag.name}</p>
//                                 ))}
//                               </div>
//                             </div>
//                           </div>
//                           <div className="learn-more-btn">
//                             <Button
//                               className="btn-text"
//                               onClick={() => {
//                                 sessionStorage.setItem(
//                                   "community_question_id",
//                                   data?.url_slug
//                                 );
//                                 Router.push("community/question");
//                               }}
//                             >
//                               Answer
//                             </Button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </SwiperSlide>
//                 ))}
//               </Swiper>
//               {!isMobile && (
//                 <div
//                   onClick={() => this.swiperRef.current.swiper.slideNext()}
//                   className="view-more-icon"
//                   style={{
//                     right: "40px",
//                     marginTop: "8%",
//                     width: "36px",
//                     height: "36px",
//                   }}
//                 >
//                   <ArrowRightOutlined />
//                 </div>
//               )}
//             </Fragment>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   const { authentication, confirm } = state;
//   const { user, loggedIn } = authentication;
//   return { user, confirm, isloggedIn: loggedIn };
// };

// const actionCreators = {
//   toggleLoginPopup: userActions.toggleLoginPopup,
// };

// export default withRouter(
//   connect(mapStateToProps, actionCreators)(TrendingQuestion)
// );

import React, { Fragment, useRef } from "react";
import Router, { useRouter, withRouter } from "next/router";
import { connect } from "react-redux";
import { Container, Button } from "reactstrap";
import { crudService } from "../../_services";
import { userActions } from "../../_actions";
import Link from "next/link";
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import QuestionCard from "./QuestionCard";

const TrendingQuestion = ({ trendingQuestions }) => {
  const slider = useRef(null);

  return (
    <Container style={{ padding: "0" }}>
      <div className="trending-category-below">
        <div className="category-box">
          <div className="category-banner-wrapper" id="categoryWrapper">
            <div
              onClick={() => slider.current?.slickPrev()}
              className="view-more-arrow previous-arrow"
              style={{
                left: "-15px",
                marginTop: "0px",
                top: "40%",
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
              onClick={() => slider.current?.slickNext()}
              className="view-more-arrow next-arrow"
              style={{
                right: "-17px",
                marginTop: "0px",
                top: "40%",
              }}
            >
              <ArrowRightOutlined
                style={{
                  color: "#fff",
                  fontSize: "16px",
                }}
              />
            </div>
            <Slider
              ref={slider}
              speed={500}
              slidesToScroll={1}
              slidesToShow={3}
              arrows={false}
              responsive={[
                {
                  breakpoint: 1200,
                  settings: {
                    slidesToShow: 2,
                    dots: false,
                  },
                },

                {
                  breakpoint: 767,
                  settings: {
                    slidesToShow: 1,
                    dots: false,
                  },
                },
              ]}
              appendDots={(dots) => (
                <div>
                  <ul> {dots} </ul>
                </div>
              )}
            >
              {trendingQuestions?.slice(0, 5).map((data, index) => (
                <QuestionCard data={data} key={index} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </Container>
  );
};

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
