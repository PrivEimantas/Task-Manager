import React,{useState,useEffect, Component} from 'react';
import './newPage.css';

//import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Navbar,Grid,Task} from './containers';
import { useLocation } from 'react-router-dom';



class NewPage extends Component{

  
  
  constructor(props){
    super(props);



    this.state = {
      forms: [],
      userState: props.location.state,
    };
    
    console.log("userstate",this.state.userState);

    if (window.performance) {
      if (performance.navigation.type == 1) {
        console.log( "This page is reloaded" );
        this.retrieveTasks();
        //retrieve data from server

      }
    }
    
  }

  retrieveTasks = async () => {
    console.log("retrieving from db.."); // Fetches info from database when a user logs in (saving state)
    
    const userInfo = localStorage.getItem("userInfo");
    const userInfoOut = JSON.parse(userInfo);
    //console.log("user info",userInfoOut);
    //console.log("upload to db USERNAME",userInfoOut.status);
    let result = await fetch(
      'http://localhost:5000/newPage/retrieve', {
          method: "post",
          body: JSON.stringify({ userInfoOut }),
          headers: {
              'Content-Type': 'application/json'
          }
          
      })
      result = await result.json(); //retrieve tasks from database
      console.warn(result);

      this.state.forms = []; //replaces current form info with the retrieved dataset
      for(const data of result){
        //console.log(data);
          this.setState((prevState) => ({
            forms: [...prevState.forms, data], // Add new form data to the array
        }));
      }

      this.forceUpdate();

  }

  //const [form, setForm] = useState(null);
  handleFormData = (data) => {
    //setForm(prevForms => [...prevForms, formData]);
    //setForm(formData);
    //console.log("Form data received from child:", forms);
    console.log("data: ",data);
    //this.setState({formData:data});

    this.setState((prevState) => ({
      forms: [...prevState.forms, data], // Add new form data to the array
  }));

  
    //console.log("form:", this.formData);
  };

  handleBeforeUnload = (event) => {
    // Logic to run when the page is refreshed or closed
    console.log('Page is about to refresh or close');
    
    // Optionally prevent the page from refreshing
    //event.preventDefault();
    //event.returnValue = ''; // This triggers a confirmation dialog in some browsers

    // You can perform any action here, like saving data or showing a confirmation dialog.
  };

  
  render() {
    //this.forceUpdate();
    const { forms} = this.state;
    //const { userState } = this.props.location?.state || {};
   // console.log("user state here in newpage:",userState);

    console.log("forms in render:" ,forms);
    
    return (
      <div className='NewPage'>
      <div className='gradient_bg' id="bg">
        
        <Navbar onSubmit={this.handleFormData}/>
        
        <Grid form={forms}/>
      </div>
    
    </div>
    );

    
}
}

export default NewPage;