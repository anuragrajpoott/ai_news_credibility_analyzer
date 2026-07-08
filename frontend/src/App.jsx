import { Route, Routes } from "react-router-dom";
import React from "react";

import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950">
      <Nav />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;