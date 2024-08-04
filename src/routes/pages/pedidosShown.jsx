import HistorialPed from "../../components/pedidos/historialPed";
import SideBar from "../../components/sidebar";
import { useEffect, useState } from "react";
import { APIBASE } from "../../js/urls";
const PedidosShown = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [datas, setDatas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const getHistorial = async () => {
        try {
            // http://127.0.0.1:8000/v1/api/pedidos/
            const response = await fetch(`${APIBASE}v1/api/pedidos/`);
            const data = await response.json();
            setDatas(data);
            setLoading(false);
        }
        catch (error) {
            console.log('error', error);
            setError(error);
            setLoading(false);
        }
      }
      useEffect(() => {
        getHistorial();
      }, []);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <>
        <SideBar
            toggleSidebar= {toggleSidebar}
            isSidebarOpen = {isSidebarOpen}
        />
        <section className={`p-4 mt-20 transition-all duration-300 ${isSidebarOpen ? 'sm:ml-52' : 'sm:ml-0'}`} >
            <div className='flex flex-col justify-center content-center items-center'>
                <HistorialPed Datas={datas} loading={loading} error={error} />
            </div>
        </section>
         
        </>
    );
    }

export default PedidosShown;