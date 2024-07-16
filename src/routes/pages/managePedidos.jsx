import { useState } from 'react';
import SideBar from '../../components/sidebar';
import PedPedidos from '../../components/pedidos/ped_pedidos';

const ManagePedidos = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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