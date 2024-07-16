// ColaboradoresContext.js
import { createContext, useState, useContext } from 'react';

const ColaboradoresContext = createContext();

export const ColaboradoresProvider = ({ children }) => {
    const [colaboradores, setColaboradores] = useState([]);

    return (
        <ColaboradoresContext.Provider value={{ colaboradores, setColaboradores }}>
            {children}
        </ColaboradoresContext.Provider>
    );
};

export const useColaboradores = () => useContext(ColaboradoresContext);
