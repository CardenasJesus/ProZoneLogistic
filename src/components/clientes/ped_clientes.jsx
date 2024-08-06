import { UpdateModalClientes } from "./modales/modal";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { APIBASE } from "../../js/urls";

const PedClientes = ({Datas}) => {
    const [open, setOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState({});
    const [statuses, setStatuses] = useState([]);
    const handleOpenClientesUpd = () => setOpen(true);
    const handleCloseClientesUpd = () => setOpen(false);
    useEffect(() => {
        if (Datas && Datas.length > 0) {
            setStatuses(Datas.map(item => item.status));
        }
    }, [Datas]);
    const handleSelect = (user) => {
        setSelectedClient(user);
        handleOpenClientesUpd();
    }
    const handleStatusChange = (index) => {
        const updatedStatuses = [...statuses];
        updatedStatuses[index] = !statuses[index];
        setStatuses(updatedStatuses);
        
        const statusToSend = updatedStatuses[index];
        
        fetch(`${APIBASE}v1/api/clients/update/status/${Datas[index].id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: statusToSend })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Status updated successfully:", data);
            toast.success('Status updated successfully');
        })
        .catch((error) => {
            console.error("Error updating status:", error);
        });
    };
    
    if (Datas === undefined || Datas.length === 0) {
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
        <UpdateModalClientes 
            open={open}
            handleOpen={handleOpenClientesUpd}
            handleClose={handleCloseClientesUpd}
            selectedUser={selectedClient}
        />
         <Toaster
        position="top-center"
        reverseOrder={false}
        />
          <section className="w-full">
            <div className="bg-green-500 shadow-md rounded-bl-2xl rounded-tr-2xl w-fit"><h1 className="font-bold text-2xl p-4 text-gray-100">Gestionar Clientes</h1></div>
            <div className="p-4">
                <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-green-200">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Nombre
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Telefono
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Direccion
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Actualizar
                                </th>
                                <th scope="col" className="px-6 py-3 flex justify-center col-span-2">
                                    Ajustar estatus
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                                {Datas.map((data, index) => (
                                    <tr key={data.id} className="odd:bg-white  even:bg-gray-50  border-b ">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap  text-center">
                                        {data.nombre_cliente} {data.apellido_cliente}
                                        </th>
                                        <td className="px-6 py-4 text-center">
                                            {data.email}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {data.telefono}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {data.calle}, {data.num_exterior}, {data.colonia}, {data.codigo_postal}
                                        </td>
                                        <td className="px-6 py-4 grid grid-cols-1 justify-center items-center text-center content-center">
                                            <div className="">
                                                <button value={data.id} onClick={() =>{handleSelect(data)}} className="font-medium text-blue-600 bg-transparent hover:underline w-fit">
                                                    <svg className="w-6 h-6 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                                                    </svg>
                                                </button>
                                                
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                        <div className="font-medium text-blue-600 bg-transparent hover:underline w-full">
                                            <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={statuses[index]}
                                                        onChange={() => handleStatusChange(index)}
                                                className="sr-only peer"
                                            />
                                            <div className="group peer ring-0 bg-rose-400 rounded-full outline-none duration-300 after:duration-300 w-24 h-10 shadow-md peer-checked:bg-emerald-500 peer-focus:outline-none after:content-['✖️'] after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-8 after:w-8 after:top-1 after:left-1 after:-rotate-180 after:flex after:justify-center after:items-center peer-checked:after:translate-x-12 peer-checked:after:content-['✔️'] peer-hover:after:scale-95 peer-checked:after:rotate-0"></div>
                                            </label>
                                        </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                    </table>
                </div>
            </div>
           
          </section>
        </>
    );
}
export default PedClientes;