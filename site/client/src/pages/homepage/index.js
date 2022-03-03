import React from "react";
import { generateCorrelations } from "../../processes/create_recommendations";
import Button from "../../components/small/button";

const Homepage = () => {
    //
    const onClick = async () => {
        generateCorrelations(15).then(correlations => {
            console.log(correlations);
        });
    };

    return (
        <div className="HomePage placeholder">
            <Button value={"make recommendations"} onClick={onClick} />
        </div>
    );
};

export default Homepage;
