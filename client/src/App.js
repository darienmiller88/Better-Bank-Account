import './App.css';
import Signin  from "./Pages/Signin/Signin"
import Signup from "./Pages/Signup/Signup"
import Dashboard from './Pages/Dashboard/Dashboard';
import Landing from './Pages/Landing/Landing';
import { BrowserRouter, Routes, Route } from "react-router-dom"

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/"          element={<Landing />}/>
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route exact path="/signin"    element={<Signin />} />
                <Route exact path="/signup"    element={<Signup />} />
            </Routes>
        </BrowserRouter>
    );
}
