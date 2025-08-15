
import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssBaseline } from '@mui/material'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import BuilderPage from './pages/BuilderPage'
import PreviewPage from './pages/PreviewPage'
import './styles/index.css'
import { ResumeProvider } from './context/ResumeContext'

const router = createBrowserRouter([
  { path: '/', element: <App />,
    children: [
      { index: true, element: <BuilderPage /> },
      { path: 'preview', element: <PreviewPage /> },
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssBaseline />
    <ResumeProvider>
      <RouterProvider router={router} />
    </ResumeProvider>
  </React.StrictMode>
)
