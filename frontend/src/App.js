import React from 'react';
import './App.css';
import NewPage from './pages/newPage';
import NewPageWrapper from './pages/newPageWrapper';
import {Header,WhatTask,Navbar} from './containers';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';


function App() {
  
  return (
   <Router>


    <Routes>
      
    <Route
          path="/"
          element={
            <div className="App">
              <div className="gradient_bg">
                <Navbar />
                <Header />
                <WhatTask />
              </div>
            </div>
          }
        />
      <Route
          path="/newPage" 
          element={< NewPageWrapper />} /> 
          {/* New page route */}

    </Routes>


   </Router>
    
    
    
    
   
  
    
    
     
    
    
    
  );
}

export default App;
