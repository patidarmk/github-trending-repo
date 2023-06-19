import React from "react";
import githubsvg from "../assets/github-svgrepo.svg";
import { Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = ({isLoggedIn}) => {
	
  const navigate = useNavigate();
 // const isAuthenticated = localStorage.getItem("accessToken");
  if (isLoggedIn) {
	  console.log("logged-In")
	  navigate("/home");
	
  }
  const handleLogin = () => {
    const clientId = "15e92c4ed83be9db448d";
    const redirectUri = "https://hros-assignment.netlify.app/home";
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
    window.location.href = authUrl;
  };

  return (
    <div className="login-container">
      <div className="glass box">
        <img className="svg-icon" src={githubsvg} alt="git-icon" />
        <button className="button-3" onClick={handleLogin}>
          Login with Github
        </button>
      </div>
    </div>
  );
};

export default Login;
