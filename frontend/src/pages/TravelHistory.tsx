import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../services/api";
import "../styles/TravelHistory.css";

interface TravelHistoryProps {
    id: number;
    date: string; // ou Date, dependendo do formato
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    value: number;
    driver: {
      id: number;
      name: string;
    };
}

export default function TravelHistory() {
    const location = useLocation();
    const [customer_id, setCustomerId] = useState("");
    const [driverId, setDriverId] = useState("");
    const [rides, setRides] = useState<TravelHistoryProps[]>([]);

    const { state } = location;

    

    const handleSearch = async () => {

        try {

            if (customer_id === '') {
                alert('Preencha o ID do cliente');
                return;
            }
        
            const response = await api.get(`/ride/${customer_id}`, {
              params: { driver_id: driverId === '' ? undefined : driverId },
            });
            setRides(response.data.rides);
          } catch (error: unknown) {
            alert('Erro ao carregar o histórico de viagens: ' + (error as Error).message);
          }
    };

    return (
        <div className="travel-history">
            <h1>Histórico de Viagens</h1>
            <form className="filter-section">
                <label>
                    ID do Cliente:
                    <input
                        type="text"
                        value={customer_id}
                        onChange={(e) => setCustomerId(e.target.value)}
                    />
                </label>
                <button type="button" onClick={handleSearch}>
                    Buscar
                </button>

                <select value={driverId} onChange={(e) => setDriverId(e.target.value)}>

                    <option value="">Mostrar todos</option>
                    {state.map((option: { id: number; name: string }) => (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    ))}
                     
                </select>
            </form>

            <ul className="ride-list">
        {rides.length > 0 ? (
          rides.map((ride) => (
            <li key={ride.id}>
              <h2>Motorista: {ride.driver.name}</h2>
              <p><strong>Data:</strong> {new Date(ride.date).toLocaleString()}</p>
              <p><strong>Origem:</strong> {ride.origin}</p>
              <p><strong>Destino:</strong> {ride.destination}</p>
              <p><strong>Distância:</strong> {ride.distance} km</p>
              <p><strong>Tempo:</strong> {ride.duration}</p>
              <p><strong>Valor:</strong> R$ {ride.value}</p>
            </li>
          ))
        ) : (
          <p>Nenhuma viagem encontrada.</p>
        )}
      </ul>
            </div>
    );
}
    