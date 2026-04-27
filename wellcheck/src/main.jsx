import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import BodySmart from './BodySmart.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/bodysmart" element={<BodySmart />} />
        <Route path="/mindcheck" element={<MindCheck />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
