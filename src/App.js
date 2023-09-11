import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import React from "react";
import Main from "./Main";
import axios from "axios";

function App() {
  const [name, setName] = React.useState("");
  const [isHistoryOpen, setIsHistoryOpen] = React.useState(false);
  const [isHistoryButtonVisible, setIsHistoryButtonVisible] =
    React.useState(true);
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");
  const [histories, setHistories] = React.useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const loggedIn = localStorage.getItem("loggedIn");
  const [checkAuth, setCheckAuth] = React.useState("");
  const [code, setCode] = React.useState("");

  React.useEffect(() => {
    // Check if the token is valid
    if (!token || isTokenExpired()) {
      navigate("/login"); // Redirect to login page if token is missing or expired
    } else {
      checkToken();
    }
  }, [token, navigate]);

  function historyButton() {
    setIsHistoryOpen(!isHistoryOpen);
  }

  function isTokenExpired() {
    const tokenExpiration = localStorage.getItem("tokenExpiration");
    if (!tokenExpiration) return true;
    const expirationDate = new Date(tokenExpiration);
    return expirationDate < new Date();
  }

  function checkToken() {
    axios
      .get(
        `https://convertor-back.politeriver-e73a6e59.westeurope.azurecontainerapps.io/check_token`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setCheckAuth(response.data.user);
      })
      .catch((error) => {
        console.error("Error checking token:", error);
        console.error("Response data:", error.response.data);
        console.error("Status code:", error.response.status);
        navigate("/login"); // Redirect to login page on error or token expiration
      });
  }

  function handelHistory() {
    if (localStorage.getItem("token")) {
      axios
        .get(
          `https://convertor-back.politeriver-e73a6e59.westeurope.azurecontainerapps.io/history_by_user/${localStorage.getItem(
            "name"
          )}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
          setHistories(response.data);
        });
    }
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("tokenExpiration");
    localStorage.removeItem("loggedIn");
    navigate("/login");
  }

  return (
    <div>
      <nav>
        <div style={{ marginTop: "3%" }}>
        </div>
        <div>
          <img
            src="/Convertor.png"
            style={{ width: "60vh" }}
            alt="image"
            className="responsive-image"
            />
        </div>
        <div></div>
      </nav>
            {loggedIn ? (
              <div style={{'display':'flex','justifyContent':"space-around"}}>
                {" "}
                {isHistoryButtonVisible && (
                  <button onClick={historyButton}>History</button>
                )}
                <button onClick={logout}>Logout</button>
              </div>
            ) : (
              <div />
            )}

      <Routes>
        <Route
          path="/login"
          element={
            <Login
              name={name}
              setName={setName}
              handelHistory={handelHistory}
              token={token}
              navigate={navigate}
            />
          }
        />
        <Route
          path="/"
          element={
            <Main
              setIsHistoryButtonVisible={setIsHistoryButtonVisible}
              isHistoryOpen={isHistoryOpen}
              setIsHistoryOpen={setIsHistoryOpen}
              isHistoryButtonVisible={isHistoryButtonVisible}
              name={name}
              handelHistory={handelHistory}
              token={token}
              histories={histories}
              navigate={navigate}
              params={params}
              checkAuth={checkAuth}
              code={code}
              setCode={setCode}
              refreshToken={refreshToken}
            />
          }
        />
        <Route
          path="/code/:id"
          element={
            <Main
              setIsHistoryButtonVisible={setIsHistoryButtonVisible}
              isHistoryOpen={isHistoryOpen}
              setIsHistoryOpen={setIsHistoryOpen}
              isHistoryButtonVisible={isHistoryButtonVisible}
              name={name}
              handelHistory={handelHistory}
              token={token}
              histories={histories}
              navigate={navigate}
              params={params}
              checkAuth={checkAuth}
              code={code}
              setCode={setCode}
              refreshToken={refreshToken}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
