import { withRouter } from "next/router";
import { Container } from "reactstrap";
import { crudService } from "../_services";
import React, { Component } from "react";
import Head from "next/head";
import PageBanner from "../components/card/pageBanner";
import FAQsImage from "../public/new_images/faqs-bg.svg";
import viewMoreIcon from "../public/new_images/Faqs/view-more.svg";
import closeIcon from "../public/new_images/Faqs/close-view.svg"
import { isMobile } from "react-device-detect";

class FAQs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      postCategory: [],
      isExpanded: "",
      selectedButton: "Buyer",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    crudService._getAll("faqcategory", {})
      .then((result) => {
        const postCategoryData = result.data;
        this.setState({ postCategory: postCategoryData });
      })
      .then(() => {
        crudService._getAll("faq", {})
          .then((result) => {
            const postData = result.data;
            this.setState({ post: postData });
          });
      });
  }

  handleChange(panel) {
    this.setState({
      isExpanded: this.state.isExpanded === panel ? "" : panel,
    });
  }

  handleButtonClick = (buttonName) => {
    this.setState({ selectedButton: buttonName });
  };

  render() {
    const { postCategory, post, selectedButton, isExpanded } = this.state;

    return (
      <section className="faqs-portal-section">
        <PageBanner
          titleNode={<div><h4>FAQs</h4></div>}
          image={FAQsImage}
        />
        
        <Container>
          <div className="faqs-body-container">
            <h2 className="faq-title">Frequently Asked Questions</h2>
            <h6 className="faq-detail">These are the questions we hear more often.</h6>
            <div className="faq-wrapper">
              <div className="faq-header">
                <div
                  className={`faq-bg ${ selectedButton === "Buyer" ? "selected" : "" } `}
                  onClick={() => this.handleButtonClick("Buyer")}
                  role="button"
                  tabIndex={0}
                >
                  <h6>For Buyer</h6>
                </div>
                <div
                  className={`faq-bg ${ selectedButton === "Vendor" ? "selected" : "" } `}
                  onClick={() => this.handleButtonClick("Vendor")}
                  role="button"
                  tabIndex={1}
                >
                  <h6>For Vendor</h6>
                </div>
              </div>
              <div className="faq-container">
                {selectedButton === "Vendor" ? (
                  <div className="faq-vndr-body-bg">
                    <h5>For Vendors</h5>
                    <div className="vendor-body-content">
                      <h6>How do we get included in the list of product recommendations?</h6>
                    </div>
                  </div>
                ) : (
                  <>
                    <h5>For Buyer</h5>
                    {postCategory.map((posting) => (
                      <div className="faq-buy-body-bg" key={posting.id}>
                        {post
                          .filter((faq) => faq.faq_category_id == posting.id)
                          .map((posts) => (
                            <div className="buyer-body-content" key={posts.id}>
                              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>


                                <h6>{posts.name}</h6>
                                <div
                                  className="expand-lgl"
                                  onClick={() => this.handleChange(`section${ posting.id }${ posts.id } `)}
                                >
                                  {isExpanded === `section${ posting.id }${ posts.id } ` ?
                                    (<img src={closeIcon.src} />)
                                    : (<img src={viewMoreIcon.src} />)
                                  }
                                </div>
                              </div>
                              <p style={{
                                display: isExpanded === `section${ posting.id }${ posts.id } ` ? "" : "none",
                              }}>{posts.details}</p>
                            </div>
                          ))
                        }
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>
    );
  }
}

export default withRouter(FAQs);
