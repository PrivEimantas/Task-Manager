import React,{useEffect, useState} from 'react';
import {RiMenu3Line,RiCloseLine} from 'react-icons/ri'; /* displays the 3 lines next to sign up */
import './navbar.css';
import PopUp from '../Popup/Popup';
import { Navigate, useNavigate } from 'react-router-dom';




const Navbar = ()  =>  {
  const [toggleMenu,setToggleMenu] = useState(false); /* whether we showing mobile menu or not */
  const [ButtonPopup,setButtonPopup] = useState(false); 
  const [ButtonPopupIn,setButtonPopupIn] = useState(false); 
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  
  /*
  useEffect( () =>{
    return() =>{
      const userInfo = localStorage.getItem("userInfo");

      //Pushing information to the new page
      if(userInfo){
        history.push("/newPage",userInfo)
      }
    }
  }, [history]);
  */
  

  const navigate = useNavigate();


    //console.log(name); //
    //console.log(password); //TO DEBUG IF THE TEXT BOXES COULD ACTUALLY GET INPUT

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        let result = await fetch(
        'http://localhost:5000/users/add', {
            method: "post",
            body: JSON.stringify({ name, password }),
            headers: {
                'Content-Type': 'application/json'
            }
            
        })
        result = await result.json();
        console.warn(result);
        if (result) {
            alert("Data saved succesfully");
            setPassword("");
            setName("");
        }
    }

  const handleSignIn = async (e) => {
    e.preventDefault();

    const username = name;
    console.log("input data..:",username);
    console.log("input pass..:",password);
    let result = await fetch(
      'http://localhost:5000/login', {
          method: "post",
          body: JSON.stringify({ username, password }),
          headers: {
              'Content-Type': 'application/json'
          }
          
      })
      result = await result.json();
      console.warn(result);

      if (result.status=200){
        //console.log(result);
        console.log("Login successful");
        localStorage.setItem('userInfo',JSON.stringify(result))
        navigate('/newPage',{state:result});
      }
      else{
        console.log("Error.. login failed: ",result.message);
      }

      

  }
 
 
  return (
    <div className='navbar'>
      <div className='navbar-links'>
        <div className='navbar-links_logo'>
          <p id='TaskManagerText'>TaskManager</p>
        </div>
        <div className='navbar-links_container'>
          <p><a href='#home'>Home</a></p>
          <p><a href='#wts'>What Is This?</a></p>
          <p><a href='#home'>Home</a></p>
          
        </div>
      </div>
      <div className='navbar-sign'>
      <button  onClick={() => {setButtonPopupIn(true);} } type='button'>Sign In</button>
      <button onClick={() => {setButtonPopup(true);} } type='button'>Sign Up</button>
        
      </div>
      <div className='navbar-menu'>
        {toggleMenu /* if statement */
          ? <RiCloseLine color='#fff' size={27} onClick={()=>setToggleMenu(false)}/> 
          : <RiMenu3Line color='#fff' size={27} onClick={()=>setToggleMenu(true)}/>
        }
      </div>
      <PopUp trigger={ButtonPopup} setTrigger={setButtonPopup}>
          <h3>Sign Up</h3>
          <form action="" >
          <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button type="submit" onClick={handleOnSubmit}>submit</button>

          </form>
        </PopUp>

        <PopUp trigger={ButtonPopupIn} setTrigger={setButtonPopupIn}>
          <h3>Sign In</h3>
          <form action="" >
          <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button type="submit" onClick={handleSignIn}>submit</button>

          </form>
        </PopUp>
    </div>
    )
}

export default Navbar;
