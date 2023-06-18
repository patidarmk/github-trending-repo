import React from "react";
import PageNotFound from "./Components/PageNotFound";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import DarkMode from "./Components/darkMode/DarkMode";
function App() {
	const base_URL = "https://hros-assignment.netlify.app/"
  return (
    <div>
      <DarkMode />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="https://hros-assignment.netlify.app/home" element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
