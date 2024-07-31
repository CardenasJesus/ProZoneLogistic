import { useEffect, useState } from "react";
import { LoginFunc } from '../js/autenticathion';
import { useNavigate } from 'react-router-dom';
import toast, {Toaster} from "react-hot-toast";


function Login () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await LoginFunc(username, password);
            if (result) {
                // Solo muestra el mensaje de éxito y redirige si el resultado no es null
                toast.success('You have successfully logged in.');
                setTimeout(() => {
                    navigate('/dashboard');
                }, 3000);
            } else {
                // No se muestra ninguna notificación si el resultado es null (usuario es conductor)
                // Puedes opcionalmente mostrar una alerta o mensaje genérico si lo prefieres
                toast.error('Access denied. You do not have the required permissions.');
            }
        } catch (error) {
            console.error('Error logging in', error);
            toast.error('Invalid credentials, please try again.');
        }
    };
    useEffect(() => {
        const toggleButton = document.querySelector('[data-collapse-toggle="navbar-dropdown"]');
        const nabvar = document.getElementById('navbar-dropdown');
        const toggleButonDropdown = document.querySelector('[data-dropdown-toggle="dropdownNavbar"]');
        const dropdownNavbar = document.getElementById('dropdownNavbar');


        const handleToggle = () => {
            nabvar.classList.toggle('hidden');
            nabvar.classList.toggle('block');
        };
        const handleToggleDrop = () => {
            dropdownNavbar.classList.toggle('hidden');
            dropdownNavbar.classList.toggle('block');
        } 
        if (toggleButton && nabvar) {
            toggleButton.addEventListener('click', handleToggle);
        }
        if (toggleButonDropdown && dropdownNavbar) {
           toggleButonDropdown.addEventListener('click', handleToggleDrop);
        }
        // Cleanup function to remove the event listener
        return () => {
            if (toggleButton) {
                toggleButton.removeEventListener('click', handleToggle);
            }
            if (toggleButonDropdown) {
                toggleButonDropdown.removeEventListener('click', handleToggleDrop);
            }
        };
    }, []);
     

  return (
    <>
        <Toaster
        position="top-center"
        reverseOrder={false}
        />
       <section className="w-full h-full flex ">
            <nav className='w-full sm:w-1/3 h-screen bg-gray-900 flex flex-col justify-center text-center'>
               <div className="w-full top-0">
                <h1 className="font-bold text-center text-3xl text-white">Hi, welcome back!!</h1>
                <p className="font-semibold text-center text-md text-gray-200">Type your credentials to login</p>
               </div>
                <form className="w-full p-8 text-start" onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="email"  className="block mb-2 text-sm font-medium text-white ">Your email</label>
                        <input type="text" id="email" value={username} onChange={(e) => {setUsername(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name@example.com" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-white ">Your password</label>
                        <input type="password" id="password" value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder='********' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
                    </div>

                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Log in </button>
                </form>
            </nav>
            <nav className='w-2/3 h-screen  hidden sm:block'>
                <div className="fixed top-0 right-0">
                    <img src="/3.png" alt="logo" className="w-24 p-4" label="ProZoneLogistic"/>
                </div>
                <div className='flex justify-center content-center h-full'>
                    <dotlottie-player src="https://lottie.host/d17da449-5e03-425e-9ef4-4c90d10d76d7/ps1792B4mH.json" background="transparent" speed="0.5" loop autoplay></dotlottie-player>
                </div>
            </nav>
        </section>
    </>
  )
}
export default Login;
