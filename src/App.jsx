import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Survey from './pages/Survey';
import Insights from './pages/Insights';
import BarrierAnalysis from './pages/BarrierAnalysis';
import Interventions from './pages/Interventions';
import Impact from './pages/Impact';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/barriers" element={<BarrierAnalysis />} />
          <Route path="/interventions" element={<Interventions />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
