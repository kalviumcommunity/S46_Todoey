import Home from "./screens/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = localStorage.getItem("User");
    setUser(currentUser);
    console.log(currentUser);
  });

  const setUserToNull = () => {
    setUser(null);
  };

  const setUserToValue = (data) => {
    setUser(data)
  }

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Home onLogOut={setUserToNull} />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/login"
          element={!user ? <Login onLogin={setUserToValue} /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup onSignup={setUserToValue} /> : <Navigate to={"/"} />}
        />
      </Routes>
    </div>
  );
}

export default App;
