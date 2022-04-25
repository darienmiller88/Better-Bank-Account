import React, {useEffect} from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Hero from "../../Containers/Hero/Hero"
import About from '../../Containers/About/About'
import Benefits from '../../Containers/Benefits/Benefits'
import Services from "../../Containers/Services/Services"
import Footer from "../../Containers/Footer/Footer"
import "./Landing.scss"
import { base } from "../../Components/BaseUrl/BaseUrl"
import axios from "axios"

export default function Landing() {
    useEffect(() => {
        axios.get(`${base}/api/v1/users`).then(res => console.log(res.data))
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
