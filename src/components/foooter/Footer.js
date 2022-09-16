import React from "react";
import "./footer.css";
const Footer = () => {
    return (
        <div className="footer">
            <div className="fLists">
                <ul className="fList">
                    <li className="fListItem">Countries</li>
                    <li className="fListItem">Regions</li>
                    <li className="fListItem">Cities</li>
                    <li className="fListItem">Districts</li>
                    <li className="fListItem">Airports</li>
                    <li className="fListItem">Hotels</li>
                    <li className="fListItem">places of interest</li>
                </ul>
                <ul className="fList">
                    <li className="fListItem">Homes</li>
                    <li className="fListItem">Apartment</li>
                    <li className="fListItem">Resorts</li>
                    <li className="fListItem">Villas</li>
                    <li className="fListItem">Hotels</li>
                    <li className="fListItem">Guest house</li>
                </ul>
                <ul className="fList">
                    <li className="fListItem">Travel Agents</li>
                    <li className="fListItem">Career</li>
                    <li className="fListItem">Term & Condition</li>
                </ul>
                <ul className="fList">
                    <li className="fListItem">Unique place to stay</li>
                    <li className="fListItem">Reviews</li>
                    <li className="fListItem">Travel Communities</li>
                    <li className="fListItem">Seasonal and holiday deals</li>
                </ul>
            </div>
            <div
                className="fText"
                style={{ textAlign: "center", paddingBottom: "20px" }}
            >
                Copyright @ 2022 RLbooking.com
            </div>
        </div>
    );
};

export default Footer;
