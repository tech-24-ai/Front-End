import React from "react";

const CategoryCard = ({
  image = "../images/market-research.jpg",
  heading,
  description,
}) => {
  const bannerStyle = {
    backgroundImage: `url(${image})`,
    // backgroundImage: `url("../images/market-research.jpg")`,
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  console.log("bannerStyle", bannerStyle);
  return (
    <div style={bannerStyle} className="market-research-category-card">
      <div className="market-research-category-card-body">
        <h5 className="heading">{heading}</h5>
        <p className="description">{description}</p>
      </div>
    </div>
  );
};

export default CategoryCard;
