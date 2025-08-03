import { useState, useEffect } from "react";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const existing = localStorage.getItem("token");
    if (existing) navigate("/");
  }, [navigate]);

  const handleGoogleLogin = (jwt, user) => {
    localStorage.setItem("token", jwt);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(jwt);
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-6 text-center">Welcome to MyDailyPanel</h2>
      <GoogleLoginButton onSuccess={handleGoogleLogin} />
    </div>
  );
};

export default Login;
