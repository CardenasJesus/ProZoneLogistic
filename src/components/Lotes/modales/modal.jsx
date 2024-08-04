import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect,useState } from 'react';
import TextField from '@mui/material/TextField';
import toast from 'react-hot-toast';
import axios from 'axios';
import dayjs from 'dayjs';
import { APIBASE } from '../../../js/urls';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%', // Ajusta el ancho para pantallas pequeñas
    maxWidth: '600px', 
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 5,
    overflowY: 'auto', // Para habilitar el desplazamiento vertical
    maxHeight: '90vh', // Altura máxima para evitar el desbordamiento
  };

const DetailsModal = ({openD, handleCloseDetail, selectedLotes}) =>{
    return(
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openD}
                onClose={handleCloseDetail}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                backdrop: {
                    timeout: 500,
                },
                }}
            >
                <Fade in={openD}>
          <Box sx={style}>
            <>
              <nav className='w-full p-4 grid grid-cols-1 h-fit'>
                <div className='w-full flex justify-between items-baseline'>
                  <h1 className='font-bold text-2xl text-center'>Detalles Lote</h1>
                  <button onClick={handleCloseDetail}>
                    <svg className="w-4 h-4 bg-transparent text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6 18 12-12M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className='w-full flex justify-center items-center content-center'>
                    <>
                        <div>
                        <dt className="px-6 py-4 font-medium  whitespace-nowrap  text-center">
                        <h1 className='font-bold text-2xl text-gray-500'> {selectedLotes.nombre_lote} </h1>
                                        </dt>
                                        <dt className="px-6 py-4 text-center">
                                           <h1 className='text-lg text-blue-600'> {selectedLotes.descripcion_lote} </h1>
                                        </dt>
                                        <dt className="px-6 py-4 text-center">
                                          <span className='font-bold ml-4'>Stock:</span><p>{selectedLotes.existencia_lote} unidades</p>
                                        </dt>
                                        <dt className="px-6 py-4 text-center">
                                        <span className='font-bold ml-4'>Peso Total:</span><p>{selectedLotes.peso} kg </p>
                                        </dt>
                                        <dt className="px-6 py-4 text-center">
                                        <span className='font-bold ml-4'>Precio Total:</span><p>${selectedLotes.precio_lote} </p>
                                        </dt>
                                        <dt className="px-6 py-4 text-center">
                                        <span className='font-bold ml-4'>Fecha de Ingreso:</span><p>{selectedLotes.fecha_entrada} </p>
                                        </dt>
                                        <dt className="px-6 py-4 text-center">
                                        <span className='font-bold ml-4'>Fecha Vencimiento:</span><p> {selectedLotes.vencimiento_producto}  </p>
                                        </dt>
                                    <div className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-2'>
                                        <nav className='flex justify-center items-center text-center'>
                                            <div>
                                            <h1 className='font-bold text-sm text-center mb-2'>Almacen</h1>
                                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    <thead className="text-xs text-gray-200 uppercase bg-gray-500 ">
                                                    <tr>
                                                    <th scope="col" className="px-6 py-3">
                                                        ID
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Nombre
                                                    </th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr className="bg-gray-200 border-b ">
                                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {selectedLotes.almacen?.id}
                                                        </th>
                                                        <td className="px-6 py-4 text-gray-500">
                                                        {selectedLotes.almacen?.nombre}
                                                        </td>
                                                        </tr>
                                                        </tbody>
                                                </table>
                                                </div>
                                        </nav>
                                        <nav className='flex justify-center items-center text-center'>
                                            <div>
                                            <h1 className='font-bold text-sm text-center mb-2'>Proveedor</h1>
                                            <table className="w-full text-sm text-left rtl:text-right text-gray-50">
                                                    <thead className="text-xs text-gray-200 uppercase bg-gray-500 ">
                                                    <tr>
                                                    <th scope="col" className="px-6 py-3">
                                                        ID
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Nombre
                                                    </th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr className="bg-gray-200 border-b">
                                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                        {selectedLotes.proveedor?.id}
                                                        </th>
                                                        <td className="px-6 py-4 text-gray-500">
                                                        {selectedLotes.proveedor?.nombre}
                                                        </td>
                                                        </tr>
                                                        </tbody>
                                                </table>
                                            </div>
                                        </nav>
                                        <nav className='flex justify-center items-center text-center col-span-2'>
                                            <div>
                                            <h1 className='font-bold text-sm text-center'>Producto</h1>
                                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    <thead className="text-xs text-gray-200 uppercase bg-gray-500">
                                                    <tr>
                                                    <th scope="col" className="px-6 py-3">
                                                        ID
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Nombre
                                                    </th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr className="bg-gray-200 border-b text-gray-500 ">
                                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                        {selectedLotes.producto?.id}
                                                        </th>
                                                        <td className="px-6 py-4">
                                                        {selectedLotes.producto?.nombre_producto}
                                                        </td>
                                                        </tr>
                                                        </tbody>
                                                </table>
                                            </div>
                                        </nav>
                                    </div>
                        </div>
                    </>
                </div>
              </nav>
            </>
          </Box>
        </Fade>
            </Modal>
        </>
    )
}
 
