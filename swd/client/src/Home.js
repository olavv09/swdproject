import React, { useState } from "react";
import "./App.css";
import Form from "./Form";
import { useNavigate } from 'react-router-dom';

function Home() {
 // const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();


  const handleFormSubmit = () => {
    // Handle form submission logic here
    // For now, just toggle the state to show the results
    //setShowResults(true);
    navigate('/results');
  };

  return (
    <div>
        <Form onSubmit={handleFormSubmit} />
    </div>
  );
}

export default Home;
