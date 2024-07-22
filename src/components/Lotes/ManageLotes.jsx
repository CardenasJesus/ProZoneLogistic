import { UpdateModalLotes, DetailsModal } from "./modales/modal";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

const ManageLotes = ({Lotes}) => {
    const [open, setOpen] = useState(false);
    const [openD, setOpenD] = useState(false);
    const [selectedLotes, setSelectedLotes] = useState({});
    const handleCloseDetail = () => setOpenD(false)
    const handleOpenD = () => setOpenD (true)
    const handleOpenLot = () => setOpen(true);
    const handleCloseLot = () => setOpen(false);
    const handleSelect = (user) => {
        setSelectedLotes(user);
        handleOpenLot();
    }
    const handleSelectDetail =(user) =>{
        setSelectedLotes(user)
        handleOpenD()
    }
    
    
    if (Lotes === undefined || Lotes.length === 0) {
        return <div role="status">
            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin  fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    };
    return (
        <>
        <UpdateModalLotes 
            open={open}
            handleOpen={handleOpenLot}
            handleClose={handleCloseLot}
            selectedLotes={selectedLotes}
        />
        <DetailsModal 
            openD={openD}
            handleOpen={handleOpenD}
            handleCloseDetail={handleCloseDetail}
            selectedLotes={selectedLotes}
        />
         <Toaster
        position="top-center"
        reverseOrder={false}
        />
          <section className="w-full">
            <div className="bg-gray-200 shadow-md rounded-bl-2xl rounded-tr-2xl w-fit"><h1 className="font-bold text-2xl p-4 text-gray-500">Gestionar Lotes</h1></div>
            <div className="p-4">
                <div className="relative grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                                {Lotes.map((data) => (
                                    <div key={data.id} className="odd:bg-white  even:bg-gray-200/50  border-b border-2 rounded-3xl shadow-xl hover:bg-gray-400 hover:text-white group">
                                         <nav className="px-6 py-4 grid grid-cols-2 justify-between content-center">
                                            <div className="font-black text-lg text-start">
                                                No. {data.id}
                                            </div>
                                            <div className="font-black text-lg text-end">
                                                <button value={data.id} onClick={() =>{handleSelect(data)}} className="group-hover:text-gray-100 font-medium text-blue-600 bg-transparent hover:underline w-fit">
                                                    <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                                                    </svg>
                                                </button>
                                                
                                            </div>
                                        </nav>
                                        <dt className="px-6 py-4 font-medium  whitespace-nowrap  text-center">
                                        {data.nombre_lote} 
                                        </dt>
                                        <dt className="px-6 py-4 text-center">
                                            {data.descripcion_lote}
                                        </dt>
                                        <dt className="px-6 py-4 text-center">
                                           Stock: {data.existencia_lote}
                                        </dt>
                                        <dt className="px-6 py-4 text-center">
                                           Peso: {data.peso} kg
                                        </dt>
                                        <dt className="px-6 py-4 text-center">
                                           Precio: ${data.precio_lote} 
                                        </dt>
                                        <dt className="px-6 py-4 text-center">
                                           Fecha de ingreso: {data.fecha_entrada} 
                                        </dt>
                                        <dt className="px-6 py-4 text-center">
                                           <button value={data.id} onClick={() =>{handleSelectDetail(data)}} className="underline text-blue-500 bg-transparent group-hover:text-gray-100">
                                            ver mas
                                           </button>
                                        </dt>
                                    </div>
                                ))}
                </div>
            </div>
          </section>
        </>
    );
}
export default ManageLotes;