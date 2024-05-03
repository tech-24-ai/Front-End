import React, { Fragment, useState } from "react";
import { SortIcon, FilterIcon } from "../icons";
import { Button, Modal, Radio } from "antd";
import CustomFilter from "../filter";

const FilterOptionContainer = ({ sortData, filterData }) => {
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filteredData, setFilteredData] = useState({});

  const handleSortOptionChanges = (event) => {
    setIsSortModalOpen(false);
    sortData.setState(event.target.value);
  };

  const handleFilterOptionChanges = (data) => {
    const { name, value } = data;
    setFilteredData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFilterApply = () => {
    setIsFilterModalOpen(false);
    filterData.setState(filteredData);
  };

  const handleReset = () => {
    setIsFilterModalOpen(false);
    filterData.setState({});
  };

  const sortSelectedOptions = sortData.options.filter(
    (data) => data.value == sortData.value
  );

  const filterSelectedOption = Object.keys(filterData.value);

  return (
    <Fragment>
      <div className="filter-option-wrapper">
        <div className="option-wrapper">
          <div
            className="heading-wrapper"
            onClick={() => setIsSortModalOpen(true)}
          >
            <div className="icon">
              <SortIcon />
            </div>
            <h5 className="heading">Sort By</h5>
          </div>
          <p className="selected-option">
            {sortSelectedOptions.length > 0 && sortSelectedOptions[0].label}
          </p>
        </div>
        <div className="custom-divider"></div>
        <div className="option-wrapper">
          <div
            className="heading-wrapper"
            onClick={() => setIsFilterModalOpen(true)}
          >
            <div className="icon">
              <FilterIcon />
            </div>
            <h5 className="heading">Filter</h5>
          </div>
          <p className="selected-option">
            {filterSelectedOption.length > 0
              ? "Filters applied"
              : "No filters applied"}
          </p>
        </div>
      </div>
      <Modal
        title="Sort"
        visible={isSortModalOpen}
        footer={null}
        onCancel={() => setIsSortModalOpen(false)}
        wrapClassName="custom-filter"
      >
        <Radio.Group
          size="large"
          className="sort-option-wrapper"
          options={sortData.options}
          onChange={handleSortOptionChanges}
          value={sortData.value}
        />
      </Modal>
      <Modal
        title="Filters"
        visible={isFilterModalOpen}
        footer={null}
        onCancel={() => setIsFilterModalOpen(false)}
        wrapClassName="custom-filter"
        centered
      >
        <CustomFilter
          data={filterData.options}
          handleOptionChange={handleFilterOptionChanges}
          handleReset={handleReset}
        />

        <div
          className="apply-btn custom-btn with-bg-secondary"
          onClick={handleFilterApply}
        >
          Apply
        </div>
      </Modal>

      <style global jsx>{`
        @media (max-width: 1440px) {
          .footer-mobile {
            margin-bottom: 6rem !important;
          }
        }
      `}</style>
    </Fragment>
  );
};

export default FilterOptionContainer;
