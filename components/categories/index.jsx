// import React, { Fragment } from "react";
// import Router, { useRouter, withRouter } from "next/router";
// import { connect } from "react-redux";
// import { Container, Carousel } from "reactstrap";
// import { isMobile, isTablet, isBrowser } from "react-device-detect";
// import { Icon } from "react-icons-kit";
// import { iosArrowBack } from "react-icons-kit/ionicons/iosArrowBack";
// import { iosArrowForward } from "react-icons-kit/ionicons/iosArrowForward";
// import Arrow from "../../public/images/category/arrow.svg";
// import { crudService } from "../../_services";
// import { userActions } from "../../_actions";
// import ArrowDown from "../../public/images/category/arrowdown.svg";
// import ArrowUp from "../../public/images/category/arrowup.svg";
// import centerLogo from "../../public/images/header/Group 594.png";
// import moreIcon from "../../public/images/header/Group 550.png";
// import { Col, Row, FormGroup } from "reactstrap";
// import { TreeSelect } from "antd";
// import Image from "next/image";
// import myImageLoader from "../imageLoader";

// import {
//   RoboAdvisor,
//   ResearchTool,
//   ServiceProvider,
//   Consultant,
// } from "../icons";

// let counter = isMobile ? 7 : 7;
// class Categories extends React.PureComponent {
//   constructor(props) {
//     super(props);
//     this.state = {
//       categories: [],
//       slides: [],
//       changeIcon: false,
//       hoverId: false,
//     };
//     console.log("props", props);
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
//     const categoryList = [
//       {
//         title: (
//           <Fragment>
//             Talk to a Robo-Advisor
//           </Fragment>
//         ),
//         description: [
//           "Find the right software, hardware or service",
//           "Troubleshoot problems",
//           "Reduce costs",
//           "Get best practice guidance",
//         ],
//         icon: <RoboAdvisor />,
//         urlTarge: "/it-robo",
//       },
//       {
//         title: "Talk to a consultant",
//         description: [
//           "Engage with a consultant over a video conference.",
//           "Pay per minute.",
//           "Discuss strategy, technology and costs.",
//         ],

//         icon: <Consultant />,
//         urlTarge: "/consultant",
//       },
//       {
//         title: "Work with a service provider",
//         description: [
//           "Pay at 20% less than market rates",
//           "App development, managed services, custom integration, UI design, Assessments & more",
//         ],
//         icon: <ServiceProvider />,

//         urlTarge: "/consultant/service_provider",
//       },
//       {
//         title: "Access Free Research",
//         description: [
//           "In-depth product comparison reports.",
//           "Top Use cases",
//           "Calculators",
//           "Tools and more",
//         ],
//         icon: <ResearchTool />,

//         urlTarge: "market-research",
//       },
//     ];

//     return (
//       <div className="category-below">
//         <Container style={{ marginTop: "30px" }}>
//           <div className="category-box">
//             <div className="category-banner-wrapper" id="categoryWrapper">
//               {categoryList.map((data, i) => (
//                 <div
//                   className="category-banner-block"
//                   data-index={i}
//                   key={i}
//                   onClick={() => this.handleGoToPage(data.urlTarge)}
//                 >
//                   <div className="category-banner">
//                     <div className="category-content">
//                       {/* <div className="custom-icon">{data.icon}</div> */}

//                       <h6>{data.title}</h6>
//                       <div className="learn-more-btn">Learn More</div>
//                     </div>
//                     {isBrowser && (
//                       <div className="category-hover">
//                         <div className="category-hover-content">
//                           <div className="custom-icon">
//                             {/* {data.icon} */}
//                           </div>
//                           <div className="category-content">
//                             <h6>{data.title}</h6>
//                           </div>
//                           <ul>
//                             {data.description.map((des, idx) => (
//                               <li key={idx}>{des}</li>
//                             ))}
//                           </ul>
//                           <a href={data.urlTarge} className="learn-more-btn">
//                             Learn More
//                           </a>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </Container>
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

// export default withRouter(connect(mapStateToProps, actionCreators)(Categories));

