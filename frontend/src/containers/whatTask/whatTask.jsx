import React from 'react';
import './whatTask.css';
import Feature from '../Feature/Feature';

const WhatTask = () => {
    return(
    <div className='WhatTask section_margin' id="whatTask">
        <div className='WhatTask_heading'>
            <h1 className='gradient_text'>List absolutely anything down to the smallest piece</h1>
        </div>
        
        <div className='WhatTask_container'>
            <Feature title={"What is TaskManager?"} text={"A website for writing down your notes, simply create an account and begin writing up your tasks for your day. Enter your email above to receive instructions on how to begin."}/>
            <Feature title={"Equivalent of sticky notes"} text={"For any occassion, just write down a time and place and you will never forget anything again. Meetings? Birthdays? Gifts? No problem!"}/>
        
        </div>
    </div>
    )
    
}

export default WhatTask;