import React from "react";
import { Container, Table } from "reactstrap";
import Link from "next/link";
import ContentTitle from "../components/contentTitle";
import Download from "../public/images/datacenter/download.svg";

function FinalReport() {
  return (
    <section className="final-report-wrapper">
      <Container>
        <ContentTitle path={true} />
        <div className="datascale-block">
          <div className="select-category-block summary-wrapper">
            <div className="summary-dec-btn">
              <p>
                Based on your inputs we found <span> 134 </span> vendors /
                product match
              </p>
              <div className="site-btn1">
                <Link href="#!">
                  <a className="summary-btn">
                    PDF
                    <span>
                      <img src={Download.src} className="download" />
                    </span>
                  </a>
                </Link>
                <Link href="#!">
                  <a className="summary-btn">
                    Email
                    <span>
                      <img src={Download.src} className="download" />
                    </span>
                  </a>
                </Link>
                <Link href="#!">
                  <a className="summary-btn">Summary</a>
                </Link>
              </div>
            </div>
            <div className="final-report-block">
              <Table>
                <thead>
                  <tr>
                    <th>Vendor</th>
                    <th>Product</th>
                    <th>Product URL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Vendor Name</td>
                    <td>Product Name</td>
                    <td>
                      <Link href="#!">
                        <a className="product-url-link">Product URL </a>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>Vendor Name</td>
                    <td>Product Name</td>
                    <td>
                      <Link href="#!">
                        <a className="product-url-link">Product URL </a>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>Vendor Name</td>
                    <td>Product Name</td>
                    <td>
                      <Link href="#!">
                        <a className="product-url-link">Product URL </a>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>Vendor Name</td>
                    <td>Product Name</td>
                    <td>
                      <Link href="#!">
                        <a className="product-url-link">Product URL </a>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>Vendor Name</td>
                    <td>Product Name</td>
                    <td>
                      <Link href="#!">
                        <a className="product-url-link">Product URL </a>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>Vendor Name</td>
                    <td>Product Name</td>
                    <td>
                      <Link href="#!">
                        <a className="product-url-link">Product URL </a>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>Vendor Name</td>
                    <td>Product Name</td>
                    <td>
                      <Link href="#!">
                        <a className="product-url-link">Product URL </a>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>Vendor Name</td>
                    <td>Product Name</td>
                    <td>
                      <Link href="#!">
                        <a className="product-url-link">Product URL </a>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>Vendor Name</td>
                    <td>Product Name</td>
                    <td>
                      <Link href="#!">
                        <a className="product-url-link">Product URL </a>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>Vendor Name</td>
                    <td>Product Name</td>
                    <td>
                      <Link href="#!">
                        <a className="product-url-link">Product URL </a>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>Vendor Name</td>
                    <td>Product Name</td>
                    <td>
                      <Link href="#!">
                        <a className="product-url-link">Product URL </a>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div className="summary-dec-btn">
              <div className="site-btn1">
                <Link href="#!">
                  <a className="summary-btn">
                    PDF
                    <span>
                      <img src={Download.src} className="download" />
                    </span>
                  </a>
                </Link>
                <Link href="#!">
                  <a className="summary-btn">
                    Email
                    <span>
                      <img src={Download.src} className="download" />
                    </span>
                  </a>
                </Link>
              </div>
              <div className="project-pagination">
                <ul>
                  <li className="active">
                    <span>1</span>
                  </li>
                  <li>
                    <span>2</span>
                  </li>
                  <li>
                    <span>3</span>
                  </li>
                  <li>
                    <span>4</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="disclaimer-dec">
              <p>
                <span>Disclaimer:</span> Posuere sollicitudin aliquam ultrices
                sagittis orci a scelerisque purus semper eget duis at tellus at
                urna condimentum mattis pellentesque id nibh tortor id aliquet
                lectus proin nibh nisl condimentum id venenatis a condimentum
                vitae sapien.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default FinalReport;
