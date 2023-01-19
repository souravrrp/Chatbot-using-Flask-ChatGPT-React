import logo from './logo.svg';
import './App.css';



//dependencies
import React, { useState, useEffect } from 'react';
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate
// } from "react-router-dom";

//components
import './components/custom.css';
import './components/custom.js';

function App() {
  
  //Return data from Flask
  const [currentTime, setCurrentTime] = useState(0);
  const [currentDateTime, setCurrentDateTime] = useState(1);

  const [userInput, setUserInput] = useState('');
  const [chatresponse, setResponse] = useState('');

  const handleChange = e => {
    setUserInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: userInput }),
    })
      .then(chatresponse => chatresponse.text())
      .then(data => setResponse(data));
  };

  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
    fetch('/date').then(res => res.json()).then(data => {
      setCurrentDateTime(data.now);
    });
  }, []);

  //Return Reactjs
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p style={{color: "#0099cc", fontSize:"50px"}}>
          AI Chatbot
        </p>
        <form  onSubmit={handleSubmit}>
          <label style={{color: "#006699", fontSize:"20px"}}>
            Let's Chat:<br></br><br></br>
            <input className='text' type="text" name="name"  value={userInput} onChange={handleChange} placeholder="Enter your message here" />
          </label>
          <input className="submit" type="submit" value="Submit" />
        </form>
        <div>
          <br></br>
          <label style={{color: "yellow"}}>Here's Chat Response:<br></br></label>
          {chatresponse}
          </div>
        <br></br>
        {/* <p>The current unix is {currentTime}.</p> */}
        {/* <p>The current datetime is {currentDateTime}.</p> */}
        <a
          className="App-link"
          href="https://souravrrp.github.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Reach me out here
        </a>
      </header>
    </div>
  );
}

export default App;
