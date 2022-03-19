import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '@layouts/index';
import Landing from '@assets/landing.jpeg';

const App = () => (
  <Routes>
    <Route exact path="/" element={<img src={Landing} style={{ width: '100vw' }} />} />
    <Route path="/company/:companyName" element={<Dashboard />} />
  </Routes>
);

export default App;
