import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setProfile(JSON.parse(stored));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("preferences");
    window.location.href = "/login";
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold">MyDailyPanel</h1>
        <Link to="/">Dashboard</Link>
        <Link to="/settings">Settings</Link>
        <Link to="/ai-tools">AI Tools</Link>
      </div>
      <div className="flex items-center gap-3">
        {profile && (
          <>
            <span className="hidden sm:inline text-sm">{profile.name}</span>
            <img
              src={profile.picture}
              alt="avatar"
              className="w-8 h-8 rounded-full border"
            />
          </>
        )}
        <button
          className="px-2 py-1 border rounded dark:border-white border-black text-xs"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
