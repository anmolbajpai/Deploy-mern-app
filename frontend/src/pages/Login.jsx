import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if(storedUser){
    navigate('/home')
  }
},[navigate]);

const handleLogin = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  try {
    const response = await fetch("https://deploy-mern-app-delta.vercel.app/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      // assuming backend returns token
      localStorage.setItem("token", data.jwtToken);
      localStorage.setItem("user", JSON.stringify(data.name));

      alert("Login Successful!");
      navigate("/home");
    } else {
      alert(data.message || "Invalid credentials");
    }

  } catch (error) {
    console.error("Error:", error);
    alert("Server error!");
  }
};


  return (

    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email"
          onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password"
          onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
        <p>Don't have an account? <Link to="/signup">Signup</Link></p>
      </form>
    </div>
  );
}

export default Login;
