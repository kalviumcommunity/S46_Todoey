import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Tasks from '../components/Tasks';

function Home({ onLogOut }) {
  const [currentUser, setCurrentUser] = useState({});

  function getCookie(name) {
    let cookieArray = document.cookie.split('; ');
    let cookie = cookieArray.find((row) => row.startsWith(name + '='));
    return cookie ? cookie.split('=')[1] : null;
  }

  useEffect(() => {
    setCurrentUser(JSON.parse(getCookie('User')));
  }, []);

  return (
    <div className="app">
      <Navbar user={currentUser.email} onLogOut={onLogOut} />
      <Tasks user={currentUser.token} />
    </div>
  );
}

export default Home;
