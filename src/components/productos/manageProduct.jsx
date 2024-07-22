import {useState } from "react";
import { UpdateModal, } from "./modales/modal";
import { Toaster } from "react-hot-toast";
const ManagePedidos = ({productos}) =>{
    const [open, setOpen] = useState(false);
    const [selectProducto, setSelectProducto] = useState({});
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSelect = (user) => {
        setSelectProducto(user);
        handleOpen();
    }
    
    if (productos === undefined || productos.length === 0) {
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
        <UpdateModal 
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
            selectProducto={selectProducto}
        />
         <Toaster
        position="top-center"
        reverseOrder={false}
        />
          <section className="w-full ">
           <nav className="w-full flex justify-start text-start items-start px-8"> <div className="bg-blue-300 shadow-md rounded-br-2xl rounded-tr-2xl w-fit "><h1 className=" font-bold text-2xl p-4 text-gray-100">Gestionar Catalago de Productos</h1></div></nav>
            <div className="p-4">
                <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-blue-200 ">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Descripcion
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Peso
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Precio Unitario
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Imagen
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Actualizar
                                </th>
                                
                            </tr>
                        </thead>
                        <tbody>
                                {productos.map((data) => (
                                    <tr key={data.id} className="odd:bg-white  even:bg-gray-50  border-b ">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap  text-center">
                                        {data.nombre_producto}
                                        </th>
                                        <td className="px-6 py-4 text-center">
                                            {data.descripcion_producto}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {data.peso_producto} KG
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            ${data.precio_producto}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                        <img src={`http://127.0.0.1:8000${data.imagen_producto}`} className="w-24 items-center" alt="..." />
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

export default ManagePedidos;