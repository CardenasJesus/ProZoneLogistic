import InsertChartIcon from '@mui/icons-material/InsertChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import InsightsIcon from '@mui/icons-material/Insights';
import CardWelcome from './card_Wlcome';

const Dash = () =>{
    return(
        <>
        <section className=''>
           <div className='py-16'>
            <CardWelcome />
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 text-center ml-24 mt-12"> 
                <div className="bg-white p-4 shadow-lg rounded-lg w-full border-2 border-gray-200">
                    <dt className="flex justify-around content-center  items-center w-full">
                        <p className="font-bold text-sm">+ 23.3</p>
                        <h1 className="text-xl font-bold mx-4">Total de peticiones</h1>
                        <InsertChartIcon />
                    </dt>
                    <dt className='p-2'>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates libero numquam quo commodi quas voluptatibus, laudantium quod nulla eaque tempore assumenda quaerat in saepe ad fugit accusantium, eveniet minus deleniti.</p>
                        <p className='w-full flex justify-center text-center content-center '>
x                        </p>
                    </dt>
                </div>
                <div className="bg-white p-4 shadow-lg rounded-lg w-full border-2 border-gray-200">
                    <dt className="flex justify-around content-center  items-center w-full">
                        <p className="font-bold text-sm">+ 145</p>
                        <h1 className="text-xl font-bold mx-4">Total de envios</h1>
                        <PieChartIcon />
                    </dt>
                    <dt className='p-2'>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates libero numquam quo commodi quas voluptatibus, laudantium quod nulla eaque tempore assumenda quaerat in saepe ad fugit accusantium, eveniet minus deleniti.</p>
                    </dt>
                </div>
                <div className="bg-white p-4 shadow-lg rounded-lg w-full border-2 border-gray-200">
                    <dt className="flex justify-around content-center  items-center w-full ">
                        <p className="font-bold text-sm">+ 2k</p>
                        <h1 className="text-xl font-bold mx-4">Total de productos</h1>
                        <InsightsIcon />
                    </dt>
                    <dt className='p-2'>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates libero numquam quo commodi quas voluptatibus, laudantium quod nulla eaque tempore assumenda quaerat in saepe ad fugit accusantium, eveniet minus deleniti.</p>
                    </dt>
                </div>
            </div>
            
        </section>
        </>
    )
}

export default Dash;