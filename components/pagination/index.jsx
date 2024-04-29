import React from "react";
import ReactPaginate from "react-paginate-next";

const CustomPagination = ({ page, pageCount, ...props }) => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="custom-pagination">
        <ReactPaginate
          pageCount={pageCount}
          initialPage={page}
          forcePage={page}
          marginPagesDisplayed={2}
          pageRangeDisplayed={1}
          pageClassName="page-indicator"
          nextLabel=">"
          previousLabel="<"
          {...props}
        />
      </div>
    </div>
  );
};

export default CustomPagination;
