import React from "react";
import img from "../../Images/ic_webBack@2x.png";
import "./Drawer.css";

const mapString =
  "https://maps.googleapis.com/maps/api/staticmap?size=1000x250&maptype=roadmap\
&markers=size:mid%7Ccolor:red%7C";
const APIKEY = "AIzaSyD85KYlujw7yr_WvFeD0j4uMLo4gy02vkA";

const Drawer = ({ restaurant, visible, onCloseDrawer }) => {
  const { location, name, category, contact } = restaurant;
  console.log(restaurant);
  return (
    <div id="drawer" className={visible ? "slideIn" : "slideOut"}>
      <div>
        <div className="title-drawer">
          <img onClick={onCloseDrawer} className="back" src={img} alt="" />
          Lunch Tyme
        </div>
      </div>

      <div className="google">
        {location && (
          <img
            src={`${mapString}${location.lat},${location.lng}&key=${APIKEY}`}
            className="googleMap"
            alt="map"
          />
        )}
      </div>
      <div className="name-category">
        <span className="name-drawer">{name}</span>
        <span className="category-drawer">{category}</span>
      </div>
      <div className="contact-info">
        {location && <span className="address">{location.address}</span>}
        {location && (
          <span className="address">{`${location.city}, ${location.state} ${
            location.postalCode
          }`}</span>
        )}
        {contact &&
          contact.formattedPhone && (
            <span className="address phone">{`${contact.formattedPhone}`}</span>
          )}
        {contact &&
          contact.twitter && (
            <span className="address">{`@${contact.twitter}`}</span>
          )}
      </div>
    </div>
  );
};

export default Drawer;
