import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Tasks from "../components/Tasks";

function Home({onLogOut}) {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const user = localStorage.getItem("User");
    setCurrentUser(JSON.parse(user));
  }, []);

  return (
    <div className="app">
      <Navbar user={currentUser.email} onLogOut={onLogOut} />
      <Tasks user={currentUser.token} />
    </div>
  );
}

export default Home;
