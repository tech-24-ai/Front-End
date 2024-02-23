import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router'
import { Container } from 'reactstrap';
import BodyBackgroundColor from '../components/style/bodyBackgroundColor'
import { userActions } from '../_actions';

class Logout extends Component {
  componentDidMount() {
    this.props.logout()

  }
  render() {
    return (
      <section className="connect-vendor-wrapper connect-inclusion-wrapper">
        <Container>
        </Container>
        <BodyBackgroundColor color="#F4F6F6" />
      </section>
    );
  }
}


function mapState(state) {
  const { authentication } = state;
  return {
    isloggedIn: authentication.loggedIn
  };
}

const actionCreators = {
  logout: userActions.logout,
};


export default withRouter(connect(mapState, actionCreators)(Logout));