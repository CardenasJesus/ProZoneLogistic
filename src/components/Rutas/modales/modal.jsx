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
 
const UpdateModalRutas = ({open, handleClose, selectedRoute}) => {
    const [origen, setOrigen] = useState('');
    const [destino, setDestino] = useState('');
    const [nombre_ruta, setNombreRuta] = useState('');
    const [distancia, setDistancia] = useState('');
    const [horas, setHoras] = useState('');
    const [minutos, setMinutos] = useState('');
    const [formsData, setFormsData] = useState({
        origen: '',
        destino: '',
        distancia: '',
        nombre_ruta: '',
        status: false,
        tiempo_estimado: ''
      });
      const validateValues = (value,pattern) => {
        return pattern.test(value);
    }

    const handlePatterns = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        let pattern;
        switch(name){
            case 'origen':
            case 'destino':
            case 'nombre_ruta':
                pattern = /^[a-zA-ZáéóíÁÉÓÚÑñ0-9\s]+$/;
                break;
            case 'distancia':
                pattern = /^\d{1,2}$/;
                break;
            case 'horas':
            case 'minutos':
                pattern = /^\d{1,2}$/;
                break;
            default:
                break;
        } 

        const isValidValues = validateValues(value, pattern);
        if (value === '' || isValidValues) {
            let formattedInput = value;
            switch (name) {
                case 'origen':
                    setOrigen(formattedInput);
                    break;
                case 'destino':
                    setDestino(formattedInput);
                    break;
                case 'nombre_ruta':
                    setNombreRuta(formattedInput);
                    break;
                case 'distancia':
                    setDistancia(formattedInput);
                    break;
                case 'horas':
                    setHoras(formattedInput);
                    break;
                case 'minutos':
                    setMinutos(formattedInput);
                    break;
                default:
                    break;
            }
        }}

      useEffect(() => {
        if (selectedRoute) {
          setFormsData({
            origen: selectedRoute.origen || '',
            destino: selectedRoute.destino || '',
            distancia: selectedRoute.distancia || '',
            nombre_ruta: selectedRoute.nombre_ruta || '',
            status: selectedRoute.status || '',
          });
          setOrigen(selectedRoute.origen || '');
          setDestino(selectedRoute.destino || '');
          setDistancia(selectedRoute.distancia || '');
          setNombreRuta(selectedRoute.nombre_ruta || '');
        }
      }, [selectedRoute]);
    
      const combineTime = (hours, minutes) => {
        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        return `${formattedHours}:${formattedMinutes}:00`;
    };

      const handleInputChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;

        if (name === 'horas' || name === 'minutos') {
            setFormsData(prevState => {
                const newHoras = name === 'horas' ? value : horas;
                const newMinutos = name === 'minutos' ? value : minutos;
                const tiempoEstimado = combineTime(newHoras, newMinutos);

                return {
                    ...prevState,
                    horas: newHoras,
                    minutos: newMinutos,
                    tiempo_estimado: tiempoEstimado
                };
            });
        } else {
            setFormsData({
                ...formsData,
                [name]: value
            });
        }
    };
      const sendUpdUser = async (e) => {
        e.preventDefault();
        console.log(formsData);
        try {
            // http://127.0.0.1:8000/v1/api/routes/update/${selectedRoute.id}/
            const response = await fetch(`${APIBASE}v1/api/routes/update/${selectedRoute.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formsData)
            });
    
            if (response.ok) {
                const data = await response.json();
                toast.success('Route updated');
                console.log(data);
            } else {
                toast.error('Error updating Route');
                const errorData = await response.json();
                console.error('Error data:', errorData);
            }
        } catch (error) {
            toast.error('Error updating Route');
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
                  <h1 className='font-bold text-2xl text-center'>Actualizar Informacion de la Ruta</h1>
                  <button onClick={handleClose}>
                    <svg className="w-4 h-4 bg-transparent text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6 18 12-12M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className='w-full flex justify-center items-center content-center'>
                  <form onSubmit={handleSubmit} className="w-full p-4">
                  <div className='w-full grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 mb-4 '>
                                <div>
                                    <label htmlFor="origen" className="block mb-2 text-sm font-medium text-gray-900 ">Direccion de origen</label>
                                    <input
                                        type="text"
                                        name='origen'
                                        value={origen}
                                        onChange={(e) => {handleInputChange(e); handlePatterns(e)}}
                                        id="origen"
                                        placeholder='12th Av Street'
                                        className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                                    />
                                </div>
                                <div>
                                    <label htmlFor="destino" className="block mb-2 text-sm font-medium text-gray-900 ">Direccion de Destino</label>
                                    <input
                                        type="text"
                                        name='destino'
                                        value={destino}
                                        placeholder='13th Av Street'
                                        onChange={(e) => {handleInputChange(e); handlePatterns(e)}}
                                        id="destino"
                                        className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                                    />
                                </div>
                               
                            </div>
                            <div className='grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-2'>
                            <div className='mb-4'>
                                    <label htmlFor="distancia" className="block mb-2 text-sm font-medium text-gray-900 ">Distancia Aprox</label>
                                    <input
                                        type="text"
                                        name='distancia'
                                        value={distancia}
                                        placeholder='12 km' 
                                        onChange={(e) => {handleInputChange(e), handlePatterns(e)}}
                                        id="distancia"
                                        className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                                    />
                                </div>
                            <div className='mb-2 col-span-2'>
                                <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 ">Nombre de la ruta</label>
                                <input
                                    type="text"
                                    name='nombre_ruta'
                                    value={nombre_ruta}
                                    placeholder='Ruta del vino'
                                    onChange={(e) => {handleInputChange(e), handlePatterns(e)}}
                                    id="nombre"
                                    className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                                />
                                </div>
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
                            <div>
                            <label htmlFor="tiempo" className="block mb-2 text-sm font-medium text-gray-900 ">Tiempo Estimado</label>
                                <div className='grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-2'>
                                    <input
                                    type="text"
                                    name='horas'
                                    value={horas}
                                    onChange={(e) => {handleInputChange(e), handlePatterns(e)}}
                                    id="telefono"
                                    placeholder='5hrs 30min'
                                    className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                                /> 
                                    <input
                                    type="text"
                                    name='minutos'
                                    value={minutos}
                                    onChange={(e) => {handleInputChange(e), handlePatterns(e)}}
                                    id="telefono"
                                    placeholder='5hrs 30min'
                                    className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                                />
                                </div>
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

const CreateModalRutas = ({ openRutas, handleCloseRutas, getRutas}) => {
    const [origen, setOrigen] = useState('');
    const [destino, setDestino] = useState('');
    const [nombre_ruta, setNombreRuta] = useState('');
    const [distancia, setDistancia] = useState('');
    const [horas, setHoras] = useState('');
    const [minutos, setMinutos] = useState('');
    const [formsData, setFormsData] = useState({
        origen: '',
        destino: '',
        distancia: '',
        nombre_ruta: '',
        status: false,
        tiempo_estimado: ''
      });
    const validateValues = (value,pattern) => {
        return pattern.test(value);
    }

    const handlePatterns = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        let pattern;
        switch(name){
            case 'origen':
            case 'destino':
            case 'nombre_ruta':
                pattern = /^[a-zA-ZáéóíÁÉÓÚÑñ0-9\s]+$/;
                break;
            case 'distancia':
                pattern = /^\d{1,2}$/;
                break;
            case 'horas':
            case 'minutos':
                pattern = /^\d{1,2}$/;
                break;
            default:
                break;
        } 

        const isValidValues = validateValues(value, pattern);
        if (value === '' || isValidValues) {
            let formattedInput = value;
           
            switch (name) {
                case 'origen':
                    setOrigen(formattedInput);
                    break;
                case 'destino':
                    setDestino(formattedInput);
                    break;
                case 'nombre_ruta':
                    setNombreRuta(formattedInput);
                    break;
                case 'distancia':
                    setDistancia(formattedInput);
                    break;
                case 'horas':
                    setHoras(formattedInput);
                    break;
                case 'minutos':
                    setMinutos(formattedInput);
                    break;
                default:
                    break;
            }
        }}
  
      const combineTime = (hours, minutes) => {
        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        return `${formattedHours}:${formattedMinutes}:00`;
    };

      const handleInputChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;

        if (name === 'horas' || name === 'minutos') {
            setFormsData(prevState => {
                const newHoras = name === 'horas' ? value : horas;
                const newMinutos = name === 'minutos' ? value : minutos;
                const tiempoEstimado = combineTime(newHoras, newMinutos);

                return {
                    ...prevState,
                    horas: newHoras,
                    minutos: newMinutos,
                    tiempo_estimado: tiempoEstimado
                };
            });
        } else {
            setFormsData({
                ...formsData,
                [name]: value
            });
        }
    };
    const CreateRoute = async (e) => {
        e.preventDefault();
      
        console.log(formsData);
        // http://127.0.0.1:8000/v1/api/routes/register/
        fetch(`${APIBASE}v1/api/routes/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formsData)
        })
        .then(response => {
            if(response.ok){
            response.json()
            }else{
                (error => {
                    throw error || 'Error creating Route'
                })
            }
        })
        .then(data => {
            console.log(data);
            toast.success('Route created successfully')
            getRutas();
        })
        .catch(error => {
            console.log('error', error);
            toast.error('Error creating Route')
        })  
    }

    return(
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openRutas}
                onClose={handleCloseRutas}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                backdrop: {
                    timeout: 500,
                },
                }}
            >
                <Fade in={openRutas}>
                <Box sx={style}>
                    <>
                    <nav className='w-full p-4 grid grid-cols-1'>
                        <div className='w-full flex justify-between mb-4'>
                        <h1 className='font-bold text-2xl text-center text-gray-900'>Crear Ruta</h1>
                        <button onClick={handleCloseRutas}>
                            <svg className="w-4 h-4 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6 18 12-12M6 6l12 12" />
                            </svg>
                        </button>
                        </div>
                        <div className='w-full flex justify-center items-center content-center'>
                        <form onSubmit={CreateRoute} className="w-full p-4">
                            <div className='w-full grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 mb-4 '>
                                <div>
                                    <label htmlFor="origen" className="block mb-2 text-sm font-medium text-gray-900 ">Direccion de origen</label>
                                    <input
                                        type="text"
                                        name='origen'
                                        value={origen}
                                        onChange={(e) => {handleInputChange(e); handlePatterns(e)}}
                                        id="origen"
                                        placeholder='12th Av Street'
                                        className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                                    />
                                </div>
                                <div>
                                    <label htmlFor="destino" className="block mb-2 text-sm font-medium text-gray-900 ">Direccion de Destino</label>
                                    <input
                                        type="text"
                                        name='destino'
                                        value={destino}
                                        placeholder='El Refugio 23223 Tijuana Baja California'
                                        onChange={(e) => {handleInputChange(e); handlePatterns(e)}}
                                        id="destino"
                                        className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                                    />
                                </div>
                               
                            </div>
                            <div className='grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-2'>
                            <div className='mb-4'>
                                    <label htmlFor="distancia" className="block mb-2 text-sm font-medium text-gray-900 ">Distancia</label>
                                    <input
                                        type="text"
                                        name='distancia'
                                        value={distancia}
                                        placeholder='12' 
                                        onChange={(e) => {handleInputChange(e), handlePatterns(e)}}
                                        id="distancia"
                                        className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                                    />
                                </div>
                            <div className='mb-2 col-span-2'>
                                <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 ">Nombre de la ruta</label>
                                <input
                                    type="text"
                                    name='nombre_ruta'
                                    value={nombre_ruta}
                                    placeholder='Ruta del vino'
                                    onChange={(e) => {handleInputChange(e), handlePatterns(e)}}
                                    id="nombre"
                                    className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                                />
                                </div>
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
                            <div>
                            <label htmlFor="tiempo" className="block mb-2 text-sm font-medium text-gray-900 ">Tiempo Estimado</label>
                                <div className='grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-2'>
                                    <input
                                    type="text"
                                    name='horas'
                                    value={horas}
                                    onChange={(e) => {handleInputChange(e), handlePatterns(e)}}
                                    id="telefono"
                                    placeholder='5hrs 30min'
                                    className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                                /> 
                                    <input
                                    type="text"
                                    name='minutos'
                                    value={minutos}
                                    onChange={(e) => {handleInputChange(e), handlePatterns(e)}}
                                    id="telefono"
                                    placeholder='5hrs 30min'
                                    className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                                />
                                </div>
                            </div>
                            </div>
                            <div>
                            <button
                                    type="submit" onClick={handleCloseRutas}
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

export {UpdateModalRutas, CreateModalRutas};