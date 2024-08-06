import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useEffect,useState } from 'react';
import toast from 'react-hot-toast';
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
 
const UpdateModal = ({open, handleClose, selectProducto}) => {
    const [imagenProducto, setImagenProducto] = useState(null);
    const [formsData, setFormsData] = useState({
        nombre_producto: '',
        descripcion_producto: '',
        peso_producto: '',
        precio_producto: '',
    });

    useEffect(() => {
        if (selectProducto) {
            setFormsData({
                nombre_producto: selectProducto.nombre_producto || '',
                descripcion_producto: selectProducto.descripcion_producto || '',
                peso_producto: selectProducto.peso_producto || '',
                precio_producto: selectProducto.precio_producto || '',
            });
            setImagenProducto(selectProducto.imagen_producto || null);
        }
    }, [selectProducto]);

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setImagenProducto(files[0]);
        } else {
            setFormsData({
                ...formsData,
                [name]: value
            });
        }
    };

    const sendUpdProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nombre_producto', formsData.nombre_producto);
        formData.append('descripcion_producto', formsData.descripcion_producto);
        formData.append('peso_producto', formsData.peso_producto);
        formData.append('precio_producto', formsData.precio_producto);
        if (imagenProducto && typeof imagenProducto === 'object') {
            formData.append('imagen_producto', imagenProducto);
        }

        fetch(`${APIBASE}v1/api/products/update/${selectProducto.id}/`, {
            method: 'PUT',
            body: formData,
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error updating product');
            }
        })
        .then(data => {
            console.log(data);
            toast.success('Product updated successfully');
        })
        .catch(error => {
            toast.error('Error updating product');
            console.log('error', error);
        });
    };

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
                  <h1 className='font-bold text-2xl text-center'>Actualizar Producto</h1>
                  <button onClick={handleClose}>
                    <svg className="w-4 h-4 bg-transparent text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6 18 12-12M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className='w-full flex justify-center items-center content-center'>
                  <form onSubmit={sendUpdProduct} className="w-full p-4">
                    <div className='w-full grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4'>
                        <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Producto Nombre</label>
                        <input
                            type="text"
                            name='nombre_producto'
                            value={formsData.nombre_producto}
                            onChange={handleInputChange}
                            id="name"
                            className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                        />
                        </div>
                        <div>
                        <label htmlFor="descripcion" className="block mb-2 text-sm font-medium text-gray-900 ">Descripcion del producto</label>
                        <input
                            type="text"
                            name='descripcion_producto'
                            value={formsData.descripcion_producto}
                            onChange={handleInputChange}
                            id="descripcion"
                            className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                        />
                        </div>
                        
                    </div>
                    <nav className='grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-2'>
                        <div className='mb-6'>
                            <label htmlFor="peso" className="block mb-2 text-sm font-medium text-gray-900 ">Peso unitario</label>
                            <input
                                type="peso"
                                name='peso_producto'
                                value={formsData.peso_producto}
                                onChange={handleInputChange}
                                id="peso"
                                className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                            />
                        </div>
                        <div className='mb-6'>
                            <label htmlFor="precio" className="block mb-2 text-sm font-medium text-gray-900 ">Precio Unitario</label>
                            <input
                                type="precio"
                                name='precio_producto'
                                value={formsData.precio_producto}
                                onChange={handleInputChange}
                                id="precio"
                                className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                            />
                        </div>
                    </nav>
                    <div className='mb-4'>
                            <label htmlFor="imagen" className="block mb-2 text-sm font-medium text-gray-900 ">Imagen de Producto</label>
                            <input
                                type="file"
                                name='imagen_producto'
                                value={formsData.imagen_producto}
                                onChange={handleInputChange}
                                id="imagen"
                                className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                            />
                    </div>
                    <div>
                    <button
                            type="submit"
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

