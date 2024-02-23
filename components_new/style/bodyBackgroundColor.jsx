import React from "react";
class BodyBackgroundColor extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <style global jsx>{`
        body {
          background-color: ${this.props.color};
          background-image: none;
        }

        header {
          background-color: ${this.props.color} !important;
        }
      `}</style>
    );
  }
}

export default BodyBackgroundColor;
