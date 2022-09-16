import {
    faCircleXmark,
    faDiagramNext,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";
import "./reserve.css";

const Reserve = ({ hotelId, openModel }) => {
    const [selectedRooms, setSelectedRooms] = useState([]);
    const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
    const { dates } = useContext(SearchContext);
    const navigate = useNavigate();
    console.log("->", data);
    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const date = new Date(start.getTime());
        let dates = [];

        while (date <= end) {
            dates.push(new Date(date).getTime());
            date.setDate(date.getDate() + 1);
        }
        console.log(dates);
        return dates;
    };
    const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);

    const isAvailable = (roomNumber) => {
        console.log(roomNumber);
        const isFound = roomNumber.unavailableDates.some((date) =>
            allDates.includes(new Date(date).getTime())
        );
        return !isFound;
    };

    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRooms(
            checked
                ? [...selectedRooms, value]
                : selectedRooms.filter((item) => item !== value)
        );
        return dates;
    };

    const handleClick = async (e) => {
        try {
            await Promise.all(
                selectedRooms.map((roomId) => {
                    const res = axios.put(`/rooms/availability/${roomId}`, {
                        dates: allDates,
                    });
                    return res.data;
                })
            );
            openModel(false);
            navigate("/");
        } catch (err) {}
    };

    console.log(selectedRooms);
    return (
        <div className="reserve">
            <div className="rContainer">
                <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="rClose"
                    onClick={() => {
                        openModel(false);
                    }}
                />
                <span>Select your rooms:</span>
                {data.map((item, index) => {
                    return (
                        <div className="rItem" key={index}>
                            <div className="rItemInfo">
                                <div className="rTitle"> {item.title} </div>
                                <div className="rDesc">{item.desc}</div>
                                <div className="rMax">
                                    Max people :<b>{item.maxPeople}</b>
                                </div>
                                <div className="rPrice">
                                    Price is : ₹{item.price}
                                </div>
                            </div>
                            <div className="rSelectRooms">
                                {item.roomNumbers.map((roomNumber, index) => {
                                    return (
                                        <div className="room" key={index}>
                                            <label> {roomNumber.number}</label>
                                            <input
                                                type="checkbox"
                                                value={roomNumber._id}
                                                onChange={handleSelect}
                                                disabled={
                                                    !isAvailable(roomNumber)
                                                }
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
                <button onClick={handleClick} className="rButton">
                    Reverse Now!
                </button>
            </div>
        </div>
    );
};

export default Reserve;
