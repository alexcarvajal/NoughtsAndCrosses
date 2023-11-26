import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './routes/Login.tsx'
import SignUp from './routes/SignUp.tsx'
import ProtectedRoute from './routes/ProtectedRoute.tsx'
import DashBoard from './routes/DashBoard.tsx'
import './index.css'
import { AuthProvider } from './auth/AuthProvider.tsx'

const router = createBrowserRouter(
  [{
    path: "/",
    element: <Login />,

  },
  {
    path: "/signup",
    element: <SignUp />,
  },

  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <DashBoard />
      }
    ],
  }
  ])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
