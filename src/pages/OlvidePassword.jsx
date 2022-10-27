import React from "react";
import { useState } from "react";
import ImageLoginDesktop from "../assets/images/recuperarPassword.svg";
import IconWarning from "../assets/images/icon-warning.svg";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Spinner from "../components/Spinner";

//backend
import { forgotPassword } from "../services/controllerUser";

const OlvidePassword = () => {
  const [email, setEmail] = useState("");
  const [cargando, setCargando] = useState(false);
  const [invalid, setInvalid] = useState("");
  const [textResponse, setTextResponse] = useState("");
  const [textBadEmail, setTextBadEmail] = useState("hidden");
  const navigate = useNavigate();

  const handleValidarCodigo = async (e) => {
    setTextBadEmail("hidden");
    e.preventDefault();
    setCargando(true);
    let response = await forgotPassword(email);
    console.log(response);
    if (response.body.code === "auth/email-not-found") {
      console.log(response.body);
      setInvalid("invalid");
      setTextResponse("Correo electrónico no encontrado, porfavor intentelo de nuevo")
      setCargando(false);
      setTextBadEmail("");
    } else if (response.body.code === "auth/invalid-email") {
      setInvalid("invalid");
      setCargando(false);
      setTextResponse("Ingrese un correo válido")
      setTextBadEmail("");
    } else {
      console.log(response.body);
      setInvalid("");
      localStorage.setItem("email", email);
      setCargando(false);
      navigate("/restore/check/email");
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  return (
    <div className="mx-5 min-h-screen flex flex-col justify-between md:hidden">
      {/* div de la imagen */}
      <div className="bg-[#FCFBFF] bordeblur">
        <img className="mx-auto" src={ImageLoginDesktop} alt="Registros" />
      </div>

      {/* div del contenido */}
      <div className="flex flex-col gap-6">
        {/* div del copy web */}
        <div className="text-center flex flex-col items-center gap-10">
          <h1 className="m-0 med-title">¿Olvido su contraseña?</h1>
          <p className="nrm-text">
            No se preocupe, suele pasar. Por favor, ingrese su correo
            electrónico asociado
          </p>
        </div>

        {cargando ? (
          <Spinner />
        ) : (
          <form onSubmit={handleSubmit} id="resetpassword-form">
            <div className="flex flex-col gap-2 min-w-full">
              {/* <label className="text-[#4D3483] sml-title" htmlFor="email">
              Correo
            </label> */}
              <Input
                id="email-olvidePassword"
                type="email"
                value={email}
                name="email"
                onChange={handleChangeEmail}
                className={`${invalid}`}
                required={1}
                placeholder="Ingresar correo"
              />
              <div className={`flex flex-row ${textBadEmail}`}>
                <img src={IconWarning} alt="warning information" />
                <p className="invalid-text-small">
                  {textResponse}
                </p>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* div de los botones */}
      <div className="flex flex-col mb-5">
        <button
          type="submit"
          form="resetpassword-form"
          className="bg-[#7064FF] text-white nrm-button"
          onClick={handleValidarCodigo}
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default OlvidePassword;
