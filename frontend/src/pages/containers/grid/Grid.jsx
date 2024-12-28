import React, { useState } from 'react';
import './grid.css'; // Import your styles
import {Task} from '../index'



const Grid = ({form}) => {

   const [newForm,setnewForm] = useState(form);

   const handleFormData = (data) => {
        //setForm(prevForms => [...prevForms, formData]);
        //setForm(formData);
        //console.log("Form data received from child:", forms);
        console.log("data in grid here: ",data);
        console.log(form.length);


        for(let index=0;index < form.length;index=index+1){
            if (form[index].id === data.id) {
                form[index] = data; // Update the form at the matching index
                break; // Exit loop after finding and updating the form
            }
        }
        console.log("updated form IN:",form);
        setnewForm([...form]);
        //this.setState({formData:data});

        
        //console.log("form:", this.formData);
      };


    const priorityOrder = { 'high': 1, 'medium': 2, 'low': 3 };
    console.log("updated form OUT:",form);
    const sortedItems = form.sort((a, b) => {
        // First, compare by date
        const dateComparison = new Date(a.date) - new Date(b.date);
        if (dateComparison !== 0) {
            return dateComparison;
        }
        //console.log("sorting items:",priorityOrder[a.priority]);
        // If dates are the same, compare by priority
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
    
    
    //console.log("Form data in Grid:", form); // Debugging statement

    
    return(

    <div className='grid'>
        <div className='todo-container'>
            <div className='small'>
            <span className='task-info'>DONE</span>
            <span className='task-info'>ASSIGNEE</span>
            <span className='task-info'>Priority</span>
            <span className='task-info'>%</span>
            <span className='task-info'>TASK NAME</span>
            <span className='task-date'> DATE</span>
            </div>
            
            {Array.isArray(form) && form.length > 0 ? (
                form.map((formChild, index) => (
                    formChild && formChild.title && formChild.description ? (
                        <Task form={formChild} onSave={handleFormData} />
                    ) : null
                ))
            ) : (
                null
            )}
            
            
        </div>

        
    </div>
    )
    
};

export default Grid;
