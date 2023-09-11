
import React from "react";
import axios from "axios";

function Login({ navigate, token,setName,name,handelHistory }) {
  
 
  function loadUser() {
    if (name !== undefined && name !== ""){
      axios
            .post(`https://convertor-back.politeriver-e73a6e59.westeurope.azurecontainerapps.io/token`, { name: name })
            .then((response) => {
              const accessToken = response.data.access_token;
              const refreshToken = response.data.refresh_token;
              const expiresIn = response.data.expires_in; // Duration in seconds until token expiration
              const expirationDate = new Date();
              console.log( 'firsttt:  ',expiresIn) // Current date and time
              expirationDate.setTime(expirationDate.getTime() + expiresIn * 1000); // Calculate expiration time
              localStorage.setItem("token", accessToken);
              localStorage.setItem("refreshToken", refreshToken);
              localStorage.setItem("tokenExpiration", expirationDate.toISOString()); // Store as ISO string
              localStorage.setItem('loggedIn',true)
              navigate("/");
              localStorage.setItem("name", name);
              
            })
            .catch((error) => {
              console.error("Error loading user:", error);
              console.error("Response data:", error.response.data);
              console.error("Status code:", error.response.status);
            });
        }
    }
    
  function handleName(data){
    localStorage.setItem('name',data)
    setName(data)
  }

  return (
    <div style={{ textAlign: "center"}}>
    <div style={{ margin:"4%" }}>
        <input
          className="username"
          value={name}
          placeholder="Enter Your Name"
          onChange={(event) => {
            handleName(event.target.value);
          }}
        />
      </div>
        <button onClick={loadUser}>load</button>
      </div>
  );
}

export default Login;
