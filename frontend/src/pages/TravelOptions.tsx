import React, { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import StaticMap from "../components/StaticMap";
import '../styles/TravelOptions.css'

export default function TravelOptions() {
    const location = useLocation();
    const navigate = useNavigate();
    const { options } = location.state || {};

    const { destination } = location.state 
    const { origin } = location.state 

const { customer_id, destination_name, distance, origin_name, duration  } = location.state;
    
    
    const confirmeRide = async (driveId: number, driverName: string, value: number) => {
        try {
        
           await api.patch('/ride/confirm', {
            customer_id: customer_id, 
            origin: origin_name,           
            destination: destination_name, 
            distance: distance,       
            duration: duration,       
            driver: {
              id: driveId,                           
              name: driverName,                      
            },
            value: value,             
          });

          
        
          navigate('/history', { state: location.state.options});

          alert('Viagem confirmada com sucesso');
        } catch (error: unknown) {
          alert('Erro ao confirmar a viagem: ' + (error as Error).message);
        }
      };
      
    

    return (
        <div className="travel-options">
            <h1>Opções de Viagem</h1>

            <StaticMap
            origin={{ lat: origin.lat, lng: origin.lng }}
            destination={{ lat: destination.lat, lng: destination.lng }}


            />
            
            <ul>
                {options.map((option: { id: number; name: string; vehicle: string; value: number, description: string, review: { rating: number, comment: string }

 }) => (
                    <li key={option.id}>
                        <h2>Motorista: {option.name}</h2>
                        <p>Descrição: {option.description}</p>
                        <p>Carro: {option.vehicle}</p>
                        <p>Avaliação: {option.review.rating}</p>
                        <p>Comentário: {option.review.comment}</p>
                        <p>Valor: {option.value}</p>
                        <button onClick={() => confirmeRide(option.id, option.name, option.value )}>Escolher</button>
                    </li>
                ))}
           </ul>
           
        </div>
    );
}