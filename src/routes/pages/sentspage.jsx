import { useState } from 'react';
import SideBar from '../../components/sidebar';
import Main from '../../components/envios/main';
import ManageEnvios from '../../components/envios/manageEnvios';
import EnviosPendientes from '../../components/envios/enviosEnprogreso';

const AdminPage = () => {

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
          <section className={`p-4 mt-12 transition-all duration-300 ${isSidebarOpen ? 'sm:ml-52' : 'sm:ml-0'}`} >
            <div className='flex flex-col justify-center content-center items-center'>
                <ManageEnvios />
                <Main />
                <EnviosPendientes/>
            </div>
          </section>
        </>
      );
    }

    export default AdminPage;