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
 
const UpdateModalProv = ({open, handleClose, selectedProveedores}) => {
    const [nombre, setNombreProv] = useState('');
    const [apellido, setApellidoprov] = useState('');
    const [telefono, setTelefono] = useState('');
    const [formsData, setFormsData] = useState({
        nombre: '',
        apellido: '',
        telefono: '',
        direccion: '',
      });
      const validateValues = (value,pattern) => {
        return pattern.test(value);
    }

    const handlePatterns = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        let pattern;
        switch(name){
            case 'nombre':
            case 'apellido':
                pattern = /^[a-zA-ZáéóíÁÉÓÚÑñ\s]+$/;
                break;
            case 'telefono':
                pattern = /^\d{0,3}-?\d{0,3}-?\d{0,4}$/;
                break;
            default:
                break;
        } 

        const isValidValues = validateValues(value, pattern);
        if (value === '' || isValidValues) {
            let formattedInput = value;
            if (name === 'telefono') {
                const digitsOnly = value.replace(/[^0-9]/g, '');
                formattedInput = digitsOnly.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
            }
            switch (name) {
                case 'nombre':
                    setNombreProv(formattedInput);
                    break;
                case 'apellido':
                    setApellidoprov(formattedInput);
                    break;
                case 'telefono':
                    setTelefono(formattedInput);
                    break;
                default:
                    break;
            }
        }}

      useEffect(() => {
        if (selectedProveedores) {
          setFormsData({
            nombre: selectedProveedores.nombre || '',
            apellido: selectedProveedores.apellido || '',
            telefono: selectedProveedores.telefono || '',
            direccion: selectedProveedores.direccion || '',
          });
          setNombreProv(selectedProveedores.nombre || '');
          setApellidoprov(selectedProveedores.apellido || '');
          setTelefono(selectedProveedores.telefono || '');
        }
      }, [selectedProveedores]);
    
      const handleInputChange = (e) => {
        setFormsData({
          ...formsData,
          [e.target.name]: e.target.value
        });
      };
      const sendUpdUser = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${APIBASE}v1/api/proveedores/update/${selectedProveedores.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formsData)
            });
    
            if (response.ok) {
                const data = await response.json();
                toast.success('Proveedor updated');
                console.log(data);
            } else {
                toast.error('Error updating Proveedor');
                const errorData = await response.json();
                console.error('Error data:', errorData);
            }
        } catch (error) {
            toast.error('Error updating Proveedor');
            console.error('Error:', error);
        }
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        sendUpdUser(e);
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
                  <h1 className='font-bold text-2xl text-center'>Actualizar Informacion del Proveedor</h1>
                  <button onClick={handleClose}>
                    <svg className="w-4 h-4 bg-transparent text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6 18 12-12M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className='w-full flex justify-center items-center content-center'>
                  <form onSubmit={handleSubmit} className="w-full p-4">
                    <div className='w-full grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 mb-4'>
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Nombre</label>
                            <input
                                type="text"
                                name='nombre'
                                value={nombre}
                                onChange={(e) => {handleInputChange(e); handlePatterns(e)}}
                                id="name"
                                className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                            />
                        </div>
                        <div>
                            <label htmlFor="apellido" className="block mb-2 text-sm font-medium text-gray-900 ">Apellido</label>
                            <input
                                type="text"
                                name='apellido'
                                value={apellido}
                                onChange={(e) => {handleInputChange(e); handlePatterns(e)}}
                                id="apellido"
                                className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                            />
                        </div>
                    </div>
                    <div className='mb-4'>
                            <label htmlFor="telefono" className="block mb-2 text-sm font-medium text-gray-900 ">Telefono</label>
                            <input
                                type="text"
                                name='telefono'
                                value={telefono}
                                onChange={(e) => {handleInputChange(e); handlePatterns(e)}}
                                id="telefono"
                                className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                            />
                        </div>
                    <div className='mb-4'>
                            <label htmlFor="direccion" className="block mb-2 text-sm font-medium text-gray-900 ">Direccion</label>
                            <input
                                type="text"
                                name='direccion'
                                value={formsData.direccion}
                                onChange={handleInputChange}
                                id="direccion"
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

