import React, { Fragment, useState } from "react";
import { Link, useHistory} from "react-router-dom";
import { toast } from "react-toastify";

const Login = ({ setAuth }) => {
  const history = useHistory();
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const { email, password } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch(
        "http://localhost:5000/auth/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );

      if (response.headers.get("Content-Type") && response.headers.get("Content-Type").includes("application/json")) {
        const parseRes = await response.json();
        if (parseRes.token) {
          localStorage.setItem("token", parseRes.token);
          setAuth(true);
          toast.success("Logged in Successfully");
          history.push("/");
          window.location.reload();
        } else {
          setAuth("visita");
          toast.error(parseRes);
        }
       
      } else {
        // La respuesta no es JSON válido, maneja el error aquí (puede ser una respuesta HTML)
        console.error("La respuesta no es JSON válido");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <div className="login-container">
  <h1 className="mt-5 mb-4 text-center">Login</h1>
  <form onSubmit={onSubmitForm}>
    <input
      type="text"
      name="email"
      value={email}
      onChange={e => onChange(e)}
      className="form-control mb-3"
      placeholder="Correo Electrónico"
    />
    <input
      type="password"
      name="password"
      value={password}
      onChange={e => onChange(e)}
      className="form-control mb-3"
      placeholder="Contraseña"
    />
    <button className="btn btn-success btn-block">Iniciar Sesión</button>
  </form>
  <Link to="/register" className="auth-link">Registrarse</Link>
<Link to="/recuperar-contraseña" className="auth-link">Recuperar Contraseña</Link>
</div>

    </Fragment>
  );
};

export default Login;