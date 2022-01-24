//routes
import * as React from "react";
import { Routes, Route } from "react-router-dom";

import ClientAffiche from "./ClientAffiche";
import Regsiter from "./Regsiter";
import Dashboard from "./Dashboard";
import NormalClients from "../containers/Dashboard/NormalClients";
import OrthoClients from "../containers/Dashboard/OrthoClients";
const RoutesInit = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} >
      <Route path="NormalClients" element={<NormalClients/>} />
      <Route path="OrthoClients" element={<OrthoClients/>}/>
      </Route>
      <Route path="clientPage/:id" element={<ClientAffiche />} />
      <Route path="register" element={<Regsiter />} />
    </Routes>
  );
};

export default RoutesInit;
