import * as React from "react";
import { Routes, Route } from "react-router-dom";

import ClientAffiche from "./ClientAffiche";
import Regsiter from "./Regsiter";
import Dashboard from "./Dashboard";

const RoutesInit = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="client/:id" element={<ClientAffiche />} />
      <Route path="register" element={<Regsiter />} />
    </Routes>
  );
};

export default RoutesInit;
