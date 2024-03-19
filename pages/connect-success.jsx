import React from "react";
import Router from "next/router";
import { connect } from "react-redux";
import { Container, ButtonGroup, Button } from "reactstrap";
import { connectActions } from "../_actions";
import ConnectTypeHeader from "../components/connect/connectTypeHeader";
import BodyBackgroundColor from "../components/style/bodyBackgroundColor";
import { Icon } from "react-icons-kit";
import { checkmarkCircled } from "react-icons-kit/ionicons/checkmarkCircled";
class ConnectSuccess extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      contactType: null,
      contactTypeName: null,
    };
  }

  componentDidMount() {
    this.checkStep1();
  }

  checkStep1 = () => {
    const { setStep1, setStep2 } = this.props;

    if (!setStep1 && !setStep2) {
      // Router.push('/connect')
    }
  };

  static getDerivedStateFromProps(props, state) {
    let newState = state;
    if (props.contactTypeName) {
      newState.contactTypeName = props.contactTypeName;
    }
    if (props.contactType) {
      newState.contactType = props.contactType;
    }
    return newState;
  }

  onBackClick = () => {
    this.props.clearConnect();
    Router.push("/");
  };

  render() {
    const { contactTypeName } = this.state;

    return (
      <section className="connect-consulting-wrapper">
        <Container>
          <ConnectTypeHeader contactTypeName={contactTypeName} />

          <div className="select-category-block">
            <div className="success-icon">
              <Icon size={32} icon={checkmarkCircled} />
            </div>
            {/* <p>Your information is successfully submitted. we will shortly get back to you with next steps.</p>
                        <p>In case you missed anything, you can always reach us through following support channels</p> */}
            <p>We will get back to you shortly.</p>
            <p>You can also reach us through following support channels</p>

            {/* <p>
              <strong>Phone:</strong> +91 123 456 7890
            </p> */}
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:support@tech24.ai">support@tech24.ai</a>
            </p>

            <div className="button-wrapper" style={{ marginBottom: "2rem" }}>
              <ButtonGroup>
                <Button
                  type="button"
                  color="secondary"
                  onClick={() => this.onBackClick()}
                >
                  OK
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </Container>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  const { connectData, authentication } = state;
  const { user } = authentication;
  return {
    user,
    setStep1: connectData[0] !== undefined ? true : false,
    setStep2: connectData[1] !== undefined ? true : false,
    contactTypeId:
      connectData[0] !== undefined ? connectData[0].contactTypeId : null,
    contactTypeName:
      connectData[0] !== undefined ? connectData[0].contactTypeName : null,
  };
};

const actionCreators = {
  clearConnect: connectActions._clear,
};

export default connect(mapStateToProps, actionCreators)(ConnectSuccess);
