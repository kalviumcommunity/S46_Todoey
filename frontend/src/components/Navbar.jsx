import { Link, useNavigate } from "react-router-dom";

function Navbar({ user }) {
  // console.log(user)
  return (
    <div className="flex justify-between bg-blue-500 p-6 shadow-md">
      <div className="text-2xl text-white font-bold border-4 p-3">Todoey</div>
      {user ? <LogoutButton user={user} /> : <Buttons />}
    </div>
  );
}

function LogoutButton({ user }) {

  const navigate = useNavigate()

  const logOut = () => {
    localStorage.removeItem('User')
    navigate('/login')
  };

  return (
    <div className="flex content-center flex-wrap text-white my-2">
      <div className="flex justify-center content-center flex-wrap font-medium">
        {user}
      </div>
      <div className="mx-4 cursor-pointer font-semibold text-lg border-2 px-4 py-2" onClick={logOut}>
        Logout
      </div>
    </div>
  );
}

function Buttons() {
  return (
    <div className="flex content-center flex-wrap text-white my-2">
      <div className="mx-4 cursor-pointer font-semibold text-lg border-2 px-4 py-2">
        <Link to={"/login"}>Login</Link>
      </div>
      <div className="mx-4 cursor-pointer font-semibold text-lg border-2 px-4 py-2">
        <Link to={"/signup"}>Signup</Link>
      </div>
    </div>
  );
}

export default Navbar;
