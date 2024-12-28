import React, { useState,useEffect } from 'react';
import './task.css'; // Import your styles

const Task = ({form, onSave}) => {

    // Make a box appear if you click on this div
    const [modal,setModal] = useState(false);
    const [modalUp,setModalUp] = useState(false);
    const [checkboxClicked,setcheckboxClicked] = useState(false);
    const [formNew, setForm] = useState(form);


    
    //IF update form, replace it in DB

    const [isChecked, setIsChecked] = useState(() => {
        // Logic to determine default checked state
        return form.done ? true : false;
      });

    const borderColour = {
        borderLeft: `7px solid ${isChecked ? 'green' : 'red'}`
    };
    
    const toggleModal = () => {
        if(!modalUp){
            setModalUp(true);
            setModal(!modal);
        }
        
    }

    const turnOffModal = () => {
        setModal(!modal);
        setModalUp(false);
        onSave(formNew); //send form off to Grid
    }

    const removeFromDB = async () => {
        console.log("Deleting from DB..");
        let result = await fetch(
            'http://localhost:5000/newPage/remove', {
                method: "post",
                body: JSON.stringify({ form }),
                headers: {
                    'Content-Type': 'application/json'
                }
                
        })
        result = await result.json(); //retrieve tasks from database
        console.warn(result);
        

        
    }

    useEffect(() => {
        console.log('Form prop updated:', form);
        setForm(form);
    }, [form]);

    const handleChange = async (e) => {
        const { name, value } = e.target;
        console.log("-----------------");
        //console.log(value);
        //console.log(formNew);
        
        setForm(prevForm => ({ ...prevForm, [name]: value }));
        //console.log(form);


        //console.log("sending data back..");
        //console.log(formNew);
        //console.log(form);

        
        //return formNew;
        
        
    };

    console.log(formNew);

    const handleCheckboxChange = (event) => {
        
        event.stopPropagation();
        console.log("checkbox clicked:",event);
        setIsChecked(event.target.checked);
        form.done = event.target.checked;
        
        
        

    };
    
  

    return(

    
    <div className='task' onClick={toggleModal} style={borderColour} >

        
    
       {/* <div className='header'>Date/Priority: {form.date}/ {form.priority} id: {form.id}</div> 
        <div className='main-content'> {form.title}</div> */}
        <div className='task-container'>
            
            <span className='task-done'>{<input type="checkbox" checked={isChecked} onClick={(e) => handleCheckboxChange(e)}  />
            
            }</span>
            <span className='task-info'>ASSIGNEE</span>
            <span className='task-info'>{form.priority}</span>
            <span className='task-percent'>{form.percent}% </span>
            <span className='task-title'>{form.title}</span>

            <span className='task-date'>{form.date}</span>

        </div>
        
        
        {modal && (
        <div className="modal">
        <div className="overlay" >
          <div className="modal-content">
          <form className="form">
                <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formNew.date}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="priority">Priority:</label>
                    <select
                        id="priority"
                        name="priority"
                        value={formNew.priority}
                        onChange={handleChange}   
                    >   
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formNew.title}
                        onChange={handleChange}
                        
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formNew.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="percent">Percent:</label>
                    <textarea
                        id="percent"
                        name="percent"
                        value={formNew.percent}
                        onChange={handleChange}
                    />
                </div>
                
            </form>
            <button className="delete-task" onClick={removeFromDB}>remove</button>

            

            <button className="close-modal"
            onClick={turnOffModal}>
              CLOSE

            </button>
          </div>
        </div>
      </div>
      )}
    </div>


    )
    
};

export default Task;