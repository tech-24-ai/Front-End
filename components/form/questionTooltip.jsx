import React, { useState } from "react";
import { Tooltip } from "reactstrap";
import { Modal, Button } from "antd";
import Component from "../../public/images/datacenter/component.svg";
const QuestionTooltip = ({ title, notes, id, modal }) => {
  const [toolTipOpen, setToolTipOpen] = useState(false);

  const toggleClick = () => {
    setToolTipOpen(!toolTipOpen);
  };
  return (
    <React.Fragment>
      {notes && (
        <span className="connect-icon">
          <img
            src={Component.src}
            className="component"
            id={`TooltipExample${id}`}
            onClick={toggleClick}
          />
        </span>
      )}
      {!modal && (
        <Tooltip
          placement="right"
          isOpen={toolTipOpen}
          autohide={false}
          target={`TooltipExample${id}`}
        >
          {notes}
        </Tooltip>
      )}

      <Modal
        centered={true}
        visible={toolTipOpen}
        title="Tip"
        onOk={toggleClick}
        onCancel={toggleClick}
        footer={[]}
      >
        <div dangerouslySetInnerHTML={{ __html: notes && notes }}></div>
      </Modal>
    </React.Fragment>
  );
};

export default QuestionTooltip;
