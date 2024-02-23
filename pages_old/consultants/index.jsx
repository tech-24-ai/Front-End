import React, { useEffect, useState } from "react";
import BodyBackgroundColor from "../../components/style/bodyBackgroundColor";
import { Container } from "reactstrap";
import ConsultantCard from "../../components/consultant/consultant-card";
import { isMobile, isBrowser } from "react-device-detect";
import { Select, Space, Menu, Table } from "antd";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import ReactPaginate from "react-paginate-next";
import { crudActions } from "../../_actions";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import "antd/dist/antd.css";

const { SubMenu } = Menu;

import {
  LeftOutlined,
  RightOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const consultantList = ({ consultants, getAllCrud }) => {
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const options = [];
  for (let i = 1; i < 10; i++) {
    options.push({
      label: i.toString(10) + i,
      value: i.toString(10) + i,
    });
  }
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const nodes = [
    {
      // value: "Select All",
      // label: "Select All",
      children: [
        { value: "phobos", label: "Phobos" },
        { value: "deimos", label: "Deimos" },
        { value: "phobos2", label: "Phobos2" },
        { value: "deimos3", label: "Deimos3" },
        { value: "phobos4", label: "Phobos4" },
        { value: "deimos4", label: "Deimos4" },
        { value: "phobos5", label: "Phobos5" },
        { value: "deimos6", label: "Deimos6" },
      ],
    },
  ];
  // local storage
  // const consultantsId = sessionStorage.setItem("consultants",JSON.stringify(consultantsId));
  console.log("consultants", consultants);

  // pagination
  useEffect(() => {
    getAllCrud("consultants", "consultants", {
      page: page + 1,
      pageSize: 6,
    });
  }, [page]);

  useEffect(() => {
    if (consultants && consultants.data && consultants.data.length) {
      setPageCount(Math.ceil(consultants.total / consultants.perPage));
    }
  }, [consultants]);

  const columns = [
    {
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const data = [
    {
      id: 1,
      name: "Product 1",
      price: 100,
      region: "North America",
      technology: "React",
      experience: "Beginner",
    },
    {
      id: 2,
      name: "Product 2",
      price: 200,
      region: "Europe",
      technology: "Angular",
      experience: "Intermediate",
    },
    {
      id: 3,
      name: "Product 3",
      price: 150,
      region: "Asia",
      technology: "Vue",
      experience: "Expert",
    },
    {
      id: 4,
      name: "Product 4",
      price: 250,
      region: "South America",
      technology: "React",
      experience: "Expert",
    },
    {
      id: 5,
      name: "Product 5",
      price: 180,
      region: "Africa",
      technology: "Angular",
      experience: "Beginner",
    },
  ];

  const [filters, setFilters] = useState({
    price: null,
    region: null,
    technology: null,
    experience: null,
  });

  const handleFilterChange = (filterName, filterValue) => {
    setFilters({ ...filters, [filterName]: filterValue });
  };

  const filteredData = data.filter((item) => {
    let isMatched = true;

    Object.keys(filters).forEach((filterName) => {
      const filterValue = filters[filterName];

      if (filterValue && item[filterName] !== filterValue) {
        isMatched = false;
      }
    });

    return isMatched;
  });

  return (
    <Container>
      {consultants && (
        <div className="consultantContainer">
          {/* <h5>consultantList</h5> */}
          {/* <CheckboxTree
          nodes={nodes}
          checked={checked}
          expanded={expanded}
          onCheck={(checked) => setChecked(checked)}
          onExpand={(expanded) => setExpanded(expanded)}
          // title={"select box"}
          // showNodeTitle={true}
          // showExpandAll={true}
          // optimisticToggle={false}
          // onlyLeafCheckboxes={true}
          icons={{
            check: <CaretLeftOutlined />,
            uncheck: <CaretLeftOutlined />,
            halfCheck: <span className="rct-icon rct-icon-half-check" />,
            expandClose: <span className="rct-icon rct-icon-expand-close" />,
            expandOpen: <span className="rct-icon rct-icon-expand-open" />,
            expandAll: <span className="rct-icon rct-icon-expand-all" />,
            collapseAll: <span className="rct-icon rct-icon-collapse-all" />,
            parentClose: <span className="rct-icon rct-icon-parent-close" />,
            parentOpen: <span className="rct-icon rct-icon-parent-open" />,
            leaf: <span className="rct-icon rct-icon-leaf" />,
          }}
        /> */}
          <div className="searchContainer">
            <Space
              style={{
                width: "100%",
              }}
              direction="vertical"
            >
              <Select
                showArrow={true}
                showSearch={true}
                // mode="tags"
                allowClear
                style={{
                  width: "100%",
                }}
                placeholder="Price"
                defaultValue={[]}
                onChange={handleChange}
                options={[
                  {
                    value: "Low to high",
                    label: "Low to high",
                  },
                  {
                    value: "High to low",
                    label: "High to low",
                  },
                ]}
              />
            </Space>
            <Space
              style={{
                width: "100%",
              }}
              direction="vertical"
            >
              <Select
                showArrow={true}
                showSearch={true}
                mode="multiple"
                allowClear
                style={{
                  width: "100%",
                }}
                placeholder="Region"
                defaultValue={[]}
                onChange={handleChange}
                options={options}
              />
            </Space>

            <Space
              style={{
                width: "100%",
              }}
              direction="vertical"
            >
              <Select
                showArrow={true}
                showSearch={true}
                mode="multiple"
                allowClear
                style={{
                  width: "100%",
                }}
                placeholder="Technologies"
                defaultValue={[]}
                onChange={handleChange}
                options={[
                  { value: "React js", label: "React js" },
                  { value: "Next js", label: "Next js" },
                  { value: "Angular js", label: "Angular js" },
                  { value: "PHP", label: "PHP" },
                  { value: "JAVA", label: "JAVA" },
                  { value: "Node js", label: "Node js" },
                ]}
              />
            </Space>

            <Space
              style={{
                width: "100%",
              }}
              direction="vertical"
            >
              <Select
                showArrow={true}
                showSearch={true}
                mode="multiple"
                allowClear
                style={{
                  width: "100%",
                }}
                placeholder="Experience"
                defaultValue={[]}
                onChange={handleChange}
                options={options}
              />
            </Space>
          </div>

          {/* <div>
            <Table columns={columns} onChange={onChange} />
          </div> */}
          <div className="card-container">
            <ConsultantCard />
          </div>
          {/* <BodyBackgroundColor color="rgb(212,212,212)" /> */}
          <div
            style={{ marginTop: "40px" }}
            className="pagination d-flex justify-content-between align-items-center"
          >
            <div></div>
            <div className="issuesPagination">
              <div style={{ marginRight: "1.5rem" }}>
                <ReactPaginate
                  pageCount={pageCount}
                  initialPage={page}
                  forcePage={page}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={({ selected }) => setPage(selected)}
                  nextLabel="Next"
                  previousLabel="Previous"
                />
              </div>
            </div>
          </div>
          <BodyBackgroundColor color="#fff" />
        </div>
      )}
    </Container>
  );
};

const mapStateToProps = (state) => {
  const { consultants } = state;
  return {
    consultants,
  };
};

const actionCreators = {
  getAllCrud: crudActions._getAll,
};

export default withRouter(
  connect(mapStateToProps, actionCreators)(consultantList)
);
