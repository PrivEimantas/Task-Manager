import React from 'react';
import { useLocation } from 'react-router-dom';
import NewPage from './newPage'; // Import your class component

function NewPageWrapper() {
  const location = useLocation(); // Extract location with state
  console.log(location.state);
  return <NewPage location={location}  />;
}

export default NewPageWrapper;