const CreateModal = ({ openC, handleCloseProducto, getProductos}) => {
    const [nombre_producto, setNombreProducto] = useState('');
    const [descripcion_producto, setDescripcionProducto] = useState('');
    const [imagenProducto, setImagenProducto] = useState(null); 
    const [formsData, setFormsData] = useState({
        nombre_producto: '',
        descripcion_producto: '',
        peso_producto: '',
        precio_producto: '',
        almacen: '',
    });

    const validateValues = (value, pattern) => {
        return pattern.test(value);
    }

    const handlePatterns = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        let pattern;
        switch (name) {
            case 'nombre_producto':
            case 'descripcion_producto':
                pattern = /^[a-zA-ZáéóíÁÉÓÚÑñ\s]+$/;
                break;
            default:
                break;
        }

        const isValidValues = validateValues(value, pattern);
        if (value === '' || isValidValues) {
            let formattedInput = value;
            switch (name) {
                case 'nombre_producto':
                    setNombreProducto(formattedInput);
                    break;
                case 'descripcion_producto':
                    setDescripcionProducto(formattedInput);
                    break;
                default:
                    break;
            }
        }
    }

    const handleInputChange = (e) => {
        e.preventDefault();
        const { name, value, files } = e.target;
        if (files) {
            setImagenProducto(files[0]);
        } else {
            setFormsData({
                ...formsData,
                [name]: value
            });
        }
    };
    const CreateProducto = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nombre_producto', formsData.nombre_producto);
        formData.append('descripcion_producto', formsData.descripcion_producto);
        formData.append('peso_producto', formsData.peso_producto);
        formData.append('precio_producto', formsData.precio_producto);
        formData.append('almacen', formsData.almacen);
        if (imagenProducto) {
            formData.append('imagen_producto', imagenProducto);
        }

        fetch(`${APIBASE}v1/api/products/register`, {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error creating product');
                }
            })
            .then(data => {
                console.log(data);
                toast.success('Producto created Successfully');
                getProductos();
            })
            .catch(error => {
                console.log('error', error);
                toast.error('Error to create a product');
            });
    }
    return(
        <>
        
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openC}
                onClose={handleCloseProducto}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                backdrop: {
                    timeout: 500,
                },
                }}
            >
                <Fade in={openC}>
                <Box sx={style}>
                    <>
                    <nav className='w-full p-4 grid grid-cols-1'>
                        <div className='w-full flex justify-between mb-4'>
                        <h1 className='font-bold text-2xl text-center text-gray-900'>Crear Producto</h1>
                        <button onClick={handleCloseProducto}>
                            <svg className="w-4 h-4 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6 18 12-12M6 6l12 12" />
                            </svg>
                        </button>
                        </div>
                        <div className='w-full flex justify-center items-center content-center'>
                        <form onSubmit={CreateProducto} className="w-full p-4">
                                <div>
                                    <label htmlFor="nombre_producto" className="block mb-2 text-sm font-medium text-gray-900 ">Nombre del Producto.</label>
                                    <input
                                        type="text"
                                        name='nombre_producto'
                                        value={nombre_producto}
                                        onChange={(e) => {handleInputChange(e); handlePatterns(e)}}
                                        id="nombre_producto"
                                        placeholder='Paracetamol'
                                        className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                                    />
                                </div>
                                <div>
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 ">Escriba una breve descripcion</label>
                                    <textarea
                                        type="text"
                                        name='descripcion_producto'
                                        value={descripcion_producto}
                                        placeholder='Doe'
                                        onChange={(e) => {handleInputChange(e); handlePatterns(e)}}
                                        id="description"
                                        className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                                    />
                                </div>
                            <div className='mb-2'>
                                <label htmlFor="peso" className="block mb-2 text-sm font-medium text-gray-900 ">Peso por Producto</label>
                                <input
                                    type="text"
                                    name='peso_producto'
                                    placeholder='0.05'
                                    onChange={(e) => {handleInputChange(e)}}
                                    id="peso"
                                    className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                                />
                                </div>
                            <div className='mb-4'>
                            <label htmlFor="precio" className="block mb-2 text-sm font-medium text-gray-900 ">Precio Unitario</label>
                            <input
                                type="text"
                                name='precio_producto'
                                onChange={handleInputChange}
                                id="precio"
                                placeholder='124.00'
                                className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                            />
                            </div>
                            <div className='mb-4'>
                                <label className="block mb-2 text-sm font-medium text-gray-900 " htmlFor="default_size">Asigne una imagen (Opcional)</label>
                                <input 
                                name='imagen_producto'
                                onChange={handleInputChange}
                                className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 focus:outline-none"
                                id="default_size"
                                type="file" />
                            </div>
                            <div className=''>
                                        <label htmlFor="almacen" className="block mb-2 text-sm font-medium text-gray-900 ">Asigne un Rol</label>
                                        <select id="almacen" name='almacen' onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                                            <option selected disabled>Almacen</option>
                                            <option value="1">Almacen Central</option>
                                            <option value="2">Almacen del norte</option>
                                        </select>
                                    </div>
                            <div>
                            <button
                                    type="submit" onClick={handleCloseProducto}
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

export {UpdateModal, CreateModal};