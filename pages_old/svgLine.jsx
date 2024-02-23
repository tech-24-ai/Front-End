import React from "react";

export const Line = ({
  x1,
  y1,
  x2,
  y2,
  ix,
  iy,
  rotate = 0,
  color,
  sw = 0.2,
  sd = 0.8,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 40"
      style={{ position: "absolute" }}
    >
      <g className="combinedLine">
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          strokeWidth={sw}
          strokeDasharray={sd}
          stroke={color ? color : "#7b736b"}
          {...props}
        />
        <path
          id="forwar-line-arrow"
          data-name="forwar-line-arrow"
          className="cls-1"
          d="M0 0 L0 1.2 L1.2 0.6 Z"
          transform={`translate(${ix} ${iy}) rotate(${rotate})`}
          fill={color ? color : "#7b736b"}
        />
      </g>
    </svg>
  );
};

export const VLine = ({
  x1,
  y1,
  x2,
  y2,
  ix,
  iy,
  rotate = 0,
  color,
  sw = 0.2,
  sd = 0.8,
  ...props
}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40" {...props}>
      <g className="combinedLine">
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          strokeWidth={sw}
          strokeDasharray={sd}
          stroke={color ? color : "#7b736b"}
        />
        <path
          id="forwar-line-arrow"
          data-name="forwar-line-arrow"
          className="cls-1"
          d="M0 0 L0 4 L4 2 Z"
          transform={`translate(${ix} ${iy}) rotate(${rotate})`}
          fill={color ? color : "#7b736b"}
        />
      </g>
    </svg>
  );
};

const Curve = ({
  x1,
  y1,
  x2,
  y2,
  cx1,
  cy1,
  cx2,
  cy2,
  ix,
  iy,
  color,
  rotate,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 40"
      style={{ position: "absolute" }}
    >
      <g className="combinedCurve">
        <path
          d={`M${x1},${y1} C${cx1},${cy1} ${cx2},${cy2} ${x2},${y2}`}
          strokeWidth={0.2}
          strokeDasharray={0.8}
          fill="none"
          stroke={color ? color : "#7b736b"}
        />

        <path
          id="Icon_material-play-arrow"
          data-name="Icon material-play-arrow"
          className="cls-2"
          d="M0 0 L0 1.2 L1.2 0.6 Z"
          transform={`translate(${ix} ${iy}) rotate(${rotate})`}
          fill={color ? color : "#7b736b"}
        />
      </g>
    </svg>
  );
};

export default Curve;
