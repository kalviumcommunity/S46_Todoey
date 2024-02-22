import Home from './screens/Home';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './screens/Login';
import Signup from './screens/Signup';
import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = document.cookie;
    setUser(currentUser);
  });

  function setCookie(name, value, expiry) {
    setUser(value);
    let date = new Date();
    date.setTime(date.getTime() + expiry * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${date.toUTCString()};path=/`;
  }

  const setUserToNull = () => {
    setUser(null);
    document.cookie.split(';').forEach((c) => {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });
  };

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Home onLogOut={setUserToNull} />
            ) : (
              <Navigate to={'/login'} />
            )
          }
        />
        <Route
          path="/login"
          element={
            !user ? <Login onLogin={setCookie} /> : <Navigate to={'/'} />
          }
        />
        <Route
          path="/signup"
          element={
            !user ? <Signup onSignup={setCookie} /> : <Navigate to={'/'} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
