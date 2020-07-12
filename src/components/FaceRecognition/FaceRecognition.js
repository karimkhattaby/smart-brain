// @ts-nocheck
import React from 'react';

const FaceRecognition = ({imageURL}) => {
    return (
        <div className="Center ma">
            <div className="absolute mt2">
                <img alt="" src={imageURL} width="500px" height="auto"/>
            </div>
        </div>
    );
};

export default FaceRecognition;