import React,  { useEffect } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Hero from "../../Containers/Hero/Hero"
import "./Landing.scss"

export default function Landing() {

    return (
        <>
            <Navbar />
            <Hero />
            <div>Landing</div>
        </>
    )
}
