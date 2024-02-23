import { TreeSelect } from "antd";
import React, { useState, useEffect } from "react";
import { crudService } from "../../_services";

const ConnectTreeSelect = ({ url, onChange, value }) => {
  //   const [value, setValue] = useState([]);
  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    crudService
      ._getAll(url)
      .then((res) => {
        if (res.status == 200) {
          setTreeData(res.data);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, [url]);

  //   const onChange = (newValue, node, extra) => {
  //     console.log("onChange ", newValue);
  //     console.log("node ", node);
  //     console.log("extra ", extra);
  //     setValue(newValue);
  //   };

  const treeData2 = [
    {
      value: "parent 1",
      title: "parent 1",
      children: [
        {
          value: "parent 1-0",
          title: "parent 1-0",
          children: [
            {
              value: "leaf1",
              title: "my leaf",
            },
            {
              value: "leaf2",
              title: "your leaf",
            },
          ],
        },
        {
          value: "parent 1-1",
          title: "parent 1-1",
          children: [
            {
              value: "sss",
              title: (
                <b
                  style={{
                    color: "#08c",
                  }}
                >
                  sss
                </b>
              ),
            },
          ],
        },
      ],
    },
  ];

  return (
    <TreeSelect
      style={{ fontSize: "0.8rem" }}
      showSearch
      multiple
      allowClear
      //   status="error"
      treeLine={true}
      value={value || undefined}
      placeholder={"Select skill"}
      showArrow={true}
      treeNodeFilterProp="label"
      treeCheckable={true}
      treeData={treeData}
      showCheckedStrategy="SHOW_CHILD"
      //   treeCheckStrictly={true}
      onChange={onChange}
    />
  );
};

export default ConnectTreeSelect;
