import React from 'react';
import './Feature.css';

const Feature = ({title,text}) => { /* accepts prompts as arguments */
    return(
    <div className='Features_container_feature'>
        <div className='Features_container_feature_title'>
            <div/>
            <h1>{title}</h1>
        </div>
        <div className='Features_container_feature_text'>
            <p>{text}</p>
        </div>
    </div>
    )
    
}

export default Feature;