const CreateModalProv = ({ openProv, handleCloseProveedor, getProveedores}) => {
    const [nombre, setNombreProv] = useState('');
    const [apellido, setApellidoProv] = useState('');
    const [telefono, setTelefono] = useState('');
    const validateValues = (value,pattern) => {
        return pattern.test(value);
    }

    const handlePatterns = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        let pattern;
        switch(name){
            case 'nombre':
            case 'apellido':
                pattern = /^[a-zA-ZáéóíÁÉÓÚÑñ\s]+$/;
                break;
            case 'telefono':
                pattern = /^\d{0,3}-?\d{0,3}-?\d{0,4}$/;
                break;
            default:
                break;
        } 

        const isValidValues = validateValues(value, pattern);
        if (value === '' || isValidValues) {
            let formattedInput = value;
            if (name === 'telefono') {
                const digitsOnly = value.replace(/[^0-9]/g, '');
                formattedInput = digitsOnly.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
            }
            switch (name) {
                case 'nombre':
                    setNombreProv(formattedInput);
                    break;
                case 'apellido':
                    setApellidoProv(formattedInput);
                    break;
                case 'telefono':
                    setTelefono(formattedInput);
                    break;
                default:
                    break;
            }
        }}
    const [formsData, setFormsData] = useState({
        nombre: '',
        apellido: '',
        telefono: '',
        direccion: '',
      });
      const handleInputChange = (e) => {
        e.preventDefault();
        setFormsData({
          ...formsData,
          [e.target.name]: e.target.value
        });
      };
      const CreateProveedor = async (e) => {
        e.preventDefault();
    
        console.log(formsData);
    
        try {
            const response = await fetch(`${APIBASE}v1/api/proveedores/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formsData)
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Error updating Proveedor');
            }
    
            const data = await response.json();
            console.log(data);
            toast.success('Proveedor created successfully');
            getProveedores();
        } catch (error) {
            console.log('error', error);
            toast.error('Error creating Proveedor');
        }
    };
    return(
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openProv}
                onClose={handleCloseProveedor}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                backdrop: {
                    timeout: 500,
                },
                }}
            >
                <Fade in={openProv}>
                <Box sx={style}>
                    <>
                    <nav className='w-full p-4 grid grid-cols-1'>
                        <div className='w-full flex justify-between mb-4'>
                        <h1 className='font-bold text-2xl text-center text-gray-900'>Crear Contacto de Proveedor</h1>
                        <button onClick={handleCloseProveedor}>
                            <svg className="w-4 h-4 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6 18 12-12M6 6l12 12" />
                            </svg>
                        </button>
                        </div>
                        <div className='w-full flex justify-center items-center content-center'>
                        <form onSubmit={CreateProveedor} className="w-full p-4">
                            <div className='w-full grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 mb-4 '>
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Nombre del contacto</label>
                                    <input
                                        type="text"
                                        name='nombre'
                                        value={nombre}
                                        onChange={(e) => {handleInputChange(e); handlePatterns(e)}}
                                        id="name"
                                        placeholder='John'
                                        className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900 ">Apellido del contacto</label>
                                    <input
                                        type="text"
                                        name='apellido'
                                        value={apellido}
                                        placeholder='Doe'
                                        onChange={(e) => {handleInputChange(e); handlePatterns(e)}}
                                        id="lastname"
                                        className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                                    />
                                </div>
                               
                            </div>
                            <div className='mb-4'>
                                    <label htmlFor="direccion" className="block mb-2 text-sm font-medium text-gray-900 ">Direccion</label>
                                    <input
                                        type="text"
                                        name='direccion'
                                        placeholder='15th Av Street'
                                        onChange={(e) => {handleInputChange(e)}}
                                        id="lastname"
                                        className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                                    />
                                </div>
                            <div>
                            <label htmlFor="telefono" className="block mb-2 text-sm font-medium text-gray-900 ">Telefono</label>
                            <input
                                type="text"
                                name='telefono'
                                value={telefono }
                                onChange={(e) => {handleInputChange(e); handlePatterns(e)}}
                                id="telefono"
                                placeholder='123-456-7890'
                                className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                            />
                            </div>
                            <div>
                            <button
                                    type="submit" onClick={handleCloseProveedor}
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

export {UpdateModalProv, CreateModalProv};