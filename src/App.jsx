import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import MovieDetailPage from './pages/MovieDetailPage.jsx';

function App() {
  return (
    <Routes>
      <Route path="/movie" element={<MovieDetailPage />} />
    </Routes>
  );
}

export default App;