import React from 'react'
import './Popup.css';

function Popup(props) {
  return ( props.trigger) ? ( /* passes in boolean, shows popup otherwise returns string */
    <div className='popup'>
        <div className='popup-inner'>
            <button onClick={()=>props.setTrigger(false)} className='close-btn'>close</button>
            {props.children}
        </div>
    </div>
  ) : ""; 

}

export default Popup