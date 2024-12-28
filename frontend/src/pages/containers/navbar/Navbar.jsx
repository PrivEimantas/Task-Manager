import React,{useState} from 'react';
import {RiMenu3Line,RiCloseLine} from 'react-icons/ri'; /* displays the 3 lines next to sign up */
import './navbar.css';
import {Grid} from '../index';



const Navbar = ({onSubmit})  =>  {
  const [idCounter,setidCounter] = useState(0);

  const [isChecked, setIsChecked] = useState(false);

  
  
  
  const [form, setForm] = useState({
    id: idCounter,
    date: '',
    priority: 'low',
    title: '',
    description: '',
    done: false,
    percent: 0,
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    //console.log("name:",name);
    //console.log("value:,",value);
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

const handleCheckboxChange = (event) => {
  setForm((prevForm) => ({
    ...prevForm,
    done: event.target.checked, // Update 'done' based on checkbox status
  }));
};

const [items, setItems] = useState([]);

const handleSubmit = (e) => {
    e.preventDefault();
    
    // Handle form submission logic
    const newItem = { ...form };
    
    setItems(prevItems => [...prevItems, newItem]);
    
    
    onSubmit(form);
    console.log("form in Navbar: ",form);
    //setidCounter(idCounter+1);
    console.log("COUNTER IN NAVBAR:",idCounter);
    
    setForm({ //reset form parameters to be default
        id: idCounter+1,
        date: '',
        priority: 'low',
        title: '',
        description: '',
        done: false,
        percent: 0,
    });
    setidCounter(idCounter+1); //increment ID so can uniquely identify different tasks
    
    uploadToDB(e);

    
};

  const uploadToDB = async (e) => {
      console.log("uploading to db..");
      e.preventDefault();
      const userInfo = localStorage.getItem("userInfo");
      const userInfoOut = JSON.parse(userInfo);
      //console.log("user info",userInfoOut);
      //console.log("upload to db USERNAME",userInfoOut.status);
      let result = await fetch(
        'http://localhost:5000/newPage/upload', {
            method: "post",
            body: JSON.stringify({ form,userInfoOut }),
            headers: {
                'Content-Type': 'application/json'
            }
            
        })
        result = await result.json();

  }


  const [modal,setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal)
  }
  //For the box appearing logic when you click 'Create New Task'

  return (
    <div className='navbar'>
      <div className='navbar-links'>
        <div className='navbar-button-options'>
          <p onClick={toggleModal}>Create New Task</p>
          <p>Edit Task</p>
          <p>Remove Task</p>
        </div>
        
      {modal && (
        <div className="modal">
        <div className="overlay" >
          <div className="modal-content">
          <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="done">Completed?: </label>
                    <input
                        type="checkbox"
                        id="done"
                        name="done"
                        checked={form.done}
                        onChange={handleCheckboxChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="percent">Percent:</label>
                    <input
                        type="percent"
                        id="percent"
                        name="percent"
                        value={form.percent}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="priority">Priority:</label>
                    <select
                        id="priority"
                        name="priority"
                        value={form.priority}
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
                        value={form.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                    />
                </div>
                
                <div className="form-group">
                    <button type="submit" onClick={handleSubmit} >Submit</button> 
                </div>
            </form>

            

            <button className="close-modal"
            onClick={toggleModal}>
              CLOSE

            </button>
          </div>
        </div>
      </div>
      )}
          
      </div>
      
      
     
    </div>
    )
}

export default Navbar;
