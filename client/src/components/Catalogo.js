import React from "react";
import {ProductosLista} from "./Productos";
import { DataProvider } from "./context/Dataprovider";
import { Carrito } from "./Carrito"
import Navbar from "./navbar";
import "./Productos.css";

const Catalogo = () => {
    return (
      <DataProvider>
      <div className="Catalogo">
      <Navbar />
      <Carrito/>
      <ProductosLista />
      </div>
      </DataProvider>
    )
};

export default Catalogo;