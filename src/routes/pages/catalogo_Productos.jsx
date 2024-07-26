import { useState, useEffect } from 'react';
import SideBar from '../../components/sidebar';
import ProductsCard from '../../components/productos/productscard';
import FiltrosCategoria from '../../components/productos/components/filtros_categoria';
import toast, { Toaster } from 'react-hot-toast';

const CatalogoProductos = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [datas, setDatas] = useState([]);

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
    const getProductosCategoria = async (categoria) => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/v1/api/producto_categorias/${categoria}/`);
        const data = await response.json();
        if (data.length === 0) {
            toast.error('No hay productos en esta categoría');
        }else{
        setDatas(data);
        }
    }
    catch (error) {
        console.log('error', error);
    }
  }

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
          <FiltrosCategoria getProductosCategoria= {getProductosCategoria} getProductos= {getProductos}/>
        <ProductsCard Datas = {datas}/>
        <Toaster
        position='top-center'
        reverseOrder={false}
        />
         </div>
       </section>
       </>
    )}
export default CatalogoProductos;