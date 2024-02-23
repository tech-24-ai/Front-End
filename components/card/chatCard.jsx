import React from "react";
import { Card, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
function chatCard({ children, float, userIcon }) {
  return (
    <div className="chat-body">
      <Card style={{ float }}>
        <div style={{ marginBottom: userIcon ? "1rem" : 0 }}>{children}</div>
        {userIcon && (
          <Avatar className={float} size="large" icon={<UserOutlined />} />
        )}
      </Card>
    </div>
  );
}

export default chatCard;
