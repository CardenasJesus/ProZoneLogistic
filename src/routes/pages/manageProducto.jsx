import { useEffect, useState } from "react";
import SideBar from "../../components/sidebar";
import ManagePedidos from "../../components/productos/manageProduct"
import {CreateModal} from "../../components/productos/modales/modal"

const ManageProductos = () =>{
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [datas, setDatas] = useState([]);
    const [openC, setOpenC] = useState(false);
    const handleOpenProducto = () => setOpenC(true);
    const handleCloseProducto = () => setOpenC(false);
    const getProductos = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/v1/api/products/');
            const data = await response.json();
            setDatas(data);
        }
        catch (error) {
            console.log('error', error);
        }
      }
      useEffect(() => {
        getProductos();
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
          <ManagePedidos productos={datas}/>
          <CreateModal
            openC={openC}
            handleOpenProducto={handleOpenProducto}
            handleCloseProducto={handleCloseProducto }
            getProductos={getProductos}
        />
         </div>
         <div data-dial-init className="fixed end-6 bottom-6 group">
                <button type="button" onClick={handleOpenProducto} data-dial-toggle="speed-dial-menu-square" aria-controls="speed-dial-menu-square" aria-expanded="false" className="flex items-center justify-center text-white bg-blue-700 rounded-lg w-14 h-14 hover:bg-blue-800  focus:outline-none ">
                    <svg className="w-5 h-5 transition-transform group-hover:rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                    </svg>
                    <span className="sr-only">Open Create Forms</span>
                </button>
            </div>
       </section>
       </>
    )
}

export default ManageProductos;