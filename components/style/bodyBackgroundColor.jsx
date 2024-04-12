import React from "react";
class BodyBackgroundColor extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("PRO", this.props.style);
    return (
      <style global jsx>
        {`
          ${this.props.style}
        `}
      </style>
    );
    // return (
    //   <style global jsx>
    //     {`
    //       body {
    //         background-color: ${this.props.color};
    //         background-image: none;
    //       }

    //       header {
    //         background-color: ${this.props.color} !important;
    //       }
    //       ${...this.props.style}
    //     `}
    //   </style>
    // );
  }
}

export default BodyBackgroundColor;
