import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { APIBASE } from '../js/urls';

const Register = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        telefono: "",
        email: "",
        password: "",
        status: false,
        fecha_ingreso: null,
        user: null,
        rol: 2,
        departamento: 1
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0];
        setFormData((formData) => ({ ...formData, fecha_ingreso: currentDate }));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);  // Verifica los datos que se están enviando
        axios.post(`${APIBASE}v1/api/employees/register/`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log('Success:', response.data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    return (
        <>
            <section className="w-full h-full flex ">
                <nav className='w-2/3 h-screen hidden sm:block bg-gray-900 flex justify-center content-center'>
                    <div className="absolute top-4 left-4">
                        <img src="/4.png" alt="Logo" className="w-24 p-4" />
                    </div>
                    <div className="flex justify-items-center content-center h-[84%]">
                        <dotlottie-player src="https://lottie.host/7259b971-7b8b-4bbf-a70a-8506df7816a7/19bAxgVxZj.json" background="transparent" speed="1" loop autoplay></dotlottie-player>
                    </div>
                </nav>
                <nav className='w-full sm:w-1/3 h-screen bg-gray-300/50 flex flex-col justify-center text-center'>
                    <div className="w-full top-0 mb-4">
                        <h1 className="font-bold text-center text-3xl text-gray-900">Get Started!!</h1>
                        <p className="font-semibold text-center text-md text-gray-400">Here you can create a New Account</p>
                    </div>
                    <form className="w-full p-8 text-start" onSubmit={handleSubmit}>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-1 group">
                                <label htmlFor="first_name_input" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">First Name:</label>
                                <input type="text" required id="first_name_input" name='nombre' onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div className="relative z-0 w-full mb-1 group">
                                <label htmlFor="last_name_input" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Last Name:</label>
                                <input type="text" id="last_name_input" required name='apellido' onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                        </div>
                        <div className="mb-1">
                            <label htmlFor="phone_input" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Phone:</label>
                            <input type="text" id="phone_input" name='telefono' required onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className="mb-1">
                            <label htmlFor="email_input" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Email:</label>
                            <input type="text" id="emial_input" name='email' required onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className="relative z-0 w-full mb-1 group">
                            <label htmlFor="password_input" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Password:</label>
                            <input type="password" id="password_input" required name='password' onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className="flex items-start p-8">
                            <div className="flex items-center h-5">
                                <p className='font-medium text-gray-800 text-sm'>Have an account? <Link to={"/"} ><span className='font-bold underline ml-2 text-blue-400 text-sm'>Sign In</span> </Link></p>
                            </div>
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign In</button>
                    </form>
                </nav>
            </section>
        </>
    );
}

export default Register;
