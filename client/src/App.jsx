import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Updateuser from "./pages/Updateuser.jsx";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/updateUser/:slug" element={<Updateuser />} />
      </Routes>
    </>
  );
}

export default App;
