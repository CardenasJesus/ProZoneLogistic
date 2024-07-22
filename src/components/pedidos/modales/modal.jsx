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
 
const UpdateModalPedidos = ({open, handleClose, selectedUser}) => {
    // const [formsData, setFormsData] = useState({
    //     name: '',
    //     apellido: '',
    //     email: '',
    //     rol: '',
    //     status: ''
    //   });

    //   useEffect(() => {
    //     if (selectedUser) {
    //       setFormsData({
    //         nombre: selectedUser.nombre || '',
    //         apellido: selectedUser.apellido || '',
    //         email: selectedUser.email || '',
    //         rol: selectedUser.rol?.id || '',
    //         status: selectedUser.status || ''
    //       });
    //     }
    //   }, [selectedUser]);
    
    //   const handleInputChange = (e) => {
    //     setFormsData({
    //       ...formsData,
    //       [e.target.name]: e.target.value
    //     });
    //   };
    // const sendUpdUser = async (e) => {
    //     e.preventDefault();
    //     console.log(formsData);
    //     fetch(`http://127.0.0.1:8000/v1/api/employees/update/${selectedUser.id}/`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(formsData)
    //     })
    //     .then(response => {
    //         if(response.ok){
    //         response.json()
    //         }else{
    //             (error => {
    //                 throw error || 'Error updating user'
    //             })
    //         }
    //     })
    //     .then(data => {
    //         toast.success('User updated')
    //     })
    //     .catch(error => {
    //         toast.error('Error updating user')
    //         console.log('error', error);
    //     })  
    // }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     sendUpdUser(e)
    //     }
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
                  <h1 className='font-bold text-2xl text-center'>Actualizar usuario</h1>
                  <button onClick={handleClose}>
                    <svg className="w-4 h-4 bg-transparent text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6 18 12-12M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className='w-full flex justify-center items-center content-center'>
                  {/* <form onSubmit={handleSubmit} className="w-full p-4">
                    <div className='w-full grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4'>
                        <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">First Name</label>
                        <input
                            type="text"
                            name='name'
                            value={formsData.nombre}
                            onChange={handleInputChange}
                            id="name"
                            className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                        />
                        </div>
                        <div>
                        <label htmlFor="apellido" className="block mb-2 text-sm font-medium text-gray-900 ">Last Name</label>
                        <input
                            type="text"
                            name='apellido'
                            value={formsData.apellido}
                            onChange={handleInputChange}
                            id="apellido"
                            className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                        />
                        </div>
                        
                    </div>
                    <div className='mb-6'>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                        <input
                            type="email"
                            name='email'
                            value={formsData.email}
                            onChange={handleInputChange}
                            id="email"
                            className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                        />
                        </div>
                        <div className='mb-6 grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-8 justify-center content-center items-center'>
                        <div className=''>
                                        <label htmlFor="rol" className="block mb-2 text-sm font-medium text-gray-900 ">Asigne un Rol</label>
                                        <select id="rol" name='rol' onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                                            <option selected disabled>Asigne un nuevo Rol</option>
                                            <option value="1">Administrador</option>
                                            <option value="2">Colaborador</option>
                                        </select>
                        </div>
                        <div className=''>
                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 ">Asigne un status</label>
                        <select id="countries" name='status' onChange={(e) => {
                                    const value = e.target.value === 'true';
                                    handleInputChange({ target: { name: e.target.name, value } });
                                    }}className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                            <option selected disabled>Actualice el estado</option>
                            <option value= {true}>Activo</option>
                            <option value={false}>Inactivo</option>
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
                  </form> */}
                </div>
              </nav>
            </>
          </Box>
        </Fade>
            </Modal>
        </>
    )
}

const CreateModalPedidos = ({ openC, handleCloseC, getUsers}) => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
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
                    setNombre(formattedInput);
                    break;
                case 'apellido':
                    setApellido(formattedInput);
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
        email: '',
        password: '',
        repeat_password: '',
        status: false,
        rol: '',
        departamento: ''
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
        fetch('http://127.0.0.1:8000/v1/api/employees/register/', {
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
            getUsers();
        })
        .catch(error => {
            console.log('error', error);
        })  
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
            try{
                toast.promise(
                    CreateUser(e), {
                    loading: 'Loading',
                    success: 'User updated ',
                    error: 'Error updating user'
                })
            }catch(error){
                console.log('error', error);
            }
        }
    return(
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openC}
                onClose={handleCloseC}
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
                        <h1 className='font-bold text-2xl text-center text-gray-900'>Crear Cuenta de colaboradro</h1>
                        <button onClick={handleCloseC}>
                            <svg className="w-4 h-4 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6 18 12-12M6 6l12 12" />
                            </svg>
                        </button>
                        </div>
                        <div className='w-full flex justify-center items-center content-center'>
                        <form onSubmit={handleSubmit} className="w-full p-4">
                            <div className='w-full grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 mb-4 '>
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">First Name</label>
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
                                    <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900 ">Last name</label>
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
                            <div className='mb-2'>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                                <input
                                    type="email"
                                    name='email'
                                    placeholder='john_doe@gamil.com'
                                    onChange={(e) => {handleInputChange(e)}}
                                    id="email"
                                    className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                                />
                                </div>
                            <div className='grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4 mb-2'>
                            <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                            <input
                                type="password"
                                name='password'
                                onChange={handleInputChange}
                                id="password"
                                placeholder='password'
                                className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                            />
                            </div>
                            <div>
                            <label htmlFor="eat_password" className="block mb-2 text-sm font-medium text-gray-900 ">Confirme Password</label>
                            <input
                                type="password"
                                name='repeat_password'
                                onChange={handleInputChange}
                                id="re[eat_password"
                                placeholder='password'
                                className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
                            />
                            </div>
                            </div>
                            <div className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 mb-2'>
                        <div className=''>
                        <label htmlFor="select_status" className="block mb-2 text-sm font-medium text-gray-900 ">Confirme Password</label>
                                <select id="select_status" name='status'  onChange={(e) => {
                                const value = e.target.value === 'true';
                                handleInputChange({ target: { name: e.target.name, value } });
                                }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                                    <option value={false}>Inactivo</option>
                                    <option value={true}>Activo</option>
                                </select>
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
                            </div>
                            <div className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 mb-4'>
                                <div className=''>
                                        <label htmlFor="id_rol" className="block mb-2 text-sm font-medium text-gray-900 ">Asigne un Rol</label>
                                        <select id="id_rol" name='rol' onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                                            <option selected disabled>Asigne un Rol</option>
                                            <option value="1">Administrador</option>
                                            <option value="2">Colaborador</option>
                                        </select>
                                    </div>
                                    <div className=''>
                                        <label htmlFor="id_departamento" className="block mb-2 text-sm font-medium text-gray-900 ">Asigne un Departamento</label>
                                        <select id="id_departamento" name='departamento' onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                                            <option selected disabled>Asigne un Departamento</option>
                                            <option value="1">Logistica</option>
                                            <option value="2">Calidad</option>
                                        </select>
                                    </div>
                                </div>
                            <div>
                            <button
                                    type="submit" onClick={handleCloseC}
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

export {UpdateModalPedidos, CreateModalPedidos};