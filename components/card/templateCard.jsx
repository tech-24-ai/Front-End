import React from "react";

function templateCard({ icon, iconAlign, title, titleAlign }) {
  return (
    <div className="card template-card">
      {title && (
        <div className="template-card-title" style={{ textAlign: titleAlign }}>
          {title}
        </div>
      )}

      {icon && <div className={`template-card-icon ${iconAlign}`}>{icon}</div>}
    </div>
  );
}

export default templateCard;
