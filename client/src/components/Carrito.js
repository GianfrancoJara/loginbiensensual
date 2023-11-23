import React, { useContext } from "react";
import { DataContext } from "./context/Dataprovider";
import "./cliente/Productos.css";

export const Carrito = () => {
  const value = useContext(DataContext);
  const [menu, setMenu] = value.menu;
  const [carrito, setCarrito] = value.carrito;
  const [total] = value.total;

  const crearOrden = async () => {
	try {
	  let body = JSON.parse(localStorage.getItem('dataCarrito'));
	  const res = await fetch("http://localhost:5000/pago/crear-orden", {
		method: "POST",
		headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
	  });
	  const parseRes = await res.json();
	  console.log(parseRes);
	  let redireccionPago = parseRes.init_point;
	  if(redireccionPago){
		window.location.replace(redireccionPago);
	  }
	} catch (err) {
	  console.error(err.message);
	}
  };

  const onClickPayment = () =>{
	crearOrden();
  }

  const toggleFalse = () => {
    setMenu(false);
  };

  const reduce = (codigo) => {
    carrito.forEach((item) => {
      if (item.codigo === codigo) {
        item.cantidad === 1 ? (item.cantidad = 1) : (item.cantidad -= 1);
      }
      setCarrito([...carrito]);
    });
  };

  const increase = (codigo) => {
    carrito.forEach((item) => {
      if (item.codigo === codigo) {
        item.cantidad += 1;
      }
      setCarrito([...carrito]);
    });
  };

  const removeProducto = (codigo) => {
    if (window.confirm("¿Quieres quitar el producto?")) {
      carrito.forEach((item, index) => {
        if (item.codigo === codigo) {
          item.cantidad = 1;
          carrito.splice(index, 1);
        }
      });
      setCarrito([...carrito]);
    }
  };

  const show1 = menu ? "carritos show" : "carrito";
  const show2 = menu ? "carrito show" : "carrito";

  return (
    <div className={show1}>
      <div className={show2}>
        <div onClick={toggleFalse} className="carrito__close">
          {/* Icono de cerrar */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-x"
            viewBox="0 0 16 16"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </div>
        <h2 className="carrito__title">Su Carrito</h2>
        <div className="carrito__center">
          {carrito.length === 0 ? (
            <h2 className="carrito__empty">Carrito Vacío</h2>
          ) : (
            <>
              {carrito.map((producto) => (
                <div className="carrito__item" key={producto.codigo}>
                  <img
                    src={producto.imageUrl}
                    alt={producto.nombre}
                    className="carrito__item-image"
                  />
                  <div className="carrito__item-details">
                    <h3 className="carrito__item-name">{producto.nombre}</h3>
                    <p className="carrito__item-price">${producto.precio}</p>
                  </div>
                  <div className="carrito__item-actions">
                    {/* Iconos de aumentar y reducir cantidad */}
                    <svg
                      
                      onClick={() => reduce(producto.codigo)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="bi bi-caret-down"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z" />
                    </svg>
                    <p className="cantidad">{producto.cantidad}</p>
                    <svg
                      
                      onClick={() => increase(producto.codigo)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="bi bi-caret-up"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.204 11h9.592L8 5.519 3.204 11zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z" />
                    </svg>
                  </div>
                  <div
                    onClick={() => removeProducto(producto.codigo)}
                    className="remove__item"
                  >
                    {/* Icono de eliminar producto */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                    </svg>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        <div className="carrito__footer">
          <h3>Total: ${total}</h3>
          <button className="btn btn-pagar" onClick={onClickPayment}>Pagar</button>
        </div>
      </div>
    </div>
  );
};