import React, { Fragment } from "react";
import Router, { useRouter, withRouter } from "next/router";
import { connect } from "react-redux";
import { Container, Carousel, CarouselItem, CarouselControl } from "reactstrap";
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

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  RoboAdvisor,
  ResearchTool,
  ServiceProvider,
  Consultant,
} from "../icons";

let counter = isMobile ? 7 : 7;

class Categories extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      slides: [],
      changeIcon: false,
      hoverId: false,
      activeIndex: 0,
      animating: false,
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

  next = () => {
    if (this.state.animating) return;
    const nextIndex =
      this.state.activeIndex === this.state.slides.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  };

  previous = () => {
    if (this.state.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? this.state.slides.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  };

  render() {
    const { changeIcon, slides, hoverId, activeIndex } = this.state;
    const categoryList = [
      {
        title: <Fragment>Talk to a Robo-Advisor</Fragment>,
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
        title: "Talk to a consultant",
        description: [
          "Engage with a consultant over a video conference.",
          "Pay per minute.",
          "Discuss strategy, technology and costs.",
        ],

        icon: <Consultant />,
        urlTarge: "/consultant",
      },
      {
        title: "Work with a service provider",
        description: [
          "Pay at 20% less than market rates",
          "App development, managed services, custom integration, UI design, Assessments & more",
        ],
        icon: <ServiceProvider />,

        urlTarge: "/consultant/service_provider",
      },
      {
        title: "Access Free Research",
        description: [
          "In-depth product comparison reports.",
          "Top Use cases",
          "Calculators",
          "Tools and more",
        ],
        icon: <ResearchTool />,

        urlTarge: "market-research",
      },
    ];

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      className: "slider-container",
      centerMode: true,
      centerPadding: "60px",
      slidesToShow: 1,
    };

    return (
      <div className="category category-below">
        <Container>
          <div className="category-box">
            <Slider {...settings}>
              {categoryList.map((data, i) => (
                <div className="category-card">
                  <h5 className="title">{data.title}</h5>
                  <p className="description">{data.description}</p>
                  <a href={data.urlTarge} className="learn-more-btn">
                    Learn More
                  </a>
                </div>
              ))}
            </Slider>
          </div>
        </Container>
      </div>
    );

    return (
      <div className="category-below">
        <Container style={{ marginTop: "30px" }}>
          <div className="category-box">
            <Carousel
              activeIndex={activeIndex}
              next={this.next}
              previous={this.previous}
              interval={2000}
              ride="carousel"
            >
              {categoryList.map((data, i) => (
                <CarouselItem key={i}>
                  <div
                    className="category-banner-block"
                    data-index={i}
                    onClick={() => this.handleGoToPage(data.urlTarge)}
                    style={{ width: "60%", margin: "0 auto" }}
                  >
                    <div
                      className="category-banner"
                      style={{
                        color: "white",
                        padding: "20px",
                        borderRadius: "10px",
                      }}
                    >
                      <div className="category-content">
                        {typeof data.title === "string" ? (
                          <h6
                            style={{
                              fontSize: "18px",
                              fontWeight: "bold",
                              marginBottom: "10px",
                            }}
                          >
                            {data.title}
                          </h6>
                        ) : (
                          <h6
                            style={{
                              fontSize: "18px",
                              fontWeight: "bold",
                              marginBottom: "10px",
                            }}
                          >
                            {data.title}
                          </h6>
                        )}
                        <div className="learn-more-btn">Learn More</div>
                      </div>
                      {isBrowser && (
                        <div className="category-hover">
                          <div className="category-hover-content">
                            <div className="custom-icon">
                              {/* {data.icon} */}
                            </div>
                            <div className="category-content">
                              <h6>{data.title}</h6>
                            </div>
                            <ul>
                              {data.description &&
                                data.description.map((des, idx) => (
                                  <li key={idx}>{des}</li>
                                ))}
                            </ul>
                            <a href={data.urlTarge} className="learn-more-btn">
                              Learn More
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CarouselItem>
              ))}
              <CarouselItem />
            </Carousel>
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

export default withRouter(connect(mapStateToProps, actionCreators)(Categories));
