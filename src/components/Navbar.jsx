import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { removeAllFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import { removeConnections } from "../utils/connectionsSlice";
import { removeAllRequests } from "../utils/requestsSlice";

function Navbar() {
  const userData = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/logout",
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUser());
      dispatch(removeConnections());
      dispatch(removeAllFeed())
      dispatch(removeAllRequests())
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    
  }, []);

  return (
    <>
      <div className="navbar bg-base-300">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl" href="/">
            👩‍💻 DevTinder 
          </Link>
        </div>
       
        {userData && (
          <div className="flex-none gap-2">
            <div className="justify-center align-middle">
              Welcome, {userData.firstName}
            </div>

            <div className="dropdown dropdown-end ">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={userData.photoUrl}
                  />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/feed">Feed</Link>
                </li>
                <li>
                  <Link to="/connections">Connections</Link>
                </li>
                <li>
                  <Link to="/requests">Requests</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
