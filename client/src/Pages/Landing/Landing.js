import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Hero from "../../Containers/Hero/Hero"
import About from '../../Containers/About/About'
import Benefits from '../../Containers/Benefits/Benefits'
import Services from "../../Containers/Services/Services"
import Footer from "../../Containers/Footer/Footer"
import "./Landing.scss"

export default function Landing() {

    return (
        <>
            <Navbar />
            <Hero />
            <About />
            <Benefits />
            <Services />
            <Footer />
            <div>Landing</div>
        </>
    )
}
