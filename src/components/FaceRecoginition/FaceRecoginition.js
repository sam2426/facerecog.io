import React from 'react';
import './FaceRecogintion.css';

const FaceRecoginition = ({ imageURL, box }) =>{
    return(
        <div className="center ma">
            <div className="absolute ma2">
            <img id='inputImage' alt="" src={imageURL}  width='500px' height='auto'/>
            <div className='faceBox'
            style={{top:box.top,right:box.right,bottom:box.bottom,left:box.left}}></div>
        </div>
        </div>
    );
}

export default FaceRecoginition;