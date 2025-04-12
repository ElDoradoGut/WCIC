import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Topbar from "./components/topbar";
import ListaRecetas from "./views/recetas";
import Receta from "./views/receta";
import Ingredientes from "./views/ingredientes";

function App() {
  return (
    <Router>
      <div style={{ display: "flex", height: "100vh" }}>
        <Sidebar />
        <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <Topbar />
          <main style={{ flexGrow: 1, overflowY: "auto", padding: "1rem", background: "#fffafc" }}>
            <Routes>
              <Route path="/" element={<Navigate to="/Ingredientes" />} />
              <Route path="/ingredientes" element={<Ingredientes />} />
              <Route path="/recetas" element={<ListaRecetas />} />
              <Route path="/recetas/:id" element={<Receta />} />

            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App;
