import {
    faCircleArrowLeft,
    faCircleArrowRight,
    faLocationDot,
    faPersonThroughWindow,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/foooter/Footer";
import useFetch from "../../hooks/useFetch";
import "./hotel.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";

function Hotel() {
    const location = useLocation();

    const id = location.pathname.split("/")[2];

    const [slideNumber, setSliderNumber] = useState(0);
    const [open, setOpen] = useState(false);
    const [openModel, setOpenModel] = useState(false);

    const { data, loading, error } = useFetch(`/hotels/${id}`);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const { dates, options } = useContext(SearchContext);

    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    const dayDifference = (date1, date2) => {
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
        return diffDays;
    };

    const days = dayDifference(dates[0].endDate, dates[0].startDate);

    const photos = [
        {
            src: "https://picsum.photos/id/1/1400/900",
        },
        {
            src: "https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg?cs=srgb&dl=pexels-julius-silver-753626.jpg&fm=jpg",
        },
        { src: "https://picsum.photos/402" },
    ];
    const handleOpen = (i) => {
        setSliderNumber(i);
        setOpen(true);
    };

    const handleMove = (direction) => {
        let newSlideNumber;
        if (direction === "l") {
            newSlideNumber =
                slideNumber === 0 ? data.photos.length - 1 : slideNumber - 1;
        } else {
            newSlideNumber =
                slideNumber === data.photos.length - 1 ? 0 : slideNumber + 1;
        }
        setSliderNumber(newSlideNumber);
    };

    const handleClick = () => {
        if (user) {
            setOpenModel(true);
        } else {
            navigate("/login");
        }
    };
    // console.log(data);

    console.log(setOpenModel);
    return (
        <>
            <div>
                <Navbar />
                <Header type="list" />

                {loading ? (
                    <h1>Loading....</h1>
                ) : (
                    <div className="hotelContainer">
                        {open && (
                            <div className="slider">
                                <FontAwesomeIcon
                                    icon={faPersonThroughWindow}
                                    className="close"
                                    onClick={() => setOpen(false)}
                                />
                                <FontAwesomeIcon
                                    icon={faCircleArrowLeft}
                                    className="arrow"
                                    onClick={() => handleMove("l")}
                                />
                                <div className="sliderWrapper">
                                    <img
                                        src={data.photos[slideNumber]}
                                        alt="img..."
                                        className="sliderImg"
                                    />
                                </div>
                                <FontAwesomeIcon
                                    icon={faCircleArrowRight}
                                    className="arrow"
                                    onClick={() => handleMove("r")}
                                />
                            </div>
                        )}
                        <div className="hotelWrapper">
                            <button className="bookNow" onClick={handleClick}>
                                Reserve or Book Now!
                            </button>
                            <h1 className="hotelTitle"> {data.name}</h1>
                            <div className="hotelAddress">
                                <FontAwesomeIcon icon={faLocationDot} />
                                <span>{data.address}</span>
                            </div>
                            <span className="hotelDistance">
                                Excellent location - {data.distance}m from
                                center
                            </span>
                            <span className="hotelPriceHighlight">
                                Book a stay over ${data.cheapestPrice} at this
                                property and get a free airpot taxi
                            </span>
                            <div className="hotelImages">
                                {data.photos &&
                                    data.photos.map((photo, index) => {
                                        return (
                                            <div
                                                className="hotelImgWrapper"
                                                key={index}
                                            >
                                                <img
                                                    onClick={() =>
                                                        handleOpen(index)
                                                    }
                                                    src={photo}
                                                    alt="PhotoImg.."
                                                    className="hotelImg"
                                                />
                                            </div>
                                        );
                                    })}
                            </div>
                            <div className="hotelDetails">
                                <div className="hotelDetailsTexts">
                                    <h1 className="hotelTitle">{data.title}</h1>
                                    <p className="hotelDesc">{data.desc}</p>
                                </div>
                                <div className="hotelDetailsPrice">
                                    <h1>Perfect for a {days}-night stay!</h1>
                                    <span>
                                        Located in the real hear of Krakow ,
                                        this property has an excellent location
                                        score of 9.8!
                                    </span>
                                    <h2>
                                        <b>
                                            $
                                            {days *
                                                data.cheapestPrice *
                                                options.room}
                                        </b>
                                        ({days} nights)
                                    </h2>
                                    <button onClick={handleClick}>
                                        Rserve or Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                        <MailList />
                        <Footer />
                    </div>
                )}

                {openModel && <Reserve openModel={setOpenModel} hotelId={id} />}
            </div>
        </>
    );
}

export default Hotel;
