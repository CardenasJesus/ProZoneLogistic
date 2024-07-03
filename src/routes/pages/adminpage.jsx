import { useState } from 'react';
import SideBar from '../../components/sidebar';
import Main from '../../components/services/sent/main';

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
            <div className='flex justify-center content-center items-center'>
                <Main />
            </div>
          </section>
        </>
      );
    }

    export default AdminPage;