import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState} from "react";

function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() =>{
    const storedUser = JSON.parse(localStorage.getItem("user"));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(storedUser);
  },[]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <h1>Welcome to Dashboard 🎉</h1>
      <h3>Welcome {user}</h3>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
