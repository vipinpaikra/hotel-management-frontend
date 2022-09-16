import React, { useContext, useState } from "react";
import "./header.css";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; //
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBed,
    faCalendarDays,
    faCar,
    faPerson,
    faPlane,
    faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

const Header = ({ type }) => {
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);
    const [openOptions, setOpenOptions] = useState(false);
    const [openDate, setOpenDate] = useState(false);
    const [destination, setDestination] = useState("");
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
    });

    const handleOpetion = (name, operation) => {
        setOptions((prev) => {
            return {
                ...prev,
                [name]:
                    operation === "i" ? options[name] + 1 : options[name] - 1,
            };
        });
    };
    const { dispatch } = useContext(SearchContext);

    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const handleSearch = () => {
        dispatch({
            type: "NEW_SEARCH",
            payload: { destination, dates, options },
        });
        navigate("/hotels", { state: { destination, dates, options } });
    };

    return (
        <div className="header">
            <div
                className={
                    type === "list"
                        ? "headerContainer listMode"
                        : "headerContainer"
                }
            >
                {type !== "list" && (
                    <>
                        <h1 className="headerTitle">
                            A lifetime of discounts? It's Genius.
                        </h1>
                        <p className="headerDesc">
                            Get rewarded for your travels unlock instant saving
                            of 10% or more with a free RLbooking account
                        </p>
                        {user ? (
                            <div>
                                <h3>
                                    Hi ! ,
                                    <span
                                        style={{
                                            color: "greenyellow",
                                            padding: "5px",
                                        }}
                                    >
                                        {user.username}
                                    </span>
                                    Welcome to RLbooking .
                                </h3>
                            </div>
                        ) : (
                            <button className="headerBtn">
                                Sign in /Register
                            </button>
                        )}
                        <div className="headerSearch">
                            <div className="headerSearchItem">
                                <FontAwesomeIcon
                                    icon={faBed}
                                    className="headerIcon"
                                />
                                <input
                                    type="text"
                                    placeholder="Where are you going"
                                    className="headerSearchInput"
                                    onChange={(e) =>
                                        setDestination(e.target.value)
                                    }
                                />
                            </div>

                            <div className="headerSearchItem">
                                <FontAwesomeIcon
                                    icon={faCalendarDays}
                                    className="headerIcon"
                                />
                                <span
                                    onClick={() => setOpenDate(!openDate)}
                                    className="headerSearchText"
                                >{`${format(
                                    dates[0].startDate,
                                    "MM/dd/yyyy"
                                )}to${format(
                                    dates[0].endDate,
                                    "MM/dd/yyyy"
                                )}`}</span>
                                {openDate && (
                                    <DateRange
                                        editableDateInputs={true}
                                        onChange={(item) =>
                                            setDates([item.selection])
                                        }
                                        moveRangeOnFirstSelection={false}
                                        ranges={dates}
                                        className="date"
                                        minDate={new Date()}
                                    />
                                )}
                            </div>

                            <div className="headerSearchItem">
                                <FontAwesomeIcon
                                    icon={faPerson}
                                    className="headerIcon"
                                />
                                <span
                                    onClick={() => setOpenOptions(!openOptions)}
                                    className="headerSearchText"
                                >
                                    {`${options.adult} adult . ${options.children} children . ${options.room} room `}
                                </span>
                                {openOptions && (
                                    <div className="options">
                                        <div className="optionItem">
                                            <span className="optionText">
                                                Adult
                                            </span>
                                            <div className="optionCounter">
                                                <button
                                                    disabled={
                                                        options.adult <= 1
                                                    }
                                                    className="optionCounterButton"
                                                    onClick={() =>
                                                        handleOpetion(
                                                            "adult",
                                                            "d"
                                                        )
                                                    }
                                                >
                                                    -
                                                </button>
                                                <span className="optionCounterNumber">
                                                    {options.adult}
                                                </span>
                                                <button
                                                    className="optionCounterButton"
                                                    onClick={() =>
                                                        handleOpetion(
                                                            "adult",
                                                            "i"
                                                        )
                                                    }
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        <div className="optionItem">
                                            <span className="optionText">
                                                Children
                                            </span>
                                            <div className="optionCounter">
                                                <button
                                                    disabled={
                                                        options.children <= 0
                                                    }
                                                    className="optionCounterButton"
                                                    onClick={() =>
                                                        handleOpetion(
                                                            "children",
                                                            "d"
                                                        )
                                                    }
                                                >
                                                    -
                                                </button>
                                                <span className="optionCounterNumber">
                                                    {options.children}
                                                </span>
                                                <button
                                                    className="optionCounterButton"
                                                    onClick={() =>
                                                        handleOpetion(
                                                            "children",
                                                            "i"
                                                        )
                                                    }
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        <div className="optionItem">
                                            <span className="optionText">
                                                Room
                                            </span>
                                            <div className="optionCounter">
                                                <button
                                                    disabled={options.room <= 1}
                                                    className="optionCounterButton"
                                                    onClick={() =>
                                                        handleOpetion(
                                                            "room",
                                                            "d"
                                                        )
                                                    }
                                                >
                                                    -
                                                </button>
                                                <span className="optionCounterNumber">
                                                    {options.room}
                                                </span>
                                                <button
                                                    className="optionCounterButton"
                                                    onClick={() =>
                                                        handleOpetion(
                                                            "room",
                                                            "i"
                                                        )
                                                    }
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <span className="headerSearchText">
                                    <button
                                        className="headerBtn"
                                        onClick={handleSearch}
                                    >
                                        Search
                                    </button>
                                </span>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
