import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '@layouts/index';
// import Landing from '@assets/landing.jpeg';
import Landing from './layouts/Landing';
import Comparison from './layouts/comparison';

const App = () => (
  <Routes>
    <Route exact path="/" element={<Landing />} />
    <Route path="/company/:companyName" element={<Dashboard />} />
    <Route path="/comparison/:companyName1/:companyName2" element={<Comparison />} />
  </Routes>
);

export default App;
