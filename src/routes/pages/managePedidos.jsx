import { useState } from 'react';
import SideBar from '../../components/sidebar';
import PedPedidos from '../../components/pedidos/ped_pedidos';
// import {CreateModalPedidos} from '../../components/pedidos/modales/modal';

const ManagePedidos = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

   
    // const getUsers = async () => {
    //     try {
    //         const response = await fetch('http://127.0.0.1:8000/v1/api/employees/');
    //         const data = await response.json();
    //         console.log('data', data);
    //         setDatas(data);
    //     }
    //     catch (error) {
    //         console.log('error', error);
    //     }
    //   }
    //   useEffect(() => {
    //     getUsers();
    //   }, []);
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
         <div className='flex justify-center content-center items-center'>
         <PedPedidos />
         
         </div>
        
       </section>
       </>
    )}

    export default ManagePedidos;