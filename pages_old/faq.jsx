import { withRouter } from "next/router";
import { Container } from "reactstrap";
import BodyBackgroundColor from "../components/style/bodyBackgroundColor";
import { crudService } from "../_services";
import React, { Component, Fragment } from "react";
import Head from "next/head";

class Faq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      postCategory: [],
      temArray: null,
      close: true,
      isExpanded: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    crudService._getAll("faqcategory", {}).then((result) => {
      this.setState({ postCategory: result.data });
    }),
      crudService._getAll("faq", {}).then((result) => {
        this.setState({ post: result.data });
      });
  }

  action() {
    this.setState({
      showMe: false,
    });
  }

  handleChange(panel) {
    this.setState({
      isExpanded: this.state.isExpanded === panel ? "" : panel,
    });
  }

  render() {
    return (
      <section className="connect-vendor-wrapper connect-inclusion-wrapper">
        <Head>
          <meta
            name="viewport"
            content="width=device-width, minimum-scale=1.0, maximum-scale=5.0, user-scalable=no"
          />
          <meta name="title" content="FAQ" />
          <meta name="description" content="Get all your queries answered" />
          <meta
            name="keywords"
            content="ITMAP payment queries, ITMAP support, ITMAP Recommendations, Vendor inclusion, Research Methodology"
          />
        </Head>
        <Container style={{ marginTop: "10px" }}>
          <div className="site-title">
            <h3>Frequently Asked Questions</h3>

            {this.state.postCategory.map((posting, key1) => (
              <div style={{ marginTop: "2rem" }}>
                <h3 style={{ fontSize: "18px" }}>{posting.name}</h3>
                <div className="accordion">
                  {this.state.post.filter(
                    (faq) => faq.faq_category_id == posting.id
                  ).length > 0 ? (
                    this.state.post
                      .filter((faq) => faq.faq_category_id == posting.id)
                      .map((posts, key2) => (
                        <div className="accordion-item">
                          <div className="d-flex accordion-title">
                            <div className="flex-grow-1">{posts.name}</div>
                            <div
                              className="expandBtn"
                              onClick={() =>
                                this.handleChange(`section${key1}${key2}`)
                              }
                            >
                              {this.state.isExpanded === `section${key1}${key2}`
                                ? "-"
                                : "+"}
                            </div>
                          </div>
                          <p
                            className="accordion-content"
                            style={{
                              display:
                                this.state.isExpanded ===
                                `section${key1}${key2}`
                                  ? ""
                                  : "none",
                            }}
                          >
                            {posts.details}
                          </p>
                        </div>
                      ))
                  ) : (
                    <div className="d-flex accordion-item">No Faq's</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
        <BodyBackgroundColor color="#F4F6F6" />
      </section>
    );
  }
}

export default withRouter(Faq);
