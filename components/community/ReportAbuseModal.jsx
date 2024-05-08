import React, { useState, useEffect } from "react";
import {
  Form,
  Space,
  Upload,
  Tabs,
  Card,
  Input,
  Select,
  Button,
  Modal,
  Label,
} from "antd";
import { isMobile } from "react-device-detect";
import { crudService } from "../../_services";

const ReportAbuseModal = ({
  isModalOpen = false,
  closeModel = value,
  reportTypes,
  data,
  reportFor,
}) => {
  const [selectedOption, setSelectedOption] = useState(2);
  const [reportDescription, setReportDescription] = useState("");

  console.log("communityQuestionDetail", data);

  const handleSubmit = () => {
    console.log("Call");
    if (!selectedOption || !reportDescription) {
      return;
    }

    console.log("CallAFter");

    const { community_id, id } = data;
    let postData = {};
    if (reportFor === "question") {
      postData = {
        report_abuse_type_id: selectedOption,
        community_id: community_id,
        community_post_id: id,
        community_post_reply_id: 0,
        reason: reportDescription,
      };
    }

    crudService
      ._create("repost_abuse", postData)
      .then((response) => {
        setSelectedOption(1);
        setReportDescription("");
      })
      .catch((error) => {
        console.error("Error submitting report:", error);
      });
  };

  return (
    <Modal
      visible={isModalOpen}
      footer={null}
      onCancel={() => closeModel(false)}
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
        Report this Question
      </span>
      <hr />
      <Form
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        onSubmit={handleSubmit}
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
          label="Report a question"
          name="report a question"
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

        <div
          className="btn"
          type="submit"
          onClick={() => handleSubmit()}
          style={{
            width: isMobile ? "100%" : "470px",
            background: "#0074D9",
            borderRadius: "2px",
            padding: "12px 16px",
            color: "#fff",
            fontWeight: 500,
            fontFamily: "Inter",
            fontSize: "18px",
            marginTop: "1.2rem",
          }}
        >
          Submit
        </div>
      </Form>
    </Modal>
  );
};

export default ReportAbuseModal;
