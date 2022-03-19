import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '@layouts/index';

const App = () => (
  <Routes>
    <Route path="/company/:companyName" element={<Dashboard />} />
  </Routes>
);

export default App;
