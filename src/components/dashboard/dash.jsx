import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { BarChart, Bar } from 'recharts';
import { APIBASE } from '../../js/urls';

const Chart = () => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data4, setData4] = useState([]);
  const [total, setTotal] = useState(0);
  const [desglose, setDesglose] = useState([]);

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

    const fetchData2 = async () => {
      try {
        const response = await fetch(`${APIBASE}v1/api/pedidos/salidas_semanal/`);
        const result = await response.json();
        
        // Ajusta según el formato de los datos de tu segunda API
        const formattedData2 = result.map((item) => ({
          name: `${item.producto}`, // Ajusta si es necesario
          value: item.total_salidas
        }));
        
        setData2(formattedData2);
      } catch (error) {
        console.error("Error fetching data for chart 2: ", error);
      }
    };
    const fetchData3 = async () => {
      try {
        const response = await fetch(`${APIBASE}v1/api/pedidos/cantidad_monetaria_salidas/`);
        const result = await response.json();
        
        setTotal(result.total_general);
        setDesglose(result.desglose);
      } catch (error) {
        console.error("Error fetching monetary data: ", error);
      }
    };
    const fetchData4 = async () => {
      try {
          const response = await fetch(`${APIBASE}v1/api/pedidos/salidas_por_categoria/`);
          const result = await response.json();
          setData4(result);
      } catch (error) {
          console.error("Error fetching data for chart by category: ", error);
      }
  };

    fetchData();
    fetchData2();
    fetchData3();
    fetchData4();
  }, []);

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#d0ed57'];
  return (
    <>
      <section className='w-full grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4'>
        <div className="chart-container bg-gray-100 rounded-3xl p-8 shadow-2xl border border-yellow-600 col-span-2">
          <h1 className='bg-gray-800  w-full text-center font-bold p-4 rounded-3xl text-white mb-8'>Pedidos por semana</h1>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="pedidos" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className='w-full grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 gap-4'>
          <nav className='bg-gray-100 rounded-2xl shadow-2xl border border-purple-500 p-4'>
            <h1 className='text-2xl w-full text-center mb-2 font-black'>Salida Total de productos</h1>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={data2}
                  dataKey="value" // Campo que contiene el valor
                  nameKey="name"  // Campo que contiene el nombre
                  outerRadius={100}
                >
                  {data2.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </nav>
          <nav className='bg-gray-100 rounded-2xl shadow-2xl border border-yellow-400 p-4'>
            <h1 className='text-2xl w-full text-center mb-2 font-black'>Cantidad Monetaria de Salidas</h1>
            <h2 className='text-4xl font-black mb-4 w-full text-center py-8'>Total: ${total.toFixed(2)}</h2>
            <p className='text-lg w-full text-center'>En una seccion mas se mirara el desgloce!!</p>
          </nav>
        </div>
      </section>
      <section className='w-full'>
        <h1 className='p-4 mb-4 font-black bg-gray-100 mt-4 rounded-2xl shadow-2xl border border-blue-600 text-2xl'>Desgloce de total:</h1>
        <div className="relative overflow-x-auto p-4 mb-4 font-black bg-gray-100 mt-4 rounded-2xl shadow-2xl border border-red-600 text-2xl">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 rounded-s-lg">
              Nombre de Producto
            </th>
            <th scope="col" className="px-6 py-3">
              Qty
            </th>
            <th scope="col" className="px-6 py-3 rounded-e-lg">
              Precio
            </th>
          </tr>
        </thead>
        <tbody>
          {desglose.map((item, index) => (
            <tr key={index} className="bg-white dark:bg-gray-800">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {item.prducto__nombre_producto}
              </th>
              <td className="px-6 py-4">
                {item.total_cantidad}
              </td>
              <td className="px-6 py-4">
                ${item.total_monetario.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="font-semibold text-gray-900 dark:text-white">
            <th scope="row" className="px-6 py-3 text-base">Total</th>
            <td className="px-6 py-3">{desglose.reduce((acc, item) => acc + item.total_cantidad, 0)}</td>
            <td className="px-6 py-3">${total.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
      </section>
      <div className="bg-gray-100 rounded-3xl p-8 shadow-2xl border border-purple-500 w-full">
            <h1 className='bg-gray-800 w-full text-center font-bold p-4 rounded-3xl text-white mb-8'>
                Salidas por Categoría
            </h1>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data4}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="categoria" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="total_salida" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </>
    
  );
};

export default Chart;