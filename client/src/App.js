import './App.css';
import Signin  from "./Pages/Signin/Signin"
import Signup from "./Pages/Signup/Signup"
import Dashboard from './Pages/Dashboard/Dashboard';
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/"       element={<Dashboard />} />
                <Route exact path="/signin" element={<Signin />} />
                <Route exact path="/signup" element={<Signup />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
