import React, { useState, useEffect } from "react";
import { Form, Modal, Button } from "antd";
import { isMobile } from "react-device-detect";
import { crudService } from "../../_services";

const ReportAbuseModal = ({
  isModalOpen = false,
  closeModel,
  reportTypes,
  data,
  reportFor,
  heading = "",
}) => {
  const [selectedOption, setSelectedOption] = useState(1);
  const [reportDescription, setReportDescription] = useState("");

  const [isloading, setIsloading] = useState(false);

  const handleSubmit = () => {
    if (!selectedOption || !reportDescription) {
      return;
    }

    const { community_id, id, community_post_id = null } = data;
    let postData = {};
    if (reportFor === "question") {
      postData = {
        report_abuse_type_id: selectedOption,
        community_id: community_id,
        community_post_id: id,
        reason: reportDescription,
      };
    }

    if (reportFor === "answer") {
      postData = {
        report_abuse_type_id: selectedOption,
        community_id: community_id,
        community_post_id: community_post_id,
        community_post_reply_id: id,
        reason: reportDescription,
        reply_type: 1,
      };
    }

    if (reportFor === "comment") {
      postData = {
        report_abuse_type_id: selectedOption,
        community_id: community_id,
        community_post_id: community_post_id,
        community_post_reply_id: id,
        reason: reportDescription,
        reply_type: 2,
      };
    }

    setIsloading(true);

    crudService
      ._create("repost_abuse", postData)
      .then((response) => {
        setSelectedOption(1);
        setReportDescription("");
        closeModel();
        setIsloading(false);
      })
      .catch((error) => {
        console.error("Error submitting report:", error);
        setIsloading(false);
        closeModel();
      });
  };

  return (
    <Modal
      visible={isModalOpen}
      footer={null}
      onCancel={closeModel}
      className="report-abuse-modal"
    >
      <span
        style={{
          marginBottom: "-20px",
          fontWeight: "500",
          fontSize: "20px",
          fontFamily: "Poppins",
          cursor: "pointer",
        }}
      >
        {heading}
      </span>
      <hr />
      <Form
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        onSubmit={handleSubmit}
        className="report-abuse-form"
      >
        <Form.Item
          style={{
            fontWeight: 500,
            fontFamily: "Inter",
            fontSize: "14px",
            color: "#4C4C4C",
          }}
          rules={[
            {
              required: true,
            },
          ]}
          label="Report Type"
          name="report type"
        >
          <select
            value={selectedOption}
            onChange={(event) => setSelectedOption(event.target.value)}
            style={{
              backgroundColor: "#fff",
              borderRadius: "2px",
              padding: "12px",
              fontWeight: 400,
              fontSize: "16px",
              color: "#001622",
              fontFamily: "Inter",
              width: "100%",
            }}
          >
            {reportTypes?.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </Form.Item>
        <Form.Item
          style={{
            fontWeight: 500,
            fontFamily: "Inter",
            fontSize: "14px",
            color: "#4C4C4C",
          }}
          rules={[
            {
              required: true,
            },
          ]}
          name="description"
          label="Description"
        >
          <div style={{ width: "100%" }}>
            <textarea
              style={{
                width: "100%",
                height: "70px",
                padding: "10px",
              }}
              placeholder="Write a brief why you are reporting this question"
              onChange={(event) => setReportDescription(event.target.value)}
              value={reportDescription}
            ></textarea>
          </div>
        </Form.Item>

        <Form.Item>
          <Button
            block
            size="large"
            type="primary"
            disabled={isloading}
            onClick={() => handleSubmit()}
            style={{
              fontWeight: 500,
              fontFamily: "Inter",
              fontSize: "18px",
            }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ReportAbuseModal;
