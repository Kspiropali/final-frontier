import React, { useEffect } from "react"
import { Navigate, Outlet } from "react-router-dom"

import { useAuth } from "../contexts/AuthContext"

export default function ProtectedRoute({ redirectTo }) {
    const { isLoggedIn, setIsLoggedIn } = useAuth()

    async function checkAuth(){
        const response = await fetch("/users/ping", {method: "POST"})
        if(response.status == 200) {
          console.log(`logged in as ${response}`)
          setIsLoggedIn(true)
        } else {
          console.log(response.status)
          setIsLoggedIn(false)
        }
    }

    useEffect(() => {
        checkAuth()
    }, [])

    return isLoggedIn ? <Outlet /> : <Navigate to={redirectTo} />
}
