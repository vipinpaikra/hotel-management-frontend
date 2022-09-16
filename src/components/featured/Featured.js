import React, { useState } from "react";

import "./featured.css";
import useFetch from "../../hooks/useFetch";
function Featured() {
    const { data, error, loading } = useFetch(
        "/hotels/find/countByCity?cities=Hydrabad,Raipur,Delhi"
    );

    return (
        <div className="featured">
            {loading ? (
                <h1>Loading . . .</h1>
            ) : (
                <React.Fragment>
                    <div className="featuredItem">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/f/f7/A_typical_charminar_evening.jpg    "
                            alt="img"
                            className="featuredImg"
                            style={{ width: "50rem" }}
                        />
                        <div className="featuredTitles">
                            <h1>Hydrabad</h1>
                            <h1>{data[0]} properties</h1>
                        </div>
                    </div>
                    <div className="featuredItem">
                        <img
                            src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/8f/a5/02/mayfair-lake-resort.jpg?w=1000&h=600&s=1"
                            alt="img"
                            className="featuredImg"
                            style={{ width: "50rem" }}
                        />
                        <div className="featuredTitles">
                            <h1>Raipur</h1>
                            <h1>{data[1]} properties</h1>
                        </div>
                    </div>
                    <div className="featuredItem">
                        <img
                            src="https://imagesvc.meredithcorp.io/v3/mm/image?q=60&c=sc&poi=face&w=1800&h=900&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2021%2F07%2F30%2Fnew-delhi-india-NEWDELHITG0721.jpg"
                            alt="img"
                            className="featuredImg"
                            style={{ width: "50rem" }}
                        />
                        <div className="featuredTitles">
                            <h1>Delhi</h1>
                            <h1>{data[2]} properties</h1>
                        </div>
                    </div>
                </React.Fragment>
            )}
        </div>
    );
}

export default Featured;
