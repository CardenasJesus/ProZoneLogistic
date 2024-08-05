import { useState } from 'react';
import SideBar from '../../components/sidebar';
import Dash from '../../components/dashboard/dash';

const Dasboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const US = JSON.parse(localStorage.getItem('user'));

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
        <div className='flex flex-col justify-start items-start text-start content-center py-8 bg-gray-100 rounded-3xl p-8 shadow-2xl border border-green-600'>
          <h1 className='text-4xl font-extrabold text-gray-800 mb-4'>Estadísticas de Procesos</h1>
          <span className='text-2xl font-semibold text-gray-600 mb-2'>Bienvenido {US.empleado.nombre} {US.empleado.apellido}</span>
          <p className='text-lg text-gray-500 mb-6'>
            En este apartado podrás obtener estadísticas sobre los procesos en tu distribución y analizar el rendimiento de tus operaciones.
          </p>
        </div>
          <div className='flex flex-col justify-center content-center items-center mt-12'>
            <Dash />
          </div>
        </section>
      </>
    );
}

export default Dasboard;