import React from "react";
import PageNotFound from "./Components/PageNotFound";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import DarkMode from "./Components/darkMode/DarkMode";
import {useState} from 'react';
function App() {
	const[isLoggedIn,setIsloggedIn] = useState(false);
	const isAuthenticated = localStorage.getItem("accessToken");
	const base_URL = "https://hros-assignment.netlify.app/"
  return (
    <div>
      <DarkMode />
      <Router>
        <Routes>
          <Route path="/" element={<Login isLoggedIn={isLoggedIn} />} />
          <Route path="/home" element={<Home isLoggedIn={isLoggedIn} setIsloggedIn={setIsloggedIn} />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;