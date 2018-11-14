import React from "react";
import "./Restaurant.css";

const Restaurant = props => {
  const { openDrawer, gradient, restaurant } = props;
  const {
    category,
    name: restaurantName,
    backgroundImageURL: imgUrl
  } = props.restaurant;

  return (
    <div style={{ position: "relative", paddingRight: 0 }}>
      <img
        onClick={() => openDrawer(restaurant)}
        className="background"
        style={{ backgroundImage: `url(${imgUrl})` }}
        src={gradient}
        alt=""
      />
      <div onClick={() => openDrawer(restaurant)} className="info">
        <h3 className="name">{restaurantName}</h3>
        <h4 className="category">{category}</h4>
      </div>
    </div>
  );
};

export default Restaurant;
