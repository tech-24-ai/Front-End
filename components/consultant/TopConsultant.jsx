import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import Image from "next/image";
import { ArrowRightOutlined } from "@ant-design/icons";
import Link from "next/link";
import { crudActions } from "../../_actions";
import { connect } from "react-redux";
import Router, { withRouter } from "next/router";
const TopConsultant = ({ getAllCrud, consultants }) => {
  useEffect(() => {
    getAllCrud("consultants", "consultants", {
      pageSize: 3,
      isCompany: false,
    });
  }, []);

  if (!Array.isArray(consultants)) {
    return false;
  }

  return (
    <Container>
      <div className="top-consultant">
        <div className="title-section">
          <p className="title">
            Top <span className="title bg">Consultants</span>
          </p>
          <Link href="consultant">
            <p className="view-more">View more</p>
          </Link>
        </div>
        <div className="consultant-section">
          {consultants?.slice(0, 3).map((data) => (
            <div className="consultant-list">
              <div className="consultant-card">
                <Image
                  width={300}
                  height={300}
                  src={
                    data.image ??
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSegdLPBUw9F-YVGoqjyYcgSA8VQOfyF4aFTg&usqp=CAU"
                  }
                  alt="consultant profile"
                  placeholder="consultant profile"
                />
              </div>
            </div>
          ))}
          <Link href="consultant">
            <div className="view-more-icon">
              <ArrowRightOutlined />
            </div>
          </Link>
        </div>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  const { consultants, authentication } = state;
  return {
    consultants,
    authentication,
  };
};

const actionCreators = {
  getAllCrud: crudActions._getAll,
};

export default withRouter(
  connect(mapStateToProps, actionCreators)(TopConsultant)
);
