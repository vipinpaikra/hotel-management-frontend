import React from "react";
import useFetch from "../../hooks/useFetch";
import "./propertyList.css";

const PropertyList = () => {
    const { data, error, loading } = useFetch("/hotels/find/countByType");

    const images = [
        "https://media.istockphoto.com/photos/luxury-resort-picture-id104731717?k=20&m=104731717&s=612x612&w=0&h=40INtJRzhmU1O4Rj24zdY8vj4aGsWpPaEfojaVQ8xBo=",
        "https://teja12.kuikr.com/is/a/c/880x425/public/images/apartments/original_img/k9yqlp.gif",
        "https://images.adsttc.com/media/images/5e4c/1025/6ee6/7e0b/9d00/0877/large_jpg/feature_-_Main_hall_1.jpg?1582043123",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/337404069.jpg?k=4c5a4ff06cce5d76b254c737683558d727cf56fe7ef99c7eec2d92564da5b30e&o=&hp=1",
        "https://media-cdn.tripadvisor.com/media/photo-s/13/32/23/fe/enjoy-our-brand-new-cabins.jpg",
    ];

    return (
        <div className="pList">
            {loading ? (
                <h1>Loading ...</h1>
            ) : (
                <>
                    {data &&
                        data.map((data, index) => {
                            return (
                                <div className="pListItem" key={index}>
                                    <img
                                        src={images[index]}
                                        alt={images[index]}
                                        className="pListImg"
                                    />
                                    <div className="pListTitles">
                                        <h1>{data.type}</h1>
                                        <h2> {data.count} </h2>
                                    </div>
                                </div>
                            );
                        })}
                </>
            )}
        </div>
    );
};

export default PropertyList;
