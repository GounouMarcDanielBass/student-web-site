import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./elements/Home";
import Create from "./elements/Create";
import Edit from "./elements/Edit";
import Read from "./elements/Read";
import CustomResearch from "./elements/customresearch";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/read/:id" element={<Read />} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="/create" element={<Create />} />
      <Route path="/custom_search" element={<CustomResearch/>} />
    </Routes>
  );
}

export default App;
