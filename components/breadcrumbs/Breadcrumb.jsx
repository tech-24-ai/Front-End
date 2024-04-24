import React from "react";
import { Breadcrumb } from "antd";

function CustomBreadcrumb({ data }) {
  return (
    <Breadcrumb separator=">" className="custom-breadcrumb">
      {data?.map((item, index) => {
        if (index === data.length - 1) {
          return <Breadcrumb.Item>{item.label}</Breadcrumb.Item>;
        }
        return (
          <Breadcrumb.Item>
            <a href={item.url}>{item.label}</a>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
}

export default CustomBreadcrumb;
