import React, { Component, Fragment } from "react";
import { withRouter } from "next/router";
import Link from "next/link";
import { Container, NavLink } from "reactstrap";
import BodyBackgroundColor from "../../components/style/bodyBackgroundColor";
import { crudService } from "../../_services";
import { post } from "jquery";
class Blogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      fnColor: "",
      isActive: "All",
      isHover: "All",
    };
  }

  blogsList = (id) => {
    crudService._getAll("blogs", { blog_topic_id: id }).then((result) => {
      this.setState({ posts: result.data });
    });
  };

  componentDidMount() {
    this.blogsList(0);
    let query = this.props.router.query;
    crudService._getAll("categories", {}).then((result) => {
      let categories = result.data;
      categories.unshift({
        name: "All",
        id: 0,
        color: "#C0C0C0",
      });
      if (query) {
        const cuurentCategory = categories.filter(
          (c) => c.name == query.cat
        )[0];
        if (cuurentCategory) {
          this.blogsList(cuurentCategory.id);
          this.setState({ isActive: query.cat, isHover: query.cat });
        }
      }

      this.setState({ posting: categories });
    });
  }

  render() {
    const { isActive, isHover } = this.state;

    console.log("Active:", isActive);
    return (
      <section className="connect-vendor-wrapper connect-inclusion-wrapper">
        <Container>
          <div>
            <h5
              style={{
                fontSize: "20px",
                paddingBottom: "40px",
              }}
            >
              Blogs
            </h5>
            <div className="blogs-category-filters">
              {/*<a onClick={() =>{this.blogsList(0)}} style={{margin: "0 0 0 4px", padding: "5px 15px", 
      borderRadius: "5px" , fontWeight: "500", fontSize: "0.9rem"}}>All</a>*/}

              {this.state.posting &&
                this.state.posting
                  .filter((e) => e.id != 5 && e.id != 1)
                  .map((post, key) => (
                    <a
                      key={key}
                      onMouseOver={(e) => this.setState({ isHover: post.name })}
                      onMouseOut={(e) => this.setState({ isHover: "" })}
                      onClick={() => {
                        this.setState({ isActive: post.name });
                        this.blogsList(post.id);
                      }}
                      style={{
                        backgroundColor: post.color,
                        // color:
                        //   this.state.isActive === post.name ||
                        //   this.state.isHover === post.name
                        //     ? "white"
                        //     : "black",
                        color: "white",
                        margin: "5px 0 0 5px",
                        padding: "5px 6px",
                        borderRadius: "5px",
                        fontWeight: "500",
                        fontSize:
                          this.state.isActive === post.name
                            ? "1.1rem"
                            : "0.8rem" && this.state.isHover === post.name
                            ? "1.1rem"
                            : "0.8rem",
                      }}
                    >
                      <img
                        style={{
                          display: post.image ? "" : "none",
                          margin: "0 3px 0 0",
                          width: "20px",
                          height: "20px",
                          borderRadius: "4px",
                          padding: "0 5px 0 0",
                        }}
                        src={post.image ? post.image : ""}
                      ></img>
                      {post.name}
                    </a>
                  ))}
            </div>
            <div
              className="container-fluid blogs"
              style={{ marginTop: "2rem" }}
            >
              <div className="row">
                {this.state.posts.length > 0
                  ? this.state.posts.map((post, key) => (
                      <Link href={`blogs/${post.slug}`}>
                        <div
                          key={key}
                          className="blogs-col col-sm-6 col-md-6 col-lg-4"
                        >
                          <div
                            className="card border-0"
                            style={{
                              width: "100%",
                              backgroundColor: "inherit",
                              cursor: "pointer",
                            }}
                            onClick={() => <Link href={`blogs/${post.slug}`} />}
                          >
                            <img
                              style={{
                                width: "100%",
                                height: "250px",
                                borderRadius: "5px",
                              }}
                              src={
                                post.image
                                  ? post.image
                                  : "images/img_not_available.jpg"
                              }
                            />
                            <div className="card-body p-0 pt-4">
                              <h3
                                className="card-title"
                                style={{
                                  fontSize: "12px",
                                  fontweight: "100",
                                }}
                              >
                                {post.blog_topic_name}
                              </h3>
                              <p
                                style={{
                                  fontSize: "21px",
                                  textAlign: "left",
                                }}
                              >
                                {post.name}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))
                  : this.state.posts && this.state.posts.length == 0
                  ? "No Blogs"
                  : ""}
              </div>
            </div>
          </div>
        </Container>
        <BodyBackgroundColor color="#F4F6F6" />
      </section>
    );
  }
}

export default withRouter(Blogs);
