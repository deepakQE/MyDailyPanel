import { useEffect } from "react";

const GoogleLoginButton = ({ onSuccess }) => {
  useEffect(() => {
    /* global google */
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: async (response) => {
        const res = await fetch("/api/auth/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: response.credential })
        });

        const data = await res.json();
        if (data.token) onSuccess(data.token, data.user);
      }
    });

    window.google.accounts.id.renderButton(
      document.getElementById("google-signin"),
      { theme: "outline", size: "large" }
    );
  }, []);

  return <div id="google-signin"></div>;
};

export default GoogleLoginButton;
