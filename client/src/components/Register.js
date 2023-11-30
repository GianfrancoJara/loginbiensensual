import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
const Register = ({ setAuth }) => {
  const history = useHistory();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: ""
  });

  const { email, password, name } = inputs;

  const onChange = e => setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { email, password, name };
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(body)
      });
      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(parseRes.newUser.autoridad);
        toast.success("Registro exitoso");
        window.location.reload();
      } else {
        toast.error(parseRes);
        setAuth("visita");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <div className="auth-form-container">
        <h1 className="auth-title">Registro</h1>
        <form onSubmit={onSubmitForm}>
          <div className="form-group">
            <input
              type="text"
              name="email"
              value={email}
              placeholder="Correo Electrónico"
              onChange={e => onChange(e)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Contraseña"
              onChange={e => onChange(e)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Nombre completo"
              onChange={e => onChange(e)}
              className="form-control"
            />
          </div>
          <button className="btn btn-success btn-block">Registrarse</button>
        </form>
        <div className="auth-link-container">
          <Link to="/login" className="auth-link">¿Ya tienes una cuenta? Inicia sesion</Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
