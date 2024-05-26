import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/routes';

export default function App() {
  return (
    <>
      <Router>
        <AppRoutes />
      </Router>
    </>
  );
}
