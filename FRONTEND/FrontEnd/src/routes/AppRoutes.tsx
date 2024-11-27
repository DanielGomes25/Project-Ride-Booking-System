import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TravelRequest from '../pages/TravelRequest';
import TravelOptions from '../pages/TravelOptions';



export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<TravelRequest />} />
            <Route path="/options" element={<TravelOptions />} />
            </Routes>
        </BrowserRouter>  
    );  
}