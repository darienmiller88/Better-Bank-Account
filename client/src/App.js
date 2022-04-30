import './App.scss';
import Dashboard from './Pages/Dashboard/Dashboard';
import Landing from './Pages/Landing/Landing';
import Test from "./Pages/Test/Test"
import InternalServerError from './Pages/InternalServerError/InternalServerError';
import { BrowserRouter, Routes, Route } from "react-router-dom"

export default function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/"          element={<Landing />}/>
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route exact path='/test'      element={<Test />} />
            </Routes>
        </BrowserRouter>
    );
}
