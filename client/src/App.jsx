import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import { logo } from "./assets";
import { Home, CreatePost } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-[#1e1e2e] text-white sm:px-8 px-4 py-2 border-b border-b-[#2d2d3a]">
        <Link to="/" className="flex">
          <img src={logo} alt="logo" className="h-[5vh] object-contain" />
          <div className="flex justify-center items-center">
            <h2 className="text-2xl font-bold text-[#8c93ff]">NeuralArt AI</h2>
          </div>
        </Link>

        <Link to='/create-post'
          className="bg-[#4c51c6] text-white py-2 px-4 rounded-md hover:bg-[#3b3fa3]">
          Create
        </Link>
      </header>

      <main className="sm:p-8 px-4 py-8 w-full bg-black text-white min-h-[calc(100vh - 73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
