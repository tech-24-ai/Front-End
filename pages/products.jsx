import React, { Fragment } from "react";

import Router, { withRouter } from "next/router";
import { Rate } from "antd";
import { connect } from "react-redux";
import { crudActions } from "../_actions";
import { apiUrl } from "../_helpers";
import { Container, Button, ButtonGroup, Col, Row } from "reactstrap";
import { isBrowser, isMobile } from "react-device-detect";
import CustomBreadcrumb from "../components/breadcrumbs";
import BodyBackgroundColor from "../components/style/bodyBackgroundColor";
import PriceVeryModule from "../components/product/priceVeryModule";
import { alertActions, loaderActions } from "../_actions";

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ReactPaginate from "react-paginate-next";

import Download from "../public/images/datacenter/download.svg";
import Summary from "./summary";
import { crudService } from "../_services";
import Link from "next/link";

class Products extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showSummary: false,
      products: null,
      page: 0,
      rowsPerPage: 10,
      pageCount: 0,
      isLoading: true,
    };
  }

  async componentDidMount() {
    const filterData = {
      search: true,
      search_report_id: sessionStorage.getItem("searchReportId"),
    };
    this.setState({
      isLoading: true,
    });

    // this.props.getAllCrud("products","products", filterData)
    // console.log('componentDidMount')
    // if (this.props.products && this.props.products.length) {
    //   console.log('componentDidMountInsideFunct')
    //       this.setState({
    //       pageCount: Math.ceil(this.props.products.length / this.state.rowsPerPage),
    //       products: this.props.products,
    //     });
    // }

    this.props.showCustomLoader();
    await crudService._getAll("products", filterData).then((response) => {
      if (response.status === 200) {
        this.setState({
          pageCount: Math.ceil(response.data.length / this.state.rowsPerPage),
          products: response.data,
        });
        setTimeout(() => {
          // console.log('timeout')
          // this.setState({
          //   isLoading:false
          // })
          this.props.hideCustomLoader();
        }, 3000);
      }
    });
  }

  componentWillUnmount() {
    this.setState({
      pageCount: 0,
      products: null,
      isLoading: true,
    });
  }

  exportPdf = () => {
    // const url = apiUrl();
    const url = process.env.NEXT_PUBLIC_API_BASE_URL;
    const filterUrl = `${url}/products/exportPdf?search_report_id=${sessionStorage.getItem(
      "searchReportId"
    )}`;
    window.open(filterUrl);
  };

  sendEmail = () => {
    const filterData = {
      search: true,
      search_report_id: sessionStorage.getItem("searchReportId"),
    };
    this.props.createCrud(
      "productsEmail",
      "products/sendmail",
      filterData,
      true
    );
  };

  onSummaryClick = () => {
    this.setState({
      showSummary: true,
    });
  };

  goHome = () => {
    Router.push("/");
  };

  onViewReport = () => {
    this.setState({
      showSummary: false,
    });
  };

  onProductClick = (data) => {
    crudService._get(`products/click`, data.id).then((response) => {});
    window.open(data.link);
  };

  handleChangePage = ({ selected }) => {
    this.setState({ page: selected });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      setRowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    });
  };

  render() {
    const { showSummary, products, page, rowsPerPage, pageCount, isLoading } =
      this.state;

    {
      /* const columns = [
      {
        dataField: "vendor",
        text: "Vendor",
        sort: true,
        formatter: (cell, row) => {
          return (
            <Fragment>
              <img src={row.vendor_image} height="20px" width="150px" />
              <span style={{ marginLeft: "15px", fontWeight: "bold" }}>
                {row.vendor}
              </span>
            </Fragment>
          );
        },
      },
      // {
      //   dataField: "vendor_image",
      //   text: "Logo",
      //   sort: true,
      //   formatter: (cell, row) => {
      //     return (
      //       <Fragment>
      //         <img src={row.vendor_image} height="50px" />
      //       </Fragment>
      //     );
      //   },
      // },
      {
        dataField: "name",
        text: "Product",
        sort: true,
        formatter: (cell, row) => {
          return (
            <a
              href="javascript:void(0);"
              onClick={() => this.onProductClick(row)}
            >
              {row.name}
            </a>
          );
        },
      },
      {
        dataField: "rating",
        text: "ITMAP Score",
        sort: true,
        formatter: (cell, row) => {
          if (row && row.rating) {
            return (
              <Rate
                style={{ fontSize: "12px" }}
                disabled
                allowHalf
                defaultValue={row.rating}
              />
            );
          }
          if (row && !row.rating) {
            return "Not Rated";
          }
        },
      },
    ]; */
    }

    const paginationTotalRenderer = () => (
      <div className="button-dark-wrapper">
        {/* <ButtonGroup>
          <Button onClick={() => this.exportPdf()}>Pdf <img src={Download} className="download" /></Button>
          <Button onClick={() => this.sendEmail()}>Email <img src={Download} className="download" /></Button>
        </ButtonGroup> */}
      </div>
    );

    const pageListRenderer = ({ pages, onPageChange }) => {
      const pageWithoutIndication = pages.filter(
        (p) => typeof p.page !== "string"
      );

      return (
        <div className="col-md-6 col-xs-6 col-sm-6 col-lg-6">
          <div className="itmap-datatable-pagination">
            <ButtonGroup className="float-right">
              {pageWithoutIndication.map((p) => (
                <Button
                  className={p.active ? "active" : ""}
                  onClick={() => onPageChange(p.page)}
                >
                  {p.page}
                </Button>
              ))}
            </ButtonGroup>
          </div>
        </div>
      );
    };

    // const options = {
    //   paginationSize: 6,
    //   pageStartIndex: 1,
    //   alwaysShowAllBtns: false, // Always show next and previous button
    //   withFirstAndLast: false, // Hide the going to First and Last page button
    //   hideSizePerPage: true, // Hide the sizePerPage dropdown always
    //   hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    //   firstPageText: "First",
    //   prePageText: "",
    //   nextPageText: "",
    //   lastPageText: "Last",
    //   nextPageTitle: "First page",
    //   prePageTitle: "Pre page",
    //   firstPageTitle: "Next page",
    //   lastPageTitle: "Last page",
    //   showTotal: true,
    //   paginationTotalRenderer,
    //   pageListRenderer,
    //   disablePageTitle: true,
    //   sizePerPageList: null,
    // };

    return (
      <section className="products-page-section">
        <Container>
          <CustomBreadcrumb
            isAnyChanged={false}
            onChange={() => {}}
            updateNote={(e) => {}}
            setMeta={(e) => {}}
          />
          {!showSummary && (
            <div className="select-category-block summary-wrapper">
              <div>
                {isBrowser && (
                  <Fragment>
                    <Row>
                      <Col>
                        {products && (
                          <Fragment>
                            <p>
                              We found <span> {products.length} </span> products
                              that match your selection criteria
                            </p>
                            <PriceVeryModule key="browserView" />
                          </Fragment>
                        )}
                      </Col>

                      <Col>
                        <div className="button-dark-wrapper">
                          <ButtonGroup className="float-right">
                            <div
                              onClick={() => this.goHome()}
                              className="custom-btn with-bg"
                            >
                              Home
                            </div>
                            <div
                              onClick={() => this.exportPdf()}
                              className="custom-btn with-bg"
                            >
                              Pdf{" "}
                              <img src={Download.src} className="download" />
                            </div>
                            <div
                              onClick={() => this.sendEmail()}
                              className="custom-btn with-bg"
                            >
                              Email{" "}
                              <img src={Download.src} className="download" />
                            </div>
                            <div
                              onClick={() => this.onSummaryClick()}
                              className="custom-btn with-bg"
                            >
                              Edit
                            </div>
                            <Link href={"/consultant"}>
                              <div
                                style={{ width: "auto" }}
                                className="custom-btn with-bg"
                              >
                                Speak to Consultant
                              </div>
                            </Link>
                          </ButtonGroup>
                        </div>
                      </Col>
                    </Row>
                    {products && products.length > 0 && (
                      <Fragment>
                        <div className="report-table table-responsive mt-4">
                          <div className="VendorTableData">
                            <div className="row headRow">
                              <div className="col"></div>
                              <div className="col">Vendor Name</div>
                              <div className="col">Product</div>
                              <div className="col">Tech24 Score</div>
                            </div>
                            {products
                              .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              .map((row, id) => (
                                <div
                                  className="row dataRow"
                                  key={id}
                                  id="id-DataRow"
                                  data-row={row.vendor}
                                >
                                  <div className="col">
                                    <img src={row.vendor_image} />
                                  </div>
                                  <div className="col VendorNameCol">
                                    {row.vendor}
                                  </div>
                                  <div className="col">
                                    <a
                                      href="javascript:void(0);"
                                      onClick={() => this.onProductClick(row)}
                                    >
                                      {row.name}
                                    </a>
                                  </div>
                                  <div className="col">
                                    {row.rating ? (
                                      <Rate
                                        style={{ fontSize: "12px" }}
                                        disabled
                                        allowHalf
                                        value={Number(row.rating)}
                                      />
                                    ) : (
                                      <div style={{ fontWeight: 500 }}>
                                        Not Rated
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>

                        <div className="pagination d-flex justify-content-between align-items-center">
                          <div></div>
                          <div className="issuesPagination">
                            <div style={{ marginRight: "3rem" }}>
                              <ReactPaginate
                                pageCount={pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={this.handleChangePage}
                                nextLabel="Next"
                                previousLabel="Previous"
                                initialPage={page}
                              />
                            </div>
                          </div>
                        </div>
                      </Fragment>
                    )}
                  </Fragment>
                )}
              </div>
              <div>
                {isMobile && (
                  <Fragment>
                    <div className="mobile-summary">
                      <div className="summary-dec-btn">
                        <p>
                          We found <span> {products && products.length} </span>{" "}
                          products that match your selection criteria
                        </p>
                        <PriceVeryModule key="browserView" />
                      </div>
                      <div
                        className="summary-btn1"
                        style={{ textAlign: "center" }}
                      >
                        <div
                          onClick={() => this.onSummaryClick()}
                          className="custom-btn with-bg"
                        >
                          Edit
                        </div>
                        <div
                          className="summary-mail custom-btn with-bg"
                          onClick={() => this.sendEmail()}
                        >
                          Email
                          {/* <span>
                          <img src={Mail} className="mail" />
                        </span> */}
                        </div>
                        <div
                          className="summary-download custom-btn with-bg"
                          onClick={() => this.exportPdf()}
                        >
                          PDF
                          {/* <span>
                          <img src={MobileDownload} className="download" />
                        </span> */}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2">
                      {products &&
                        products.map((row, id) => (
                          <div key={id} className="reportTableMV-row">
                            <div className="reportTableMV-col">
                              <div className="mb-2">
                                <img
                                  src={row.vendor_image}
                                  style={{
                                    maxHeight: "1.5rem",
                                    maxWidth: "50%",
                                  }}
                                />
                              </div>
                              <div>{row.vendor}</div>
                            </div>
                            <div className="reportTableMV-col">
                              <div className="mb-2">
                                <a
                                  href="javascript:void(0);"
                                  onClick={() => this.onProductClick(row)}
                                >
                                  {row.name}
                                </a>
                              </div>
                              <div>
                                {row.rating ? (
                                  <Rate
                                    style={{ fontSize: "12px" }}
                                    disabled
                                    defaultValue={row.rating}
                                  />
                                ) : (
                                  <div>Not rated</div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </Fragment>
                )}
              </div>

              {/* <div className="itmap-datatable productTable">
                <BootstrapTable
                  keyField="id"
                  data={products}
                  columns={columns}
                  pagination={paginationFactory(options)}
                />
              </div> */}

              {/* <div className="pragraph-wrapper">
                <p>
                  <b>Disclaimer: </b>
                  Posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper eget duis at tellus at urna condimentum mattis pellentesque id nibh tortor id aliquet lectus proin nibh nisl condimentum id venenatis a condimentum vitae sapien.
                  </p>
              </div> */}
            </div>
          )}

          {showSummary && (
            <div className="summary-content">
              <Summary products={products} action={this.onViewReport} />
            </div>
          )}
        </Container>
        {/* <BodyBackgroundColor color="#fff" /> */}
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  const { authentication, confirm, questionData, category, products } = state;
  const { user } = authentication;

  return {
    user,
    confirm,
    questionData,
    category,
    products,
  };
};

const actionCreators = {
  getAllCrud: crudActions._getAll,
  getCrud: crudActions._get,
  createCrud: crudActions._create,
  showError: alertActions.error,
  showLoader: loaderActions.show,
  hideLoader: loaderActions.hide,
  showCustomLoader: loaderActions.custom_show,
  hideCustomLoader: loaderActions.custom_hide,
};

export default withRouter(connect(mapStateToProps, actionCreators)(Products));
