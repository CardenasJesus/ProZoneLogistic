import { useState } from 'react';


const HistorialPed = ({Datas, loading, error}) => {
    
    if (loading) {
        return <div role="status">
            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin  fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    }if (error) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <>
            <div className="bg-gray-100 p-4 rounded-2xl shadow-xl"><h1 className="font-bold text-2xl sm:text-4xl p-2 tracking-tighter">Historial de Pedidos</h1></div>
            <section className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-12">
            {Datas.map((data) => (
                    <div key={data.id}
                    className="w-72 bg-white rounded-b-lg border-t-8 border-green-400 px-4 py-5 flex flex-col justify-around shadow-lg"
                    >
                    <div className='flex justify-between'><p className="text-lg font-bold font-sans">Pedido No.{data.id}</p><p className="text-lg font-bold font-sans">{data.fecha_pedido}</p></div>
                    <h1 className='font-bold text-gray-400 text-sm py-2'>Datos del Cliente</h1>
                    <div className="p-3">
                        <p className="text-gray-400 text-sm ml-2">
                        <span className="font-bold mx-2">Cliente:</span> {data.cliente.nombre_cliente} {data.cliente.apellido_cliente}
                        </p>
                        <p className="text-gray-400 text-sm ml-2">
                        <span className="font-bold mx-2">Telefono:</span> {data.cliente.telefono}
                        </p>
                        <p className="text-gray-400 text-sm ml-2">
                        <span className="font-bold mx-2">Email:</span> {data.cliente.email}
                        </p>
                        <p className="text-gray-400 text-sm ml-2">
                        <span className="font-bold mx-2">Direccion:</span> {data.cliente.direccion}
                        </p>
                    </div>
                    <div className="flex justify-between">
                        <div className="text-sm flex gap-2">
                        <button
                            className="bg-slate-200 px-2 rounded-xl hover:bg-slate-400 transition-colors ease-in-out"
                        >
                            Unitario: ${data.precio_unitario}
                        </button>
                        <button
                            className="bg-slate-200 px-2 rounded-xl hover:bg-slate-400 transition-colors ease-in-out"
                        >
                            Total: ${data.precio_total}
                        </button>
                        </div>
                    </div>
                </div>
                ))}

            </section>
        </>
    )
}

export default HistorialPed