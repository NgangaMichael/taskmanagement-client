import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Tasks from '../pages/Tasks';

const AppRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Tasks />} />
    </Routes>
  );
};

export default AppRoutes;
