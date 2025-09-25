import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TravelRequest.css';
import api from '../services/api';

export default function TravelRequest() {
  const [customerId, setCustomerId] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  
  
  const navigate = useNavigate();

  const handleEstimate = async () => {
    if (customerId === '' || origin === '' || destination === '') {
      alert('Preencha todos os campos');
      return;
    }

    try {

      const response = await api.post('/ride/estimate', {
        customer_id: customerId,
        origin,
        destination,
      });


      navigate('/options', { 
        state: {
          ...response.data,
          customer_id: customerId,
          origin_name: origin,
          destination_name: destination
        }
      });
      

    } catch (error: unknown) {
    
      if (error instanceof Error) {
        alert('Erro ao calcular estimativa: ' + (error.message));
      } else {
        alert('Erro desconhecido');
      }
    }
  };

  return (
    <div className="travel-request">
      <h1>Solicitação de Viagem</h1>
      <form>
        <label>
          ID do Cliente:
          <input
            type="text"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
          />
        </label>
        <label>
          Origem:
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />
        </label>
        <label>
          Destino:
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleEstimate}>
          Calcular Estimativa
        </button>
      </form>
    </div>
  );
}
