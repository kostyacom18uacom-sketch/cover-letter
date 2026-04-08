import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import CreatePage from './pages/CreatePage.jsx'
import ViewerPage from './pages/ViewerPage.jsx'
import CruxCursor from './components/CruxCursor.jsx'

export default function App() {
  return (
    <>
      <CruxCursor />
      <Routes>
        <Route path="/create" element={<CreatePage />} />
        <Route path="/:company" element={<ViewerPage />} />
        <Route path="*" element={<Navigate to="/create" replace />} />
      </Routes>
    </>
  )
}
