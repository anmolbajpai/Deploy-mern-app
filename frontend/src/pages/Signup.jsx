import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if(storedUser){
      navigate('/home')
    }
  },[navigate]);

 const handleSignup = async (e) => {
  e.preventDefault();

  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Account Created Successfully!");
      navigate("/login");
    } else {
      alert(data.message || "Signup failed");
    }

  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong!");
  }
};


  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="Name"
          onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email"
          onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password"
          onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Signup</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}

export default Signup;
