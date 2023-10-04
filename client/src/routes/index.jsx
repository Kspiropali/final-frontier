import React, { useEffect } from "react"
import { Navigate, Outlet } from "react-router-dom"

import { useAuth } from "../contexts/AuthContext"

export default function ProtectedRoute({ redirectTo }) {
    // const { isLoggedIn, setIsLoggedIn } = useAuth()

    // async function checkAuth(){
    //     const response = await fetch("/users/ping", {method: "POST"})
    //     if(response.status == 200) {
    //       console.log(`logged in as ${response}`)
    //       setIsLoggedIn(true)
    //     } else {
    //       console.log(response.status)
    //       setIsLoggedIn(false)
    //     }
    // }

    // useEffect(() => {
    //     checkAuth()
    // }, [])

    // IF YOU NEED TO TURN OFF THE ROUTE PROTECT UNCOMMENT LINE 25 and COMMENT OUT LINE 7-22 & 27
    return <Outlet/>

    // return isLoggedIn ? <Outlet /> : <Navigate to={redirectTo} />
}
