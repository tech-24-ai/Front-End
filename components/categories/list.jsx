import React from "react";
import { withRouter } from "next/router";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";
import Arrow from "../../public/images/category/arrow.svg";
import { crudService } from "../../_services";
import Image from "next/image";
import myImageLoader from "../imageLoader";

class Categories extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    crudService
      ._getAll("categories?orderBy=sort_order&orderPos=ASC", {})
      .then((result) => {
        this.setState({ categories: result.data });
      });
  }

  goToModules = (data) => {
    const { router } = this.props;
    sessionStorage.removeItem("bgColor");
    sessionStorage.removeItem("categoryId");
    sessionStorage.removeItem("moduleId");
    sessionStorage.removeItem("childrenIds");
    sessionStorage.removeItem("isAdvanced");

    sessionStorage.setItem("categoryId", data.id);
    sessionStorage.setItem("bgColor", data.bg_color);
    if (!!data.no_flow) {
      router.replace("/d");
    } else {
      router.replace("/technology");
    }
  };

  render() {
    const { categories } = this.state;
    if (categories && categories.length) {
      return (
        <div className="category-section">
          <div className="category-box">
            <div className="category-banner-wrapper">
              {categories &&
                categories.length &&
                categories.map((data, i) => (
                  <div
                    className="category-banner-block"
                    key={i}
                    onClick={() => {
                      this.goToModules(data);
                    }}
                  >
                    <div
                      className={`category-banner ${`color-${i}`}`}
                      style={{ backgroundColor: data.color }}
                    >
                      <div className="category-img">
                        <img src={data.image} className="banner12" />
                        {/* <img src={Arrow.src} className="arrow-img" /> */}
                        {isMobile && (
                          <Image
                            loader={myImageLoader}
                            src={Arrow}
                            className="arrow-img"
                            alt=""
                            placeholder="Arrow"
                            layout="raw"
                            style={{ objectFit: "contain" }}
                          />
                        )}
                      </div>
                      <div className="category-content">
                        <h6>{data.name}</h6>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          {categories && categories.length > 6 && (
            <img src={Arrow.src} className="Path-336"></img>
          )}
        </div>
      );
    }
    return "";
  }
}

const mapStateToProps = (state) => {
  const { authentication, confirm } = state;
  const { user } = authentication;
  return { user, confirm };
};

const actionCreators = {};

export default withRouter(connect(mapStateToProps, actionCreators)(Categories));
