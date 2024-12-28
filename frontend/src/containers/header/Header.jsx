import React from 'react';
import './header.css';
import HeaderListImage from '../../assets/List.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Header() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        
        event.preventDefault(); // Prevent the default form submission behavior
        
        // Call the function and pass the formData
        console.log(email)
        console.log(password)
        //postData(email,password);
      };

    const handleSendData = async() =>{
        const newData = await postData()

    }
    
    const fetchData = async() =>{
        console.log("fetching..")
        const response = await axios.get('http://localhost:8000/api/get-all-posts/')
        console.log(response)
        const {data} = response
        console.log(data)
        return data
    }
    
    useEffect( () =>{
        //fetchData() Gets all info from API (DJANGO)
    },[] )

    const postData = async() => {
        const title = email
        const content = password
        const body = {title,content}
        const response = await axios.post('http://localhost:8000/api/create-new-post/',body)
        console.log(response)
        return response.postData
    }
    
    

    return(
        <div className='header_section_padding' id="home">
            <div className='header_content'>
                <h1 className='gradient_text'>Lets Get You Organised <br></br>With Task Manager </h1>
                <p>Welcome to my task manager website, here you can sign up or login and view your list of tasks that need to be done.
                    <br></br> Grocery shopping, meetings, birthdays, hangouts, organise anything you need and keep track of events.
                </p>
                <div className='header_content_input'>
                    <input data-testid="cypress-email" type='email' placeholder='Your Email Address' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input data-testid="cypress-password" type='password' placeholder='Your password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button data-testid="cypress-submit" onClick={handleSendData} type='button'>Get Started</button>
                </div>
                
            </div>
            <div className='header_image'>
                    <img src={HeaderListImage} alt='HeaderListImage' />
                </div>
        </div>
    
        )


}





export default Header;