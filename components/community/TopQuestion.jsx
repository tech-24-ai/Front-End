import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import Image from "next/image";
import { ArrowRightOutlined } from "@ant-design/icons";
import Link from "next/link";
import { crudActions } from "../../_actions";
import { connect } from "react-redux";
import Router, { withRouter } from "next/router";
import moment from "moment";
const TopQuestion = ({ getAllCrud, communitypost }) => {
  useEffect(() => {
    getAllCrud("communitypost", "tranding_question", {
      pageSize: 3,
    });
  }, []);

  return (
    <Container>
      <div className="top-question">
        <div className="title-section">
          <p className="title">
            Top <span className="title bg">Question</span>
          </p>
          <Link href="community">
            <p className="view-more">View more</p>
          </Link>
        </div>
        <div className="question-section">
          {communitypost?.map((data) => (
            <div className="question-list">
              <div className="question-card">
                <div className="profile-section">
                  <div className="profile">
                    <Image
                      width={50}
                      height={50}
                      src={
                        data.visitor.profile_pic_url ??
                        "https://iaauae.s3.me-central-1.amazonaws.com/mR0LnX8AYR"
                      }
                      alt=""
                      placeholder="blog banner"
                    />
                    <p className="badge">{data?.__meta__.total_helpful}</p>
                  </div>
                  <div className="name-section">
                    <p className="name">{data?.visitor?.name}</p>
                    <p className="time">15min ago</p>
                  </div>
                </div>

                <p className="question-heading">{data.title}</p>

                <div className="skill-section">
                  {data.postTags?.map((tag) => (
                    <div className="skill">{tag.name}</div>
                  ))}
                </div>
                <div className="button">Answer</div>
              </div>
            </div>
          ))}
          <Link href="community">
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
  const { communitypost, authentication } = state;
  return {
    communitypost,
    authentication,
  };
};

const actionCreators = {
  getAllCrud: crudActions._getAll,
};

export default withRouter(
  connect(mapStateToProps, actionCreators)(TopQuestion)
);
