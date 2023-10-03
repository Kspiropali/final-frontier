import React from "react"
import { Navigate, Outlet } from "react-router-dom"

import { useAuth } from "../contexts/AuthContext"

export default function ProtectedRoute({ redirectTo }) {
    const { isLoggedIn } = useAuth()
    return isLoggedIn ? <Outlet /> : <Navigate to={redirectTo} />
}
