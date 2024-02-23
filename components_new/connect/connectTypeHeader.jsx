import React from "react";
import { Input, Label, Tooltip } from "reactstrap";
import Component from "../../public/images/datacenter/component.svg";
import NextIcon from "../../public/images/datacenter/next.svg";

class ConnectTypeHeader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tooltipOpen: false,
    };
  }

  setToggle = () => {
    const { toggle } = this.state;
    this.setState({ toggle: !toggle });
  };

  toggleClick = () => {
    const { tooltipOpen } = this.state;
    this.setState({ tooltipOpen: !tooltipOpen });
  };

  render() {
    const { contactTypeName } = this.props;
    const { toggle, tooltipOpen } = this.state;

    return (
      <React.Fragment>
        <div className="site-title">
          <h5>Connect</h5>
        </div>

        <div className="consulting-dec-btn">
          <h5 className="sub-title">
            How would you like us to help you?
            <span className="next-icon">
              <img
                src={NextIcon.src}
                className="next"
                onClick={() => this.setToggle(!toggle)}
              />
            </span>
          </h5>

          <div className="select-category-block">
            <div className="category-select-btn">
              <div className="category-checkbox">
                <Input name="radio1" type="radio" id="consulting1" />
                {toggle && (
                  <>
                    <Label for="consulting1" className="category-btn checked">
                      {contactTypeName}
                    </Label>
                    <span className="connect-icon">
                      <img
                        src={Component.src}
                        className="component"
                        id="TooltipExample"
                      />
                      <Tooltip
                        placement="right"
                        isOpen={tooltipOpen}
                        autohide={false}
                        target="TooltipExample"
                        toggle={this.toggleClick}
                      >
                        {contactTypeName}
                      </Tooltip>
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ConnectTypeHeader;
