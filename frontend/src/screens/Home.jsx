import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Tasks from "../components/Tasks";

function Home() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("User");
    setCurrentUser(user);
  }, []);

  return (
    <div className="app">
      <Navbar user={currentUser} />
      <Tasks user={currentUser} />
    </div>
  );
}

export default Home;
