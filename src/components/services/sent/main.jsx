import InsertChartIcon from '@mui/icons-material/InsertChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import InsightsIcon from '@mui/icons-material/Insights';


const Main = () =>{
    return(
      <>
      <section className=''>
        <div className='py-14'>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 text-center ml-20"> 
                <div className="bg-white p-4 shadow-lg rounded-lg w-full border-2 border-gray-200">
                    <dt className="flex justify-around content-center  items-center w-full">
                        <p className="font-bold text-sm">+ 23 k</p>
                        <h1 className="text-xl font-bold mx-4">Envios activos</h1>
                        <InsertChartIcon />
                    </dt>
                    <dt className='p-2 w-full h-auto'>
                        {/* Aqui va el contenido de la base de datos */}
                        <div className='p-4 bg-gray-200 mb-4 rounded-2xl'>
                        <h1 className='font-bold text-lg text-green-700'>Envio No. VARIABLE</h1>
                        <p>Aqui van segun la base de datos.</p>
                        </div>
                        
                    </dt>
                    
                </div>
                <div className="bg-white p-4 shadow-lg rounded-lg w-full border-2 border-gray-200">
                    <dt className="flex justify-around content-center  items-center w-full">
                        <p className="font-bold text-sm">+ 21 k</p>
                        <h1 className="text-xl font-bold mx-4">Envios completados</h1>
                        <PieChartIcon />
                    </dt>
                    <dt className='p-2 w-full h-auto'>
                        {/* Aqui va el contenido de la base de datos */}
                        <div className='p-4 bg-gray-200 mb-4 rounded-2xl'>
                        <h1 className='font-bold text-lg text-green-700'>Envio No. VARIABLE</h1>
                        <p>Aqui van segun la base de datos.</p>
                        </div>
                    </dt>
                </div>
                <div className="bg-white p-4 shadow-lg rounded-lg w-full border-2 border-gray-200">
                    <dt className="flex justify-around content-center  items-center w-full ">
                        <p className="font-bold text-sm">+ 10</p>
                        <h1 className="text-xl font-bold mx-4">Vehiculos en uso.</h1>
                        <InsightsIcon />
                    </dt>
                    <dt className='p-2 w-full h-auto'>
                        {/* Aqui va el contenido de la base de datos */}
                        <div className='p-4 bg-gray-200 mb-4 rounded-2xl'>
                        <h1 className='font-bold text-lg text-green-700'>Envio No. VARIABLE</h1>
                        <p>Aqui van segun la base de datos.</p>
                        </div>
                    </dt>
                </div>
            </div>
            
        </section>
      </>
    )
}

export default Main;