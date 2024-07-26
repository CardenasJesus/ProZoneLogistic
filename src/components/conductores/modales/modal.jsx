import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useEffect,useState } from 'react';
import toast from 'react-hot-toast';


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
 
const UpdateModalConductores = ({open, handleCloseConductorUpd, selectedConductor}) => {
    const [nombre, setNombreConductor] = useState('');
    const [apellido, setApellidoConductor] = useState('');
    const [edad, setEdad] = useState('');
    const [formsData, setFormsData] = useState({
        nombre: '',
        apellido: '',
        edad: '',
        genero: '',
        tipo_licencia: '',
        numero_licencia: '',
        status: ''
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
            case 'edad':
                pattern = /^\d{1,2}$/;
                break;
            default:
                break;
        } 

        const isValidValues = validateValues(value, pattern);
        if (value === '' || isValidValues) {
            let formattedInput = value;
            switch (name) {
                case 'nombre':
                    setNombreConductor(formattedInput);
                    break;
                case 'apellido_cliente':
                    setApellidoConductor(formattedInput);
                    break;
                case 'edad':
                    setEdad(formattedInput);
                    break;
                default:
                    break;
            }
        }}

      useEffect(() => {
        if (selectedConductor) {
          setFormsData({
            nombre: selectedConductor.nombre || '',
            apellido: selectedConductor.apellido || '',
            edad: selectedConductor.edad || '',
            genero: selectedConductor.genero || '',
            tipo_licencia: selectedConductor.tipo_licencia || '',
            numero_licencia: selectedConductor.numero_licencia || '',
            status: selectedConductor.status || ''
          });
          setNombreConductor(selectedConductor.nombre || '');
          setApellidoConductor(selectedConductor.apellido || '');
          setEdad(selectedConductor.edad || '');
        }
      }, [selectedConductor]);
    
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
            // http://127.0.0.1:8000/v1/api/drivers/update/${selectedConductor.id}/
            const response = await fetch(`http://127.0.0.1:8000/v1/api/drivers/update/${selectedConductor.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formsData)
            });
    
            if (response.ok) {
                const data = await response.json();
                toast.success('User updated');
                console.log(data);
            } else {
                toast.error('Error updating user');
                const errorData = await response.json();
                console.error('Error data:', errorData);
            }
        } catch (error) {
            toast.error('Error updating user');
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
                onClose={handleCloseConductorUpd}
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
                  <h1 className='font-bold text-2xl text-center'>Actualizar Informacion de clientes</h1>
                  <button onClick={handleCloseConductorUpd}>
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
                    <div className='w-full grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4'>
                    <div className='mb-4'>
                            <label htmlFor="edad" className="block mb-2 text-sm font-medium text-gray-900 ">Edad</label>
                            <input
                                type="text"
                                name='edad'
                                value={edad}
                                onChange={(e) => {handleInputChange(e); handlePatterns(e)}}
                                id="edad"
                                className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                            />
                        </div>
                        <div className='mb-6'>
                                <label htmlFor="select_gener" className="block mb-2 text-sm font-medium text-gray-900 ">Genero</label>
                                    <select id="select_gener" name='genero'  onChange={(e) => {handleInputChange(e)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                                        <option disabled selected value= {formsData.genero}>Seleccione genero</option>
                                        <option value= {"Masculino"}>Masculino</option>
                                        <option value={"Femenino"}>Femenino</option>
                                        <option value={""}>Prefiero no especificar</option>
                                    </select>
                        </div>
                    </div>
                        <div className='mb-6 '>
                        <div className=''>
                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 ">Asigne un status</label>
                        <select id="countries" name='status' onChange={(e) => {
                                    const value = e.target.value === 'true';
                                    handleInputChange({ target: { name: e.target.name, value } });
                                    }}className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                            <option disabled selected value= {false}>Asigne un Status</option>
                            <option value= {true}>Activo</option>
                            <option value={false}>Inactivo</option>
                        </select>
                        </div>
                        </div>
                        <div className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 mb-2'>
                        <div className=''>
                                <label htmlFor="licencianum" className="block mb-2 text-sm font-medium text-gray-900 ">Numero de Licencia</label>
                                <input
                                    type="text"
                                    name='numero_licencia'
                                    value={formsData.numero_licencia}                                    
                                    onChange={(e) => {handleInputChange(e)}}
                                    id="licencianum"
                                    className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                                />
                                </div>
                            <div className=''>
                                <label htmlFor="select_licence_type" className="block mb-2 text-sm font-medium text-gray-900 ">Tipo de licencias</label>
                                    <select id="select_licence_type" value={formsData.tipo_licencia} name='tipo_licencia'  onChange={(e) => {handleInputChange(e)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                                        <option disabled selected value= {""}>Licencia tipo:</option>
                                        <option value= {"B"}>B</option>
                                        <option value={"C"}>C</option>
                                    </select>
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

const CreateModalConductores = ({ openC, handleCloseConductor, getConductores}) => {
    const [nombre, setNombreConductor] = useState('');
    const [apellido, setApellidoConductor] = useState('');
    const [edad, setEdad] = useState('');
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
            case 'edad':
                pattern = /^\d{1,2}$/;
                break;
            default:
                break;
        } 

        const isValidValues = validateValues(value, pattern);
        if (value === '' || isValidValues) {
            let formattedInput = value;
           
            switch (name) {
                case 'nombre':
                    setNombreConductor(formattedInput);
                    break;
                case 'apellido':
                    setApellidoConductor(formattedInput);
                    break;
                case 'edad':
                    setEdad(formattedInput);
                    break;
                default:
                    break;
            }
        }}
    const [formsData, setFormsData] = useState({
        nombre: '',
        apellido: '',
        edad: '',
        genero: '',
        tipo_licencia: '',
        numero_licencia: '',
        status: false,
      });
      const handleInputChange = (e) => {
        e.preventDefault();
        setFormsData({
          ...formsData,
          [e.target.name]: e.target.value
        });
      };
    const CreateUser = async (e) => {
        e.preventDefault();
      
        console.log(formsData);
        fetch('http://127.0.0.1:8000/v1/api/drivers/register/', {
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
                    throw error || 'Error updating user'
                })
            }
        })
        .then(data => {
            console.log(data);
            toast.success('User created successfully')
            getConductores();
        })
        .catch(error => {
            console.log('error', error);
            toast.error('Error creating user')
        })  
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        CreateUser(e)
        }
    return(
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openC}
                onClose={handleCloseConductor}
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
                        <h1 className='font-bold text-2xl text-center text-gray-900'>Crear Conductor</h1>
                        <button onClick={handleCloseConductor}>
                            <svg className="w-4 h-4 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6 18 12-12M6 6l12 12" />
                            </svg>
                        </button>
                        </div>
                        <div className='w-full flex justify-center items-center content-center'>
                        <form onSubmit={handleSubmit} className="w-full p-4">
                            <div className='w-full grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 mb-4 '>
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Nombre</label>
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
                                    <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900 ">Apellido</label>
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
                                    <label htmlFor="edad" className="block mb-2 text-sm font-medium text-gray-900 ">Edad</label>
                                    <input
                                        type="text"
                                        name='edad'
                                        value={edad}
                                        placeholder='20'
                                        onChange={(e) => {handleInputChange(e), handlePatterns(e)}}
                                        id="edad"
                                        className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                                    />
                                </div>
                            <div className='mb-2'>
                                <label htmlFor="licencianum" className="block mb-2 text-sm font-medium text-gray-900 ">Numero de Licencia</label>
                                <input
                                    type="text"
                                    name='numero_licencia'
                                    placeholder='999999999999999'
                                    onChange={(e) => {handleInputChange(e)}}
                                    id="licencianum"
                                    className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                                />
                                </div>
                                <div className='mb-6 '>
                                <div className=''>
                                    <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 ">Asigne un status</label>
                                    <select id="status" name='status' onChange={(e) => {
                                                const value = e.target.value === 'true';
                                                handleInputChange({ target: { name: e.target.name, value } });
                                                }}className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                                        <option disabled selected value= {false}>Asigne un Status</option>
                                        <option value= {true}>Activo</option>
                                        <option value={false}>Inactivo</option>
                                    </select>
                                </div>
                                </div>
                           
                            <div className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 mb-2'>
                            <div className=''>
                                <label htmlFor="select_gener" className="block mb-2 text-sm font-medium text-gray-900 ">Seleccione su Genero</label>
                                    <select id="select_gener" name='genero'  onChange={(e) => {handleInputChange(e)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                                        <option disabled selected value= {""}>Seleccione genero</option>
                                        <option value= {"Masculino"}>Masculino</option>
                                        <option value={"Femenino"}>Femenino</option>
                                        <option value={""}>Prefiero no especificar</option>
                                    </select>
                            </div>
                            <div className=''>
                                <label htmlFor="select_licence_type" className="block mb-2 text-sm font-medium text-gray-900 ">Seleccione su Genero</label>
                                    <select id="select_licence_type" name='tipo_licencia'  onChange={(e) => {handleInputChange(e)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                                        <option disabled selected value= {""}>Licencia tipo:</option>
                                        <option value= {"B"}>B</option>
                                        <option value={"C"}>C</option>
                                    </select>
                            </div>
                            </div>
                            <div>
                            <button
                                    type="submit" onClick={handleCloseConductor}
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

export {UpdateModalConductores, CreateModalConductores};