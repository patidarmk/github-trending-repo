import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Callback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleCallback = async () => {
      const searchParams = new URLSearchParams(location.search);
      const code = searchParams.get("code");
      if (code) {
        // Perform API request to exchange code for access token
        const response = await fetch(
          "https://github.com/login/oauth/access_token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({
              client_id: "15e92c4ed83be9db448d",
              client_secret: "41c9d7e178cbab99dbb9e70b4b6b29f4f4e872a9",
              code
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          const accessToken = data.access_token;
          // Save the access token to local storage
          localStorage.setItem("accessToken", accessToken);
          // Redirect to the home page
          console.log("logee");
          navigate("/home");
        } else {
          console.error("Error exchanging code for access token");
          navigate("/");
        }
      } else {
        console.error("Code not found in the URL");
        navigate("/");
      }
    };

    handleCallback();
  }, [location.search, navigate]);

  return (
    <div>
      <h2>Authenticating...</h2>
    </div>
  );
};

export default Callback;
