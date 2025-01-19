import React, { useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { logo } from "./assets";
import { Home, CreatePost, LoginRegister } from "./pages";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token && userId) {
      fetchUserData(userId);
      setIsAuthenticated(true);
    }
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        console.error("Failed to fetch user data. Status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
    setUser(null);
    window.location.href = "/";
  };

  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-[#1a1b26] text-white sm:px-8 px-4 py-2 border-b border-b-[#2d2d3a]">
        {/* Logo Section */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="logo" className="h-[5vh] object-contain" />
          <h2 className="ml-3 text-2xl font-bold text-[#8c93ff]">
            NeuralArt AI
          </h2>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden sm:flex items-center gap-5">
          {isAuthenticated ? (
            <>
              <button
                className="bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-all"
                onClick={() => {}}
              >
                Credits: {user.credits}
              </button>
              <Link
                to="/create-post"
                className="bg-[#4c51c6] text-white py-2 px-4 rounded-md hover:bg-[#3b3fa3] transition-all"
                aria-label="Create Post"
              >
                Create
              </Link>
            </>
          ) : (
            <></>
          )}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-[#e63946] text-white py-2 px-4 rounded-md hover:bg-[#c7353f] transition-all"
              aria-label="Logout"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login-register"
              className="bg-[#3a8b2f] text-white py-2 px-4 rounded-md hover:bg-[#3f9434] transition-all"
              aria-label="Login"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu */}
        <div className="sm:hidden relative">
          <button
            className="text-white text-2xl focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            ☰
          </button>
          <div className="absolute top-full right-0 bg-[#1a1b26] text-white shadow-lg rounded-md overflow-hidden">
            <Link
              to="/create-post"
              className="block px-4 py-2 hover:bg-[#2d2d3a]"
              aria-label="Create Post"
            >
              Create
            </Link>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-[#2d2d3a]"
                aria-label="Logout"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login-register"
                className="block px-4 py-2 hover:bg-[#2d2d3a]"
                aria-label="Login"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Section with gradient background */}
      <main className="sm:p-8 px-4 py-8 w-full min-h-screen bg-gradient-to-b from-[#1a1b26] via-[#24273a] to-[#1a1b26]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost user={user} setUser={setUser}/>} />
          <Route path="/login-register" element={<LoginRegister />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
