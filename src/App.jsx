import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import { LinearProgress } from '@mui/material'


const Overview = lazy(() => import('./pages/Overview'))
const EvTable = lazy(() => import('./pages/EvTable'))
const MapView = lazy(() => import('./pages/MapView'))
const About = lazy(() => import('./pages/About'))


export default function App() {
  return (
    <AppShell>
      <Suspense fallback={<LinearProgress />}>
        <Routes>
          <Route path="/" element={<Navigate to="/overview" replace />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/ev-data" element={<EvTable />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/overview" replace />} />
        </Routes>
      </Suspense>
    </AppShell>
  )
}