const CardWelcome = () =>{
    return(
        <>
        <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 justify-center items-center content-center"> 
                <div className='bg-green-300 rounded-xl grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 text-center conten-center text-center p-2'>
                    <nav className="p-8">
                        <h1 className="font-bold text-3xl py-4">Hola Bienvenido!!</h1>
                        <p className="text-lg font-medium">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae quidem quae </p>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm p-2 flex mt-8">
                            Estadisticas
                            <svg className="w-5 h-5 text-white mx-2 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4"/>
                            </svg>
                        </button>
                    </nav>
                    <dt className="w-full flex justify-center content-center items-center text-center"><img src="/welcome.svg" alt="welcome" className="p-8 " /></dt>
                </div>
                <div className='w-full h-fit flex justify-center text-center py-8'>
                    <div
                        className="group flex flex-col justify-start items-start gap-2 w-96 h-56 duration-500 relative rounded-lg p-4 bg-purple-500 hover:-translate-y-2 hover:shadow-xl shadow-purple-400"
                        >
                        <div
                            className="absolute duration-700 shadow-md group-hover:-translate-y-4 group-hover:translate-x-4 -bottom-10 -left-10 w-2/6 h-1/2 rounded-lg bg-purple-400"
                            alt="image here"
                        ></div>

                        <div className="">
                            <h2 className="text-2xl font-bold mb-2 text-white">Conoce Tu administracion</h2>
                            <p className="text-gray-200 line-clamp-3">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean convallis
                            magna quis lectus fermentum, quis scelerisque orci pellentesque. Duis id
                            porta justo. Sed ac enim id justo tincidunt hendrerit id ac lectus.
                            Pellentesque maximus posuere tortor vitae consequat.
                            </p>
                        </div>
                        <div className="w-full flex justify-end">
                        <button
                            className="hover:bg-purple-400 bg-purple-600 text-white mt-6 rounded p-2 px-6"
                        >
                            Explora
                        </button>
                        </div>
                    </div>
                </div>
        </div>
        </>
    )
}

export default CardWelcome