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
 
const UpdateModalVehiculo = ({open, handleClose, selectedVehiculo}) => {
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [numero_seguro, setNumeroSeguro] = useState('');
    const [formsData, setFormsData] = useState({
        marca: '',
        modelo: '',
        placas: '',
        numero_seguro: '',
      });
      const validateValues = (value,pattern) => {
        return pattern.test(value);
    }

    const handlePatterns = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        let pattern;
        switch(name){
            case 'marca':
            case 'modelo':
                pattern = /^[a-zA-ZáéóíÁÉÓÚÑñ0-9\s]+$/;
                break;
            case 'numero_seguro':
                pattern = /^[0-9]+$/;
                break;
            default:
                break;
        } 

        const isValidValues = validateValues(value, pattern);
        if (value === '' || isValidValues) {
            let formattedInput = value;
            
            switch (name) {
                case 'marca':
                    setMarca(formattedInput);
                    break;
                case 'modelo':
                    setModelo(formattedInput);
                    break;
                case 'numero_seguro':
                    setNumeroSeguro(formattedInput);
                    break;
                default:
                    break;
            }
        }}

      useEffect(() => {
        if (selectedVehiculo) {
          setFormsData({
            marca: selectedVehiculo.marca || '',
            modelo: selectedVehiculo.modelo || '',
            placas: selectedVehiculo.placas || '',
            numero_seguro: selectedVehiculo.numero_seguro || '',
           
          });
          setMarca(selectedVehiculo.marca || '');
          setModelo(selectedVehiculo.modelo || '');
          setNumeroSeguro(selectedVehiculo.numero_seguro || '');
        }
      }, [selectedVehiculo]);
    
      const handleInputChange = (e) => {
        setFormsData({
          ...formsData,
          [e.target.name]: e.target.value
        });
      };
      const sendUpdUser = async (e) => {
        e.preventDefault();
        console.log(formsData);
        try {
            // http://127.0.0.1:8000/v1/api/vehicles/update/${selectedVehiculo.id}/
            const response = await fetch(`${APIBASE}v1/api/vehicles/update/${selectedVehiculo.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formsData)
            });
    
            if (response.ok) {
                const data = await response.json();
                toast.success('Vehicle updated');
                console.log(data);
            } else {
                toast.error('Error updating Vehicle');
                const errorData = await response.json();
                console.error('Error data:', errorData);
            }
        } catch (error) {
            toast.error('Error updating Vehicle');
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
                  <h1 className='font-bold text-2xl text-center'>Actualizar Informacion deL Vehiculo</h1>
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
                            <label htmlFor="marca" className="block mb-2 text-sm font-medium text-gray-900 ">Marca</label>
                            <input
                                type="text"
                                name='marca'
                                value={marca}
                                onChange={(e) => {handleInputChange(e); handlePatterns(e)}}
                                id="marca"
                                className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                            />
                        </div>
                        <div>
                            <label htmlFor="modelo" className="block mb-2 text-sm font-medium text-gray-900 ">Modelo</label>
                            <input
                                type="text"
                                name='modelo'
                                value={modelo}
                                onChange={(e) => {handleInputChange(e); handlePatterns(e)}}
                                id="modelo"
                                className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                            />
                        </div>
                    </div>
                    <div className='w-full grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4'>
                    <div className='mb-4'>
                            <label htmlFor="seguro" className="block mb-2 text-sm font-medium text-gray-900 ">Numero de seguro</label>
                            <input
                                type="text"
                                name='numero_seguro'
                                value={numero_seguro}
                                onChange={(e) => {handleInputChange(e); handlePatterns(e)}}
                                id="seguro"
                                className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                            />
                        </div>
                        <div className='mb-6'>
                            <label htmlFor="placas" className="block mb-2 text-sm font-medium text-gray-900 ">Placas</label>
                            <input
                                type="text"
                                name='placas'
                                value={formsData.placas}
                                onChange={handleInputChange}
                                id="placas"
                                className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                            />
                        </div>
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

const CreateModalVehiculo = ({ openVehiculo, handleCloseVehiculo, getVehiculos}) => {
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const validateValues = (value,pattern) => {
        return pattern.test(value);
    }

    const handlePatterns = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        let pattern;
        switch(name){
            case 'marca':
            case 'modelo':
                pattern = /^[a-zA-ZáéóíÁÉÓÚÑñ0-9\s]+$/;
                break;
            default:
                break;
        } 

        const isValidValues = validateValues(value, pattern);
        if (value === '' || isValidValues) {
            let formattedInput = value;
            switch (name) {
                case 'marca':
                    setMarca(formattedInput);
                    break;
                case 'modelo':
                    setModelo(formattedInput);
                    break;
                default:
                    break;
            }
        }}
    const [formsData, setFormsData] = useState({
        marca: '',
        modelo: '',
        placas: '',
        numero_seguro: '',
        fecha_fabricacion: null,
        status: false,
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
    const createVehiculo = async (e) => {
        e.preventDefault();
        const formattedData = {
            ...formsData,
            fecha_fabricacion: formsData.fecha_fabricacion ? dayjs(formsData.fecha_fabricacion).format('YYYY-MM-DD') : '',
        };
        fetch(`${APIBASE}v1/api/vehicles/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formattedData)
        })
        .then(response => {
            if(response.ok){
            response.json()
            }else{
                (error => {
                    throw error || 'Error updating Vehicle'
                })
            }
        })
        .then(data => {
            console.log(data);
            toast.success('Vehicle created successfully')
            getVehiculos();
        })
        .catch(error => {
            console.log('error', error);
            toast.error('Error creating Vehicle')
        })  
    }

    return(
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openVehiculo}
                onClose={handleCloseVehiculo}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                backdrop: {
                    timeout: 500,
                },
                }}
            >
                <Fade in={openVehiculo}>
                <Box sx={style}>
                    <>
                    <nav className='w-full p-4 grid grid-cols-1'>
                        <div className='w-full flex justify-between mb-4'>
                        <h1 className='font-bold text-2xl text-center text-gray-900'>Agregar Vehiculo</h1>
                        <button onClick={handleCloseVehiculo}>
                            <svg className="w-4 h-4 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6 18 12-12M6 6l12 12" />
                            </svg>
                        </button>
                        </div>
                        <div className='w-full flex justify-center items-center content-center'>
                        <form onSubmit={createVehiculo} className="w-full p-4">
                            <div className='w-full grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 mb-4 '>
                                <div>
                                    <label htmlFor="marca" className="block mb-2 text-sm font-medium text-gray-900 ">Marca</label>
                                    <input
                                        type="text"
                                        name='marca'
                                        value={marca}
                                        onChange={(e) => {handleInputChange(e); handlePatterns(e)}}
                                        id="name"
                                        placeholder='John'
                                        className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                                    />
                                </div>
                                <div>
                                    <label htmlFor="modelo" className="block mb-2 text-sm font-medium text-gray-900 ">Modelo</label>
                                    <input
                                        type="text"
                                        name='modelo'
                                        value={modelo}
                                        placeholder='Turbo '
                                        onChange={(e) => {handleInputChange(e); handlePatterns(e)}}
                                        id="modelo"
                                        className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                                    />
                                </div>
                               
                            </div>
                            <div className='mb-4'>
                                    <label htmlFor="placas" className="block mb-2 text-sm font-medium text-gray-900 ">Placas</label>
                                    <input
                                        type="text"
                                        name='placas'
                                        placeholder='AXX-XXX'
                                        onChange={(e) => {handleInputChange(e)}}
                                        id="lastname"
                                        className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                                    />
                                </div>
                            <div className='mb-2'>
                                <label htmlFor="seguro" className="block mb-2 text-sm font-medium text-gray-900 ">Numero de Seguro</label>
                                <input
                                    type="text"
                                    name='numero_seguro'
                                    placeholder='111122226565'
                                    onChange={(e) => {handleInputChange(e)}}
                                    id="seguro"
                                    className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                                />
                                </div>
                           
                            <div className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 mb-2'>
                        <div className=''>
                        <label htmlFor="select_status" className="block mb-2 text-sm font-medium text-gray-900 ">Asigne Satatus</label>
                                <select id="select_status" name='status'  onChange={(e) => {
                                const value = e.target.value === 'true';
                                handleInputChange({ target: { name: e.target.name, value } });
                                }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                                    <option disabled selected value= {false}>Asigne un Status</option>
                                    <option value= {true}>Activo</option>
                                    <option value={false}>Inactivo</option>
                                </select>
                            </div>
                                <div className='w-full'>
                                <label htmlFor="fecha_fabricacion" className="block  text-sm font-medium text-gray-900 ">Fecha de Fabricacion: </label>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker']}>
                                        <DatePicker
                                            label="Fecha de Fabricacion"
                                            value={formsData.fecha_fabricacion}
                                            onChange={(date) => handleDateChange('fecha_fabricacion', date)}
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
                            </div>
                            <div>
                            <button
                                    type="submit" onClick={handleCloseVehiculo}
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

export {UpdateModalVehiculo, CreateModalVehiculo};