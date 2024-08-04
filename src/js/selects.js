import axios from "axios"
import { APIBASE } from "./urls"

const getAlmacenes = () =>{
    const response = axios.get(`${APIBASE}v1/api/almacen/`)
    .then((response) => {
        return response.data
    })
    .catch((error) => {
        console.log(error)
    })
}
const getProveedores = () =>{
    const response = axios.get(`${APIBASE}v1/api/proveedor`)
    .then((response) => {
        return response.data
    })
    .catch((error) => {
        console.log(error)
    })
}
const getProductos = () =>{
    const response = axios.get(`${APIBASE}v1/api/productos/`)
    .then((response) => {
        return response.data
    })
    .catch((error) => {
        console.log(error)
    })
}

export {getAlmacenes, getProveedores, getProductos}