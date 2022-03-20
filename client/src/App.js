import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '@layouts/index';
// import Landing from '@assets/landing.jpeg';
import Landing from './layouts/Landing';

const App = () => (
  <Routes>
    <Route exact path="/" element={<Landing />} />
    <Route path="/company/:companyName" element={<Dashboard />} />
  </Routes>
);

export default App;
