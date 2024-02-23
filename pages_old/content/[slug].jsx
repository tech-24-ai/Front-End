import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import { Container } from "reactstrap";
import { crudActions } from "../../_actions";

import BodyBackgroundColor from "../../components/style/bodyBackgroundColor";
class Info extends Component {
  componentDidMount() {
    const { asPath } = this.props.router;
    let slug = asPath.slice(1).split("/")[1];
    this.props.getCrud("page", `page/${slug}`);
  }

  render() {
    const { pages } = this.props;
    return (
      <section className="connect-vendor-wrapper connect-inclusion-wrapper">
        <Container>
          <div className="site-title">
            <h5>{pages && pages.name}</h5>
          </div>
          <div>{pages && pages.details}</div>
          <br />
          <div dangerouslySetInnerHTML={{ __html: pages && pages.html }} />
        </Container>
        <BodyBackgroundColor color="#F4F6F6" />
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  const { pages } = state;
  return {
    pages,
  };
};

const actionCreators = {
  getCrud: crudActions._getAll,
};

export default withRouter(connect(mapStateToProps, actionCreators)(Info));