const UpdateModalLotes = ({open, handleClose, selectedLotes}) => {
    const [setNombreLote] = useState('');
    const [setDescripcionLote] = useState('');
    const [setExistenciaLote] = useState('')
    const [setPeso] = useState('') 
    const [setPrecioLote] = useState('')
    const [almacenes, setAlmacenes] = useState([]);
    const [formsData, setFormsData] = useState({
            nombre_lote: '',
            descripcion_lote: '',
            existencia_lote: '',
            peso: '',
            precio_lote: '',
            almacen: '',
      });
      const validateValues = (value,pattern) => {
        return pattern.test(value);
    }

    const handlePatterns = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        let pattern;
        switch(name){
            case 'nombre_lote':
            case 'descripcion_lote':
                pattern = /^[a-zA-ZáéóíÁÉÓÚÑñ0-9\s]+$/;
                break;
            case 'peso':
            case 'precio_lote':
                pattern = /^[0-9]*(\.[0-9]+)?$/;
                break;
            case 'existencia_lote':
                pattern = /^[0-9]+$/;
                break;
             default:
                break;
        } 

        const isValidValues = validateValues(value, pattern);
        if (value === '' || isValidValues) {
            let formattedInput = value;
           
            switch (name) {
                case 'nombre_lote':
                    setNombreLote(formattedInput);
                    break;
                case 'descripcion_lote':
                    setDescripcionLote(formattedInput);
                    break;
                case 'peso':
                    setPeso(value);
                    break;
                case 'precio_lote':
                    setPrecioLote(value);
                    break;
                case 'existencia_lote':
                    setExistenciaLote(value);
                    break;
                default:
                    break;
            }
        }}
        const getAlmacenes = () => {
            axios.get(`${APIBASE}v1/api/almacen/`)
                .then((response) => {
                    console.log(response.data);
                    setAlmacenes(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
    
      useEffect(() => {
        if (selectedLotes) {
          setFormsData({
            nombre_lote: selectedLotes.nombre_lote || '',
            descripcion_lote: selectedLotes.descripcion_lote || '',
            existencia_lote: selectedLotes.existencia_lote || '',
            peso: selectedLotes.peso || '',
            precio_lote: selectedLotes.precio_lote || '',
            almacen: selectedLotes.almacen || '',
          });
          
        }
      }, [selectedLotes]);
      useEffect(() => {
        getAlmacenes();
    }, []);

      const handleInputChange = (e) => {
        setFormsData({
          ...formsData,
          [e.target.name]: e.target.value
        });
      };
      const sendUpdLote = async (e) => {
        e.preventDefault();
        try {
            // http://127.0.0.1:8000/v1/api/lotes/update/${selectedLotes.id}/
            const response = await fetch(`${APIBASE}v1/api/lotes/update/${selectedLotes.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formsData)
            });
    
            if (response.ok) {
                const data = await response.json();
                toast.success('Lote updated');
                console.log(data);
            } else {
                toast.error('Error updating Lote');
                const errorData = await response.json();
                console.error('Error data:', errorData);
            }
        } catch (error) {
            toast.error('Error updating lote');
            console.error('Error:', error);
        }
    }
    
    return(
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                backdrop: {
                    timeout: 500,
                },
                }}
            >
                <Fade in={open}>
          <Box sx={style}>
            <>
              <nav className='w-full p-4 grid grid-cols-1 h-fit'>
                <div className='w-full flex justify-between items-baseline'>
                  <h1 className='font-bold text-2xl text-center'>Actualizar Lote</h1>
                  <button onClick={handleClose}>
                    <svg className="w-4 h-4 bg-transparent text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6 18 12-12M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className='w-full flex justify-center items-center content-center'>
                <form onSubmit={sendUpdLote} className="w-full p-4">
                            <div className='w-full  mb-4 '>
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Nombre del Lote</label>
                                    <input
                                        type="text"
                                        name='nombre_lote'
                                        value={formsData.nombre_lote}
                                        onChange={(e) => {handleInputChange(e); handlePatterns(e)}}
                                        id="name"
                                        placeholder='Lote "x"'
                                        className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                                    />
                                </div>
                                
                            </div>
                            <div className='mb-4'>
                                    <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900 ">Descripcion</label>
                                    <textarea
                                        type="text"
                                        name='descripcion_lote'
                                        value={formsData.descripcion_lote}
                                        rows={3}
                                        onChange={(e) => {handleInputChange(e); handlePatterns(e)}}
                                        id="desc"
                                        className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                                    />
                                </div>
                            <div className='grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-4'>
                                    <div>
                                        <label htmlFor="peso" className="block mb-2 text-sm font-medium text-gray-900 ">Peso del Lote</label>
                                        <input
                                            type="text"
                                            name='peso'
                                            value={formsData.peso }
                                            onChange={(e) => {handleInputChange(e); handlePatterns(e)}}
                                            id="peso"
                                            placeholder='200 kg'
                                            className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900 ">Existencia (Stock)</label>
                                        <input
                                            type="text"
                                            name='existencia_lote'
                                            placeholder='300'
                                            value={formsData.existencia_lote}
                                            onChange={(e) => {handleInputChange(e); handlePatterns(e)}}
                                            id="stock"
                                            className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <label htmlFor="precio" className="block mb-2 text-sm font-medium text-gray-900 ">Precio Total</label>
                                        <input
                                            type="text"
                                            name='precio_lote'
                                            placeholder='300'
                                            value={formsData.precio_lote}
                                            onChange={(e) => {handleInputChange(e); handlePatterns(e)}}
                                            id="precio"
                                            className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                                        />
                                    </div>
                               </div>
                               <div className='mb-4 w-full '>
                                <div>
                                        <label htmlFor="almacenes" className="block mb-4 text-sm font-medium text-gray-900 dark:text-white">Almacen: </label>
                                    <select id="almacenes" name="almacen"
                                    onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option disabled selected>Seleccione un Almacen</option>
                                    {almacenes.map((almacen) => (
                                        <option key={almacen.id} value={almacen.id}>
                                            {almacen.nombre}
                                        </option>
                                    ))}
                                    </select>
                                </div>
                            </div>
                            <div>
                            <button
                            type="submit"
                            onClick={handleClose}
                            className="bg-white text-center w-48 rounded-2xl h-14 relative font-sans text-black text-base font-semibold group"
                            >
                            <div
                                className="bg-green-400 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500"
                            >
                                <svg
                                className='rotate-0 transform transition-transform duration-500 group-hover:rotate-180'
                                width="18px"
                                height="18px"
                                viewBox="0 0 1024 1024"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                    fill="#000000"
                                    d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                                ></path>
                                <path
                                    fill="#000000"
                                    d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                                ></path>
                                </svg>
                            </div>
                            <p className="translate-x-2">Actualizar</p>
                            </button>

                            </div>
                        </form>
                </div>
              </nav>
            </>
          </Box>
        </Fade>
            </Modal>
        </>
    )
}

const CreateModalLotes = ({ openLot, handleCloseLotes, getLotes}) => {
    const [nombre_lote, setNombreLote] = useState('');
    const [descripcion_lote, setDescripcionLote] = useState('');
    const [existencia_lote, setExistenciaLote] = useState('')
    const [peso, setPeso] = useState('') 
    const [precio_lote, setPrecioLote] = useState('')
    const [almacenes, setAlmacenes] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [productos, setProductos] = useState([]);

    
    const getAlmacenes = () => {
        axios.get(`${APIBASE}v1/api/almacen/`)
            .then((response) => {
                console.log(response.data);
                setAlmacenes(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getProveedor = () => {
        axios.get(`${APIBASE}v1/api/proveedor`)
            .then((response) => {
                console.log(response.data);
                setProveedores(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getProductos = () => {
        axios.get(`${APIBASE}v1/api/productos/`)
            .then((response) => {
                console.log(response.data);
                setProductos(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getAlmacenes();
        getProveedor();
        getProductos();
    }, []);

    const validateValues = (value,pattern) => {
        return pattern.test(value);
    }
    const handlePatterns = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        let pattern;
        switch(name){
            case 'nombre_lote':
            case 'descripcion_lote':
                pattern = /^[a-zA-ZáéóíÁÉÓÚÑñ0-9\s]+$/;
                break;
            case 'peso':
            case 'precio_lote':
                pattern = /^[0-9]*(\.[0-9]+)?$/;
                break;
            case 'existencia_lote':
                pattern = /^[0-9]+$/;
                break;
             default:
                break;
        } 

        const isValidValues = validateValues(value, pattern);
        if (value === '' || isValidValues) {
            let formattedInput = value;
           
            switch (name) {
                case 'nombre_lote':
                    setNombreLote(formattedInput);
                    break;
                case 'descripcion_lote':
                    setDescripcionLote(formattedInput);
                    break;
                case 'peso':
                    setPeso(value);
                    break;
                case 'precio_lote':
                    setPrecioLote(value);
                    break;
                case 'existencia_lote':
                    setExistenciaLote(value);
                    break;
                default:
                    break;
            }
        }}
    const [formsData, setFormsData] = useState({
            nombre_lote: '',
            descripcion_lote: '',
            existencia_lote: '',
            peso: '',
            precio_lote: '',
            vencimiento_producto: null,
            almacen: '',
            proveedor: '',
            producto: '',
            fecha_entrada: dayjs()  
        });
    
        const handleInputChange = (e) => {
            e.preventDefault();
            setFormsData({
              ...formsData,
              [e.target.name]: e.target.value
            });
        }; 
        const handleDateChange = (name, date) => {
            setFormsData({
                ...formsData,
                [name]: date
            });
        };
    
        const createLote = async (e) => {
            e.preventDefault();
            const formattedData = {
                ...formsData,
                vencimiento_producto: formsData.vencimiento_producto ? dayjs(formsData.vencimiento_producto).format('YYYY-MM-DD') : '',
                fecha_entrada: formsData.fecha_entrada ? dayjs(formsData.fecha_entrada).format('YYYY-MM-DD') : ''
            };
            console.log('formattedData', formattedData);
            try {
                const response = await fetch(`${APIBASE}v1/api/lotes/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formattedData)
                });
    
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.detail || 'Error creating lote');
                }
    
                const data = await response.json();
                toast.success('Lote created successfully');
                getLotes();
            } catch (error) {
                console.error('Error', error);
                toast.error('Error creating lote');
            }
        };
    return(
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openLot}
                onClose={handleCloseLotes}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                backdrop: {
                    timeout: 500,
                },
                }}
            >
                <Fade in={openLot}>
                <Box sx={style}>
                    <>
                    <nav className='w-full p-4 grid grid-cols-1'>
                        <div className='w-full flex justify-between mb-4'>
                        <h1 className='font-bold text-2xl text-center text-gray-900'>Crear Nuevo Lote</h1>
                        <button onClick={handleCloseLotes}>
                            <svg className="w-4 h-4 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6 18 12-12M6 6l12 12" />
                            </svg>
                        </button>
                        </div>
                        <div className='w-full flex justify-center items-center content-center'>
                        <form onSubmit={createLote} className="w-full p-4">
                            <div className='w-full  mb-4 '>
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Nombre del Lote</label>
                                    <input
                                        type="text"
                                        name='nombre_lote'
                                        value={nombre_lote}
                                        onChange={(e) => {handleInputChange(e); handlePatterns(e)}}
                                        id="name"
                                        placeholder='Lote "x"'
                                        className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                                    />
                                </div>
                                
                            </div>
                            <div className='mb-4'>
                                    <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900 ">Descripcion</label>
                                    <textarea
                                        type="text"
                                        name='descripcion_lote'
                                        value={descripcion_lote}
                                        rows={3}
                                        onChange={(e) => {handleInputChange(e); handlePatterns(e)}}
                                        id="desc"
                                        className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                                    />
                                </div>
                            <div className='grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-4'>
                                    <div>
                                        <label htmlFor="peso" className="block mb-2 text-sm font-medium text-gray-900 ">Peso del Lote</label>
                                        <input
                                            type="text"
                                            name='peso'
                                            value={peso }
                                            onChange={(e) => {handleInputChange(e); handlePatterns(e)}}
                                            id="peso"
                                            placeholder='200 kg'
                                            className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900 ">Existencia (Stock)</label>
                                        <input
                                            type="text"
                                            name='existencia_lote'
                                            placeholder='300'
                                            value={existencia_lote}
                                            onChange={(e) => {handleInputChange(e); handlePatterns(e)}}
                                            id="stock"
                                            className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <label htmlFor="precio" className="block mb-2 text-sm font-medium text-gray-900 ">Precio Total</label>
                                        <input
                                            type="text"
                                            name='precio_lote'
                                            placeholder='300'
                                            value={precio_lote}
                                            onChange={(e) => {handleInputChange(e); handlePatterns(e)}}
                                            id="precio"
                                            className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                                        />
                                    </div>
                               </div>
                               <div className='mb-4 w-full grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4 '>
                                <div className='w-full'>
                                <label htmlFor="producto" className="block  text-sm font-medium text-gray-900 dark:text-white">Fecha de Vencimiento: </label>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker']}>
                                        <DatePicker
                                            label="Fecha de Vencimiento"
                                            value={formsData.vencimiento_producto}
                                            onChange={(date) => handleDateChange('vencimiento_producto', date)}
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
                                <div>
                                        <label htmlFor="almacenes" className="block mb-4 text-sm font-medium text-gray-900 dark:text-white">Almacen: </label>
                                    <select id="almacenes" name="almacen"
                                    onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option disabled selected>Seleccione un Almacen</option>
                                    {almacenes.map((almacen) => (
                                        <option key={almacen.id} value={almacen.id}>
                                            {almacen.nombre}
                                        </option>
                                    ))}
                                    </select>
                                </div>
                            </div>
                            <div className='mb-4 w-full grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4 '>
                                <div className='w-full'>
                                <label htmlFor="proveedores" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Proveedor: </label>
                                    <select id="proveedores"  name="proveedor" onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option disabled selected>Seleccione un Proveedor</option>
                                        {proveedores.map((proveedor) => (
                                            <option key={proveedor.id} value={proveedor.id}>
                                                {proveedor.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='w-full'>
                                    <label htmlFor="producto" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Producto: </label>
                                    <select id="producto"  name="producto"  onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option  disabled selected>¿De que producto es el lote?</option>
                                        {productos.map((producto) => (
                                        <option key={producto.id} value={producto.id}>
                                            {producto.nombre_producto}
                                        </option>
                                    ))}
                                    </select>
                                </div>
                            </div>
                            <div>
                            <button
                                    type="submit" onClick={handleCloseLotes}
                                    className="bg-white text-center w-48 rounded-2xl h-14 relative font-sans text-black text-base font-semibold group"
                                    >
                                    <div
                                        className="bg-blue-400 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500"
                                    >
                                        <svg
                                        className='rotate-0 transform transition-transform duration-500 group-hover:rotate-180'
                                        width="18px"
                                        height="18px"
                                        viewBox="0 0 1024 1024"
                                        xmlns="http://www.w3.org/2000/svg"
                                        >
                                        <path
                                            fill="#000000"
                                            d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                                        ></path>
                                        <path
                                            fill="#000000"
                                            d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                                        ></path>
                                        </svg>
                                    </div>
                                    <p className="translate-x-2">Create </p>
                            </button>

                            </div>
                        </form>
                        </div>
                    </nav>
                    </>
                </Box>
                </Fade>
            </Modal>
        </>
    )
}

export {UpdateModalLotes, CreateModalLotes, DetailsModal};