import React from "react";
import { useNavigate } from "react-router-dom"; 
export default function Login() {
    
    const navigate = useNavigate();
 
  const container = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#555",
    backgroundImage: 'url("assets/bg.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    margin: 0,
  };

  const box = {
    backgroundColor: "rgba(255,255,255,0.95)",
    padding: "30px",
    borderRadius: "15px",
    textAlign: "center",
    width: "350px",
    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
  };

  const avatar = {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    margin: "0 auto 15px",
    display: "block",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  };

  const input = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #aaa",
    borderRadius: "5px",
  };

  const options = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "0.9em",
    marginTop: "10px",
  };

  const remember = {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    whiteSpace: "nowrap",
  };

  const button = {
    width: "100%",
    padding: "10px",
    backgroundColor: "#111",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const buttonHover = {
    backgroundColor: "#333",
  };

  const signup = { marginTop: "20px", fontSize: "0.9em" };
  const handleSubmit = (e) => {
    e.preventDefault();        // stop page refresh
    navigate("/home");         // go to dashboard
  };
  /* ------------------------------------- */

  return (
    <div style={container}>
      <div style={box}>
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          alt="Profile"
          style={avatar}
        />

        <h2 style={{ marginBottom: "10px" }}>LOGIN</h2>

        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="test@example.com" required style={input} />
          <input type="password" placeholder="**********" required style={input} />

          <div style={options}>
            <label style={remember}>
              <input type="checkbox" defaultChecked />
              Remember&nbsp;me
            </label>
            <a href="#" style={{ color: "#007BFF", textDecoration: "none" }}>
              Forgot&nbsp;password?
            </a>
          </div>

          {/* simple inline hover using onMouse events */}
          <button
    type="submit"
    style={button}
    onMouseEnter={(e) =>
      (e.currentTarget.style.backgroundColor = buttonHover.backgroundColor)
    }
    onMouseLeave={(e) =>
      (e.currentTarget.style.backgroundColor = button.backgroundColor)
    }
  >
    Log in
  </button>
        </form>

        <p style={signup}>
          Don&apos;t have an account?{" "}
          <a href="#" style={{ color: "#007BFF", textDecoration: "none" }}>
            Sign&nbsp;up
          </a>
        </p>
      </div>
    </div>
  );
}
