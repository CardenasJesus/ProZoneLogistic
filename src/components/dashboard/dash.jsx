import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { APIBASE } from '../../js/urls';

const Chart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Función para obtener los datos de la API
    const fetchData = async () => {
      try {
        const response = await fetch(`${APIBASE}v1/api/pedidos/weekly_count/`);
        const result = await response.json();
        
        // Procesar los datos para Recharts
        const formattedData = result.map((item) => ({
          week: `Semana ${item.week_start}`, 
          pedidos: item.pedidos_count
        }));
        
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="week" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="pedidos" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;