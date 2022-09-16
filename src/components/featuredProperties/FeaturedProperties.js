import React from "react";
import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

function FeaturedProperties() {
    const { data, error, loading } = useFetch("/hotels?featured=true&limit=4");

    return (
        <div className="fp">
            {loading ? (
                <h1>Loading . . . </h1>
            ) : (
                <React.Fragment>
                    {data.map((item, index) => {
                        return (
                            <div className="fpItem" key={index}>
                                <img
                                    // src="https://picsum.photos/406/406"
                                    src={item.photos[0]}
                                    alt="img.."
                                    className="fpImg"
                                    style={{ width: "300px" }}
                                />
                                <span className="fpName">{item.name}</span>
                                <span className="fpCity"> {item.city}</span>
                                <span className="fpPrice">
                                    Starting from ₹ {item.cheapestPrice}
                                </span>
                                {item.rating && (
                                    <div className="fpRating">
                                        <button> {item.rating} </button>
                                        <span>Excellent</span>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </React.Fragment>
            )}
        </div>
    );
}

export default FeaturedProperties;
