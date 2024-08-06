
import axios from "axios";
import { useEffect, useState } from "react";
import { APIBASE } from "../../../js/urls";

const FiltrosCategoria = ({getProductosCategoria, getProductos}) => {
    const [categorias, setCategorias] = useState([]);

    const getCategorias = async () => {
        try {
            const response = await axios.get(`${APIBASE}v1/api/categorias/`);
            setCategorias(response.data);
        }
        catch (error) {
            console.log('error', error);
        }
    }
    useEffect(() => {
        getCategorias();
    }, []);
    return (
        <>
       
        <section className="w-full flex justify-around">
        <button type="button" onClick={getProductos} className="text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 ">Mostrar todo</button>
            <div>
                <label htmlFor="cate" className="block mb-2 text-sm font-medium text-gray-900">Filtros por categoria</label>
                <select name="cate" id="cate" onChange={(e) => getProductosCategoria(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                <option value="" selected disabled>Selecciona una categoría</option>
                {
                    categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>{categoria.nombre_categoria}</option>
                    ))
                }
            </select>
            </div>

        </section>
        </>
    )
}
export default FiltrosCategoria;