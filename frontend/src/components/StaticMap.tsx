import { useEffect, useState } from 'react';

interface StaticMapProps {
  origin: { lat: number; lng: number }; // Coordenadas de origem
  destination: { lat: number; lng: number }; // Coordenadas de destino
}

const StaticMap = ({ origin, destination }: StaticMapProps) => {
  const [mapUrl, setMapUrl] = useState('');
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;

  useEffect(() => {
    // Constrói a URL do mapa estático com os parâmetros corretos
    const url = `https://maps.googleapis.com/maps/api/staticmap?size=600x400
      &markers=color:red|label:A|${origin.lat},${origin.lng}
      &markers=color:blue|label:B|${destination.lat},${destination.lng}
      &path=color:0x0000ff|weight:5|${origin.lat},${origin.lng}|${destination.lat},${destination.lng}
      &key=${apiKey}`;
    setMapUrl(url);
  }, [origin, destination]);

  console.log(mapUrl);

  return mapUrl ? (
    <img src={mapUrl} alt="Mapa Estático com Rota" className='map' />
  ) : (
    <p>Carregando mapa...</p>
  );
};

export default StaticMap;
