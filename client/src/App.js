import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CompanyDashboard from '@layouts/companyDashboard';

const App = () => (
  <Routes>
    <Route path="/company/:companyName" element={<CompanyDashboard />} />
  </Routes>
);

export default App;
