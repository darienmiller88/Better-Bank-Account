import React, { useEffect } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Hero from "../../Containers/Hero/Hero"
import About from '../../Containers/About/About'
import Benefits from '../../Containers/Benefits/Benefits'
import Services from "../../Containers/Services/Services"
import Footer from "../../Containers/Footer/Footer"
import { userApi } from "../../Components/API/API"
import { useNavigate } from "react-router-dom";

export default function Landing() {
    const navigate = useNavigate()

    // Redirect the user back to the dashboard if they are logged in and try to access the sign in/sign up page.
     useEffect(() => {
        userApi.get("/checkauth")
        .then(() => {
            navigate("/dashboard")
        })
        .catch(error => console.log("error:", error.response))
    }, [])
    
    return (
        <>
            <Navbar />
            <Hero />
            <About />
            <Benefits />
            <Services />
            <Footer />
        </>
    )
}
