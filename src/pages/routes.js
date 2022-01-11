import * as React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";

import ClientAffiche from './ClientAffiche'
const RoutesInit=()=> {
  return (
      <Routes>
        <Route path="/" element={<p>dashboard here</p>} />
        <Route  path="clientPage/:id" element={<ClientAffiche />} />
      </Routes>
  );
}

export default RoutesInit ;