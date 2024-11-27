import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TravelRequest from '../pages/TravelRequest';



export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<TravelRequest />} />
            </Routes>
        </BrowserRouter>  
    );  
}