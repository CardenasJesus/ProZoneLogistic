import { Link } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import CheckIcon from '@mui/icons-material/Check';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import { useEffect, useState } from "react";
import axios from "axios";

const ITEMS_PER_PAGE = 5; // Ajusta el número según tus necesidades


const Main = () =>{
    const [Envios, setEnvios] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    // Calcular el índice inicial y final para la página actual
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    // Obtener los envíos para la página actual
    const paginatedEnvios = Envios.slice(startIndex, endIndex);

    // Calcular el número total de páginas
    const totalPages = Math.ceil(Envios.length / ITEMS_PER_PAGE);

    // Función para cambiar la página
    const goToPage = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/v1/api/envios/entregados')
        .then(response => {
            setEnvios(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }, []);
    if (Envios === undefined || Envios.length === 0) {
        return <div role="status">
            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin  fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    }
    const getStepClass = (step, currentStatus) => {
        const statusSteps = {
            'enviado': 1,
            'en progreso': 2,
            'entregado': 3
        };
    
        const currentStep = statusSteps[currentStatus];
        if (step < currentStep) return 'text-green-500'; // Paso completado
        if (step === currentStep) return 'text-blue-600'; // Paso actual
        return 'text-gray-500'; // Paso no completado
    };
    
    
    return(
        <>
        <div className="bg-gray-100 p-4 rounded-2xl shadow-xl mt-12"><h1 className="font-bold text-2xl sm:text-4xl p-2 tracking-tighter">Finalizados ({Envios.length})</h1></div>
       <section>
        <nav className="grid  lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-8">
        {paginatedEnvios.map((envio) => (
                <Link  key={envio.id}
                    className="group relative block justoify-center items-center h-[450px]">
                    <span className="absolute inset-0 border-2 border-dashed border-gray-200"></span>

                    <div
                        className="relative flex h-full w-full transform justify-center text-center items-center border-2 border-gray-200 bg-white transition-transform group-hover:scale-105 shadow-xl"
                    >
                        <div
                        className="p-6 transition-opacity group-hover:absolute group-hover:opacity-0 w-full justify-center">
                        <SendIcon  className="text-orange-600"/>
                        <h2 className="mt-4 text-xl font-medium sm:text-2xl py-2 text-gray-600">Envio No. {envio.id}</h2>
                        <h2 className="font-semibold mb-8 text-emerald-700">{envio.descripcion}</h2>
                            <ol className="flex justify-center items-center text-center content-center w-full ml-8">
                                <li className={`flex w-full items-center ${getStepClass(1, envio.status)} after:content-[''] after:w-full after:h-1 after:border-b ${getStepClass(1, envio.status) === 'text-green-500' ? 'after:border-green-500' : getStepClass(1, envio.status) === 'text-blue-600' ? 'after:border-blue-600' : 'after:border-gray-500'} after:border-4 after:inline-block`}>
                                    <span className={`flex items-center justify-center w-6 h-6 ${getStepClass(1, envio.status)} rounded-full lg:h-8 lg:w-8 shrink-0`}>
                                        <CheckIcon className={`flex ${getStepClass(1, envio.status)}`} />
                                    </span>
                                </li>
                                <li className={`flex w-full items-center ${getStepClass(2, envio.status)} after:content-[''] after:w-full after:h-1 after:border-b ${getStepClass(2, envio.status) === 'text-green-500' ? 'after:border-green-500' : getStepClass(2, envio.status) === 'text-blue-600' ? 'after:border-blue-600' : 'after:border-gray-500'} after:border-4 after:inline-block`}>
                                    <span className={`flex items-center justify-center w-10 h-10 ${getStepClass(2, envio.status)} rounded-full lg:h-8 lg:w-8 shrink-0`}>
                                        <DirectionsCarIcon className={`flex ${getStepClass(2, envio.status)}`} />
                                    </span>
                                </li>
                                <li className={`flex items-center w-full ${getStepClass(3, envio.status)}`}>
                                    <span className={`flex items-center justify-center w-10 h-10 ${getStepClass(3, envio.status)} rounded-full lg:h-8 lg:w-8 shrink-0`}>
                                        <BeenhereIcon className={`flex ${getStepClass(3, envio.status)}`} />
                                    </span>
                                </li>
                            </ol>
                            <div className="grid grid-cols-3 gap-4 justify-center text-center items-center mt-2">
                                <p className="text-xs font-mono text-gray-400">Preparacion</p>
                                <p className="text-xs font-mono text-gray-400">En Camino</p>
                                <p className="text-xs font-mono text-gray-400">Entregado</p>
                            </div>
                            <div>
                                <p className="text-xs font-mono text-gray-400 mt-4">Estado del envio: <span className="text-gray-500 font-semibold">{envio.status}</span></p>
                            </div>
                            
                        </div>

                        <div className="absolute p-8 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 w-80">
                        <div className="flex justify-end"> <h3 className="text-sms font-medium sm:text-md">Pedido: {envio.pedido}</h3></div>
                        <h3 className="text-sms font-medium sm:text-md text-red-500 mt-2 text-center text-clip">{envio.descripcion}</h3>
                        <p className="mt-4 text-sm sm:text-base flex flex-col justify-center text-center items-center">
                            <span className="font-bold text-black">Observaciones:</span>
                            <span className="text-gray-500">{envio.observaciones}</span>
                        </p>
                        <div className="grid lg:grid-col-2 md:grid-col-2 sm:grid-col-2 gap-2">
                            <p className="mt-4 text-sm sm:text-base flex flex-col justify-center text-center items-center">
                                <span className="font-bold text-black">Fecha del envio:</span>
                                <span className="text-gray-500">{envio.fecha_envio}</span>
                            </p>
                            <p className="mt-4 text-sm sm:text-base flex flex-col justify-center text-center items-center">
                                <span className="font-bold text-black">Fecha de Entrega:</span>
                                <span className="text-gray-500">{envio.fecha_entrega}</span>
                            </p>
                        </div>
                        <p className="mt-4 text-sm sm:text-base flex flex-col justify-center text-center items-center">
                            <span className="font-bold text-black">Nombre de la ruta:</span>
                            <span className="text-gray-500">{envio.ruta.nombre_ruta}</span>
                        </p>
                        <p className="mt-4 text-sm sm:text-base flex flex-col justify-center text-center items-center">
                            <span className="font-bold text-black">Conductor asignado</span>
                            <span className="text-gray-500">{envio.conductor.nombre} {envio.conductor.apellido}</span>
                        </p>
                        </div>
                    </div>
                </Link>
            ))}
        </nav>
          {/* Botones de Paginación */}
          <div className="flex justify-center mt-8">
                <button
                    className="px-4 py-2 mx-1 hover:bg-gray-300 cursor-pointer bg-transparent"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7"/>
                    </svg>
                </button>
                {[...Array(totalPages).keys()].map((page) => (
                    <button
                        key={page + 1}
                        className={`px-4 py-2 mx-1 rounded ${currentPage === page + 1 ? 'text-gray-900' : 'bg-gray-200 text-gray-600'} hover:bg-gray-300`}
                        onClick={() => goToPage(page + 1)}
                    >
                        {page + 1}
                    </button>
                ))}
                <button
                    className="px-4 py-2 mx-1 hover:bg-gray-300 cursor-pointer bg-transparent"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                   <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/>
                    </svg>
                </button>
            </div>
       </section>
        </>
    )
}

export default Main;