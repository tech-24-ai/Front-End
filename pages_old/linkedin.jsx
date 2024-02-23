import { connect } from 'react-redux';
import { withRouter } from 'next/router'
import { userActions } from '../_actions';
import { useEffect } from 'react';
const Linkedin = (props) => {
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code")
    if (code) {
      props.login(code)
    }
  }, [])

  return ('');
}

function mapState(state) {
  const { authentication } = state;
  return {
    isloggedIn: authentication.loggedIn
  };
}

const actionCreators = {
  login: userActions.linkedInLogin,
};


export default withRouter(connect(mapState, actionCreators)(Linkedin));