import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import { Container } from "reactstrap";
import { crudActions } from "../../_actions";
import BodyBackgroundColor from "../../components/style/bodyBackgroundColor";
import Link from "next/dist/client/link";
import Head from "next/head";
import {
  TwitterShareButton,
  TwitterIcon,
  LinkedinIcon,
  LinkedinShareButton,
} from "next-share";

class Blogs extends Component {
  componentDidMount() {
    const { asPath } = this.props.router;
    let slug = asPath.slice(1).split("/")[1];
    this.props.getCrud("blog", `blogs/${slug}`);
  }

  render() {
    const { blog } = this.props;
    const shareTitle = blog && blog.name
    const slug = blog && blog.slug
    const baseUrl = process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI.replace("/linkedin","")
    const shareUrl = `${baseUrl}/blogs/${slug}`
    
    return (
      <section className="connect-vendor-wrapper connect-inclusion-wrapper">
        <Container>
          <div className="site-title" style={{ marginBottom: "0px" }}>
            <Head>
              <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width user-scalable=no"
              />
              <meta name="title" content={blog && blog.meta_title} />

              <meta
                name="description"
                content={blog && blog.meta_description}
              />
              <meta name="keywords" content={blog && blog.meta_keywords} />
            </Head>
            <Link href="/blogs/">
              <a>Go Back</a>
            </Link>
            <img className="imgur" src={blog && blog.banner} />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                paddingRight: "5px",
                paddingTop:'20px'
              }}
            >
                <h2 style={{ marginBottom: "0", fontWeight: "600" }}>
                  {blog && blog.name}
                </h2>
              {blog && (<div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  width: "100px",
                  marginLeft: "10px",
                }}
              >
                <LinkedinShareButton
                  url={shareUrl}
                  title={shareTitle}
                  style={{ marginRight: "10px" }}
                >
                  <LinkedinIcon size={25} round />
                </LinkedinShareButton>
                <TwitterShareButton
                  url={shareUrl}
                  title={shareTitle}
                >
                  <TwitterIcon size={25} round />
                </TwitterShareButton>

              </div>
              )}
            </div>
            
            <p>
              {blog &&
                new Date(
                  Date.parse(blog.created_at.replace(/-/g, "/"))
                ).toLocaleDateString("en-GB")}
            </p>
          </div>
          <div>
            <p>{blog && blog.details}</p>
          </div>
          <br />
          <div dangerouslySetInnerHTML={{ __html: blog && blog.html }} />
        </Container>
        <BodyBackgroundColor color="#F4F6F6" />
      </section>
    );
  }
}
const mapStateToProps = (state) => {
  const { blog } = state;
  return {
    blog: blog ? blog[0] : null,
  };
};

const actionCreators = {
  getCrud: crudActions._getAll,
};

export default withRouter(connect(mapStateToProps, actionCreators)(Blogs));
