import { Logout } from '../js/autenticathion';
import { useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';


// eslint-disable-next-line react/prop-types
const SideBar = ({toggleSidebar, isSidebarOpen}) => {
    const stored = JSON.parse(localStorage.getItem('user'));
    const isEmpleado = stored && stored.empleado;
    const isConductor = stored && stored.conductor;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDropdownBottomOpen, setIsDropdownBottomOpen] = useState(false);
    const [isDropOpen, setIsDropOpen] = useState(false);
    const [isDropOpenEnv, setIsDropOpenEnv] = useState(false);
    const [isDropdownPedido, setIsDropdownPedidos] = useState(false);
    const [isDropdownPrd, setIsDropdownPrd] = useState(false);
    const togglePrd = () => {
        setIsDropdownPrd(!isDropdownPrd);
    };
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const togg = () => {
        setIsDropdownBottomOpen(!isDropdownBottomOpen);
    };
    const toggPed = () => {
        setIsDropdownPedidos(!isDropdownPedido);
    }
    const toggClient = () => {
        setIsDropOpen(!isDropOpen);
    }
    const toggEnvios = () =>{
        setIsDropOpenEnv(!isDropOpenEnv);
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('#dropdown-user', ) && !event.target.closest('#user-button') && !event.target.closest('#dropUsermenu')) {
                setIsDropdownOpen(false);
            }
           
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <>
         <div className="text-center fixed bottom-0  h-full hidden sm:block justify-center content-center transition-transform duration-300 transform translate-x-[175px] sm:translate-x-0 cursor-pointer" style={{ transform: isSidebarOpen ? 'translateX(175px)' : 'translateX(0)' }}>
            <dt
                className="text-white font-medium bg-gray-200 rounded-br-3xl rounded-tr-3xl text-sm h-96 focus:outline-none  justify-center content-center"
                onClick={toggleSidebar}
               
            >
                <svg  style={{ transform: isSidebarOpen ? 'rotate(180deg)' : 'rotate(0)' }} className="w-6 h-6 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/>
                </svg>
            </dt>
        </div>
            <nav className="fixed top-0 z-40 w-full bg-white border-b border-gray-200 ">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button
                                id='userSidebar'
                                onClick={toggleSidebar}
                                type="button"
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200  "
                            >
                                <span className="sr-only">Open sidebar</span>
                                <svg
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                    ></path>
                                </svg>
                            </button>
                            <Link to={"/dashboard"} className="flex ">
                                <img src="/3.png" className="h-8 px-2" alt="Logo" />
                                <span className="self-center text-lg font-semibold sm:text-xl whitespace-nowrap text-gray-900  hidden sm:block">ProdZoneLogistic</span>
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ms-3">
                                <div className='relative cursor-pointer text-gray-900'>
                                        <AccountCircleIcon  id="user-button"
                                        onClick={toggleDropdown} />
                                </div>

                                <div id='dropUsermenu' className={`z-50 ${isDropdownOpen ? 'block' : 'hidden'} absolute mt-2 w-48 bg-white divide-y divide-gray-100 rounded shadow  top-12 right-12`}>
                                    <div className="px-4 py-3" role="none">
                                    {isEmpleado && (
                                        <div>
                                            <p>{stored.empleado.nombre} {stored.empleado.apellido}</p>
                                            <p className="text-sm font-medium text-gray-900 truncate" role="none">
                                            {stored.empleado.email}
                                            </p>
                                        </div>
                                        )}
                                        {isConductor && (
                                        <div>
                                            <p>{stored.conductor.nombre} {stored.conductor.apellido}</p>
                                            <p className="text-sm font-medium text-gray-900 truncate" role="none">
                                            {stored.conductor.email}
                                            </p>
                                        </div>
                                        )}
                                    </div>
                                    <ul className="py-1" role="none">
                                        <li>
                                            <Link
                                                to={"/dashboard"}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                                                role="menuitem"
                                                id='menuItem'
                                            >
                                                Inicio
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to={"/dashboard"}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                                                role="menuitem"
                                                id='MenuItem'
                                            >
                                                Configuracion
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to={"/dashboard"}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                                                role="menuitem"
                                                id='itemMenu'
                                            >
                                                Earnings
                                            </Link>
                                        </li>
                                        <li>
                                            <dt onClick={Logout} 
                                                className="bg-transparent w-full cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                                                role="menuitem"
                                                id='logout'
                                            >
                                              Salir
                                            </dt>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <aside
                id="logo-sidebar"
                className={`${isSidebarOpen ? 'translate-x-0' : 'hidden sm:block -translate-x-full'} fixed top-0 left-0 z-20 w-44 h-screen pt-20 transition-transform bg-white border-r border-gray-200 `}
                aria-label="Sidebar"
            >

                <div className="pb-4 overflow-y-auto bg-white ">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link
                                to={"/dashboard"}
                                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
                            >
                                <svg
                                    className="w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 22 21"
                                >
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                </svg>
                                <span className="ms-3">Inicio</span>
                            </Link>
                        </li>
                        <li>
                            <div id="dropdownBottomButton"  onClick={togglePrd} className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 cursor-pointer group"> 
                                <svg
                                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M8.5 3.5A1.5 1.5 0 1 1 10 5a1.5 1.5 0 0 1-1.5-1.5ZM6 5a2.5 2.5 0 1 1 3 2.45v4.8a1.5 1.5 0 0 1-.72 1.28L6.5 15.8V17a1.5 1.5 0 1 1-1-1.415v-2.185a1.5 1.5 0 0 1 .78-1.324l.72-.36V7.45A2.5 2.5 0 0 1 6 5Z" />
                                    <path d="M10.5 9.5a1.5 1.5 0 1 1 2 1.415v3.67a1.5 1.5 0 0 1-.78 1.324l-.72.36V17a1.5 1.5 0 1 1-1-1.415v-1.585l.78-.39v-4.11a1.5 1.5 0 0 1-.28-1.18ZM10 0a2 2 0 0 0-2 2v1h4V2a2 2 0 0 0-2-2ZM4 2a2 2 0 1 0 0 4h12a2 2 0 1 0 0-4H4Z" />
                                </svg>
                                    <p className="ms-3"> Productos </p>    
                            </div>
                            
                                {/*<!-- Dropdown menu --> */}
                            <div id="dropdownBottom" className={`z-50 ${isDropdownPrd ? 'block' : 'hidden'} bg-white divide-y divide-gray-100  w-36`}>
                                <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownBottomButton">
                                <li >
                                    <Link to={"/administrar/catalogo/productos"} className="flex items-center justify-start  w-full py-2 px-4 text-gray-800">
                                        <svg className="w-4 h-4 text-gray-800 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/>
                                        </svg>
                                        Catalogo
                                    </Link>
                                </li>
                                <li>
                                <Link to={"/administrar/productos"} className="flex items-center justify-start w-full py-2 px-4 text-gray-800">
                                        <svg className="w-4 h-4 text-gray-800 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/>
                                        </svg>Gestionar Productos</Link>
                                </li>
                                <li>
                                <Link to={"/administrar/producto/proveedor"} className="flex items-center justify-start w-full py-2 px-4 text-gray-800">
                                        <svg className="w-4 h-4 text-gray-800 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/>
                                        </svg>Proveedores</Link>
                                </li>
                                <li>
                                <Link to={"/administrar/producto/lotes"} className="flex items-center justify-start w-full py-2 px-4 text-gray-800">
                                        <svg className="w-4 h-4 text-gray-800 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/>
                                        </svg>Lotes</Link>
                                </li>
                                </ul>
                            </div>
                        </li>
                        
                        <li>
                            <div id="dropdownBottomButtonClient" onClick={toggClient} className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 cursor-pointer group"> 
                                    <svg className="w-6 h-6 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/>
                                    </svg>
                                    <p className="ms-3"> Clientes </p>    
                            </div>
                            
                                {/*<!-- Dropdown menu --> */}
                            <div id="dropdownBottomButtonClient" className={`z-50 ${isDropOpen ? 'block' : 'hidden'} bg-white divide-y divide-gray-100  w-36`}>
                                <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownBottomButton">
                                <li>
                                    <Link to={"/administrar/clientes"}  className="flex items-center justify-start w-full py-2 px-4 text-sm text-gray-800">
                                        <svg className="w-4 h-4 text-gray-800 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/>
                                        </svg>Administrar Clientes</Link>
                                </li>
                                
                                </ul>
                            </div>
                        </li>
                        <li> 
                            <div id="dropdownBottomButton" onClick={togg} className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 cursor-pointer group"> 
                                    <svg className="w-6 h-6 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/>
                                    </svg>
                                    <p className="ms-3"> Colaboradores </p>    
                            </div>
                            
                                {/*<!-- Dropdown menu --> */}
                            <div id="dropdownBottom" className={`z-50 ${isDropdownBottomOpen ? 'block' : 'hidden'} bg-white divide-y divide-gray-100  w-36 text-center`}>
                                <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownBottomButton">
                                <li>
                                <Link to={"/administrar/colaboradores"}  className="flex items-center justify-start w-full py-2 px-4 text-sm text-gray-800">
                                        <svg className="w-4 h-4 text-gray-800 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/>
                                        </svg>Administrar</Link>
                                </li>
                                
                                </ul>
                            </div>
                        </li>
                        <li> 
                            <div id="dropdownBottomButton" onClick={toggEnvios} className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 cursor-pointer group"> 
                                <svg
                                        className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 18 18"
                                    >
                                        <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0ZM6.143 9.999H1.857A1.857 1.857 0 0 0 0 11.856v4.286A1.857 1.857 0 0 0 1.857 18h4.286A1.857 1.857 0 0 0 8 16.142v-4.286a1.857 1.857 0 0 0-1.857-1.857Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.856v4.286A1.857 1.857 0 0 0 11.857 18h4.286A1.857 1.857 0 0 0 18 16.142v-4.286a1.857 1.857 0 0 0-1.857-1.857Z" />
                                    </svg>
                                    <p className="ms-3"> Envios </p>    
                            </div>
                                {/*<!-- Dropdown menu --> */}
                            <div id="dropdownBottom" className={`z-50 ${isDropOpenEnv ? 'block' : 'hidden'} bg-white divide-y divide-gray-100  w-36 text-center`}>
                                <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownBottomButton">
                                <li>
                                <Link to={"/administrar/envios"}  className="flex items-center justify-start w-full py-2 px-4 text-sm text-gray-800">
                                        <svg className="w-4 h-4 text-gray-800 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/>
                                        </svg>Monitoreo de envios</Link>
                                </li>
                                <li>
                                <Link to={"/administrar/envios/conductores"}  className="flex items-center justify-start w-full py-2 px-4 text-sm text-gray-800">
                                        <svg className="w-4 h-4 text-gray-800 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/>
                                        </svg>Conductores</Link>
                                </li>
                                <li>
                                <Link to={"/administrar/envios/vehiculos"}  className="flex items-center justify-start w-full py-2 px-4 text-sm text-gray-800">
                                        <svg className="w-4 h-4 text-gray-800 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/>
                                        </svg>Vehiculos</Link>
                                </li>
                                <li>
                                <Link to={"/administrar/envios/rutas"}  className="flex items-center justify-start w-full py-2 px-4 text-sm text-gray-800">
                                        <svg className="w-4 h-4 text-gray-800 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/>
                                        </svg>Rutas</Link>
                                </li>
                                </ul>
                            </div>
                        </li>
                        
                        <li>
                                <div id="dropdownPedidos" onClick={toggPed} className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 cursor-pointer group"> 
                                <svg
                                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M4 3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4Zm5 12H4v-2h5v2Zm7-4H4V9h12v2Zm0-4H4V5h12v2Z" />
                                </svg>
                                    <p className="ms-3"> Pedidos </p>    
                                </div>
                            <div id="dropdownBottomPedidos" className={`z-50 ${isDropdownPedido ? 'block' : 'hidden'} bg-white divide-y divide-gray-100  w-36`}>
                                <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownBottomButton">
                                <li>
                                <Link to={"/administrar/pedidos"}  className="flex items-center justify-start w-full py-2 px-4 text-sm text-gray-800">
                                        <svg className="w-4 h-4 text-gray-800 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/>
                                        </svg>Generar Pedidos</Link>
                                </li>
                                <li>
                                <Link to={"/administrar/pedidos/historial"}  className="flex items-center justify-start w-full py-2 px-4 text-sm text-gray-800">
                                        <svg className="w-4 h-4 text-gray-800 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/>
                                        </svg>Historial</Link>
                                </li>
                                </ul>
                            </div>
                        </li>                        
                    </ul>
                    <div className='w-full fixed bottom-0 text-gray-800'>
                            <dt className='flex items-center w-full p-2 text-gray-900 rounded-lg bg-transparent hover:bg-gray-100 hover:text-purple-300 cursor-pointer '>
                                <SettingsIcon sx={{width: '22px'}}/>
                                <span className='text-lg font-bold ms-3'>Settings</span>
                            </dt>
                        </div>
                </div>
            </aside>
        </>
    );
};

export default SideBar;
