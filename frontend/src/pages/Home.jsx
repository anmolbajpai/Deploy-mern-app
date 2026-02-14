import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null); // update UI immediately
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <h1>Welcome to Dashboard 🎉</h1>

      {user ? (
        <>
          <h3>Welcome {user.name || user}</h3>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <h3>Please login first</h3>
          <button onClick={handleLoginRedirect}>Login</button>
        </>
      )}
    </div>
  );
}

export default Home;
