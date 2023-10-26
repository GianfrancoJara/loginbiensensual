import React from "react";
import {ProductosLista} from "./Productos";
import { Carrito } from "./Carrito";
import { DataProvider } from "./context/Dataprovider";
import Navbar from "./navbar";
import "./Productos.css";

const Catalogo = () => {
    return (
      <DataProvider>
      <div className="Catalogo">
      <Navbar />
       <ProductosLista />
       <Carrito />
      </div>
      </DataProvider>
    )
};

export default Catalogo;