import React from "react";
import { Button, Space } from "antd";

function index({ type, text, css }) {
  //   return (
  //     <Button type={type} className={css}>
  //       {text}
  //     </Button>
  //   );
  return <div className={`btn ${css}`}>{text}</div>;
}

export default index;
