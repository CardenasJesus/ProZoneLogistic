
import { useState, useEffect } from "react";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { useState } from 'react';
import TextField from '@mui/material/TextField';
// import toast from 'react-hot-toast';
import axios from 'axios';
import dayjs from 'dayjs';
import toast, { Toaster } from "react-hot-toast";

const PedPedidos = () => {
    const [descripcion, setDescripcion] = useState('');
    const [calle, setCalle] = useState('');
    const [num_exterior, setNumExterior] = useState('');
    const [colonia, setColonia] = useState('');
    const [codigo_postal, setCodigoPostal] = useState('');
    const [producto, setProducto] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [precio, setPrecio] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [total, setTotal] = useState('');
    const [descripcionEnvio, setDescripcionEnvio] = useState('');
    const [conductor, setConductor] = useState([]);
    const [observaciones, setObservaciones] = useState('');
    const [ruta, setRuta] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [formData, setFormData] = useState({
        pedido : {
            precio_unitario: '',
            precio_total: '',
            descripcion: '',
            fecha_pedido: dayjs(),
            status: 1,
            calle: '',
            num_exterior: '',
            colonia: '',
            codigo_postal: '',
            colaborador: '',
            cliente: '',
        },
        detalle_pedido: {
            prducto: '',
            cantidad: '',
            precio_unitario: '',
            precio_total: '',
        },
        envio: {
            descripcion: '',
            fecha_envio: dayjs(),
            fecha_entrega: '',
            observaciones: '',
            status: 'enviado',
            ruta: '',
            conductor: '',
            colaborador: '',
        }
        });
        const validateValues = (value,pattern) => {
            return pattern.test(value);
        }
        const handlePatterns = (e) => {
            e.preventDefault();
            const {name, value} = e.target;
            let pattern;
            switch(name){
                case 'calle':
                case 'descripcion':
                case 'colonia':
                case 'descripcion_envio':
                case 'observaciones':
                    pattern = /^[a-zA-ZáéóíÁÉÓÚÑñ\s]+$/;
                    break;
                case 'num_exterior':
                case 'codigo_postal':
                    pattern = /^[0-9]+$/;
                    break;
                case 'cantidad':
                    pattern = /^[0-9]*(\.[0-9]+)?$/;
                    break;
                 default:
                    break;
            } 
    
            const isValidValues = validateValues(value, pattern);
            if (value === '' || isValidValues) {
                let formattedInput = value;
               
                switch (name) {
                    case 'observaciones':
                        setObservaciones(formattedInput);
                        break;
                    case 'descripcion':
                        setDescripcion(formattedInput);
                        break;
                    case 'descripcion_envio':
                        setDescripcionEnvio(value);
                        break;
                    case 'calle':
                        setCalle(value);
                        break;
                    case 'num_exterior':
                        setNumExterior(value);
                        break;
                    case 'colonia':
                        setColonia(value);
                        break;
                    case 'codigo_postal':
                        setCodigoPostal(value);
                        break;
                    case 'cantidad':
                        setCantidad(value);
                        break;
                    default:
                        break;
                }
            }}
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/v1/api/pedidos/cliente/')
            .then((response) => {
                setClientes(response.data);
            })
            .catch((error) => {
                console.error(error);
            });

        axios.get('http://127.0.0.1:8000/v1/api/pedidos/producto/')
            .then((response) => {
                setProducto(response.data);
            })
            .catch((error) => {
                console.error(error);
            });

        axios.get('http://127.0.0.1:8000/v1/api/pedidos/conductor/')
            .then((response) => {
                setConductor(response.data);
            })
            .catch((error) => {
                console.error(error);
            });

        axios.get('http://127.0.0.1:8000/v1/api/pedidos/rutas/')
            .then((response) => {
                setRuta(response.data);
            })
            .catch((error) => {
                console.error(error);
            });

    }, []);

    const handleProductChange = (event) => {
        const productId = Number(event.target.value); 
        console.log('Product ID seleccionado:', productId);
        
        const selected = producto.find(prod => prod.id === productId);
        console.log('Producto seleccionado:', selected);

        if (selected) {
            setSelectedProduct(productId);
            setPrecio(selected.precio_producto); // El precio es una cadena
        } else {
            setSelectedProduct('');
            setPrecio('');
        }
    };

    const handleCantidadChange = (event) => {
        const cantidad = event.target.value;
        setCantidad(cantidad);
        const precioNumerico = parseFloat(precio) || 0; // Convierte el precio a número
        const cantidadNumerica = parseFloat(cantidad) || 0; // Convierte la cantidad a número
        const totalCalculado = cantidadNumerica * precioNumerico;
        setTotal(totalCalculado.toFixed(2)); // Formatea el total a dos decimales
    };
    const handleInputChange = (e) => {
        e.preventDefault();
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
    }; 
    const handleDateChange = (name, date) => {
        setFormData({
            ...formData,
            [name]: date
        });
    };
    const createPedido = async (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));
        const ReorganizatedData =  {
            pedido: {
                precio_unitario: precio,
                precio_total: total,
                descripcion: formData.descripcion,
                calle: formData.calle,
                num_exterior: formData.num_exterior,
                colonia: formData.colonia,
                codigo_postal: formData.codigo_postal,
                cliente: formData.cliente,
                colaborador: user.empleado.id,
                fecha_pedido: dayjs().format('YYYY-MM-DD'),
                status: 1,
            },
            detalle_pedido: {
                prducto: selectedProduct,
                cantidad: cantidad,
                precio_unitario: precio,
                precio_total: total,
            },
            envio: {
                descripcion: formData.descripcion_envio,
                fecha_envio: dayjs().format('YYYY-MM-DD'),
                fecha_entrega: formData.fecha_entrega.format('YYYY-MM-DD'),
                observaciones: formData.observaciones,
                status: 'enviado',
                ruta: formData.ruta,
                conductor: formData.conductor,
                colaborador: user.empleado.id,
            }
        }
        console.log('formattedData', ReorganizatedData);
        try {
            const response = await fetch('http://127.0.0.1:8000/v1/api/crear_pedido/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ReorganizatedData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Error creating pedido');
            }

            const data = await response.json();
            toast.success('Pedido created successfully');
        } catch (error) {
            console.error('Error', error);
            toast.error('Error creating pedido');
        }
    };
    return (
        <>
         <Toaster
        position="top-center"
        reverseOrder={false}
        />
          <section className="w-full">
            <div className="bg-gray-100 shadow-md rounded-bl-2xl rounded-tr-2xl w-full text-center"><h1 className="font-bold text-2xl  sm:text-4xl p-4 text-gray-600">Crear Pedidos</h1></div>
                <nav className="bg-gray-100 shadow-xl rounded-2xl p-8 mt-4">
                    <form onSubmit={createPedido}>
                        <div>
                            <label htmlFor="descripcion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripcion</label>
                            <textarea rows={2} type="text" name="descripcion" value={descripcion} onChange={(e) =>{handleInputChange(e), handlePatterns(e)}} id="descripcion" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Una descripcion corta" required />
                        </div>
                        <h1 className="py-2  mt-4 mb-4 font-bold text-3xl text-center text-blue-500 ">Datos de ubicacion</h1>

                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label htmlFor="calle" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Calle</label>
                                <input type="text" id="calle" name="calle" value={calle} onChange={(e) =>{handleInputChange(e), handlePatterns(e)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Calle Adolfo Lopez Mateos" required />
                            </div>
                            <div>
                                <label htmlFor="num_exterior" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Numero Exterior</label>
                                <input type="text" id="num_exterior" maxLength={5} name="num_exterior"  value={num_exterior} onChange={(e) =>{handleInputChange(e), handlePatterns(e)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="23223" required />
                            </div>  
                            <div>
                                <label htmlFor="colonia" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Colonia</label>
                                <input type="text" id="colonia" name="colonia"  value={colonia} onChange={(e) =>{handleInputChange(e), handlePatterns(e)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Col El Refugio" required />
                            </div>
                            <div>
                                <label htmlFor="codigo_postal" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Codigo Postal</label>
                                <input type="text" id="codigo_postal" maxLength={5} name="codigo_postal"  value={codigo_postal} onChange={(e) =>{handleInputChange(e), handlePatterns(e)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="22409" required />
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="cliente" className="block mb-2 text-sm font-medium text-gray-900 ">Seleccione al cliente del pedido</label>
                                <select id="cliente" name="cliente" onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                    <option disabled selected>Seleccione un Cliente del pedido</option>
                                    {clientes.map((cliente) => (
                                        <option key={cliente.id} value={cliente.id}>
                                            {cliente.nombre_cliente}{cliente.apellido_cliente}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <h1 className="py-2 mt-4 mb-4 font-bold text-3xl text-center text-blue-500 ">Detalles del pedido</h1>
                        <div className="mb-6">
                                <label htmlFor="producto" className="block mb-2 text-sm font-medium text-gray-900 ">Seleccione el producto</label>
                                <select id="producto" name="prducto" onChange={handleProductChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                    <option disabled selected>Seleccione el producto del pedido</option>
                                    {producto.map((prod) => (
                                        <option key={prod.id} value={prod.id}>
                                            {prod.nombre_producto}
                                        </option>
                                    ))}
                                </select>
                        </div> 
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
                            <div className="mb-6">
                                <label htmlFor="cantidad" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cantidad</label>
                                <input type="text" id="cantidad" name="cantidad"  value={cantidad}  onChange={handleCantidadChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="23" required />
                            </div> 
                            <div className="mb-6">
                                <label htmlFor="precio" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Precio Unitario</label>
                                <input type="text" id="precio" name="precio_unitario" value={precio} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                            </div> 
                            <div className="mb-6">
                                <label htmlFor="total" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Precio total</label>
                                <input type="text" id="total" name="precio_total" value={total} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                            </div> 
                        </div>
                        <h1 className="py-2 mt-4 mb-4 font-bold text-3xl text-center text-blue-500 ">Detalles de Envio</h1>
                        <div className="mb-6">
                                <label htmlFor="descripcion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripcion del envio</label>
                                <textarea type="text" id="descripcion"  value={descripcionEnvio} onChange={(e) =>{handleInputChange(e), handlePatterns(e)}} name="descripcion_envio" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Una descripcion breve..." required />
                            </div> 
                        <div className="mb-6">
                                <label htmlFor="conductor" className="block mb-2 text-sm font-medium text-gray-900 ">Seleccione a un Conductor</label>
                                <select id="conductor" name="conductor" onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                    <option disabled selected>Seleccione conductor para el envio</option>
                                    {conductor.map((con) => (
                                        <option key={con.id} value={con.id}>
                                            {con.nombre} {con.apellido}
                                        </option>
                                    ))}
                                </select>
                        </div> 
                        <div className="mb-6">
                                <label htmlFor="observaciones" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Observaciones</label>
                                <input type="text" id="observaciones" name="observaciones"  value={observaciones} onChange={(e) =>{handleInputChange(e), handlePatterns(e)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Entregar en horario laboral" required />
                            </div>
                        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4">
                        <div className='w-full flex flex-col justify-center text-center items-center'>
                                <label htmlFor="producto" className="block  text-sm font-medium text-gray-900 dark:text-white">Fecha de entrega: </label>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer className="rounded-3xl w-full" components={['DatePicker']}>
                                        <DatePicker
                                            label="Fecha de entrega"
                                            value={formData.fecha_entrega}
                                            onChange={(date) => handleDateChange('fecha_entrega', date)}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    fullWidth
                                                    InputProps={{
                                                        style: { width: '100%' }
                                                    }}
                                                />
                                            )}
                                        />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </div>
                            <div className="mb-6 ">
                                <label htmlFor="ruta" className="block mb-2 text-sm font-medium text-gray-900 ">Seleccione una ruta</label>
                                <select id="ruta" name="ruta" onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                    <option disabled selected>Seleccione una ruta para el envio</option>
                                    {ruta.map((rut) => (
                                        <option key={rut.id} value={rut.id}>
                                            {rut.nombre_ruta}
                                        </option>
                                    ))}
                                </select>   
                            </div> 
                           
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>

                </nav>
           
          </section>
        </>
    );
}
export default PedPedidos;