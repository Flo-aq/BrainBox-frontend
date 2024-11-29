
import FormInput from "../FormInput/FormInput";
import { useState } from "react";
import "./LogInForm.css";

const LogInForm = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "text",
      placeholder: "juanito@correo.com",
      label: "Correo",
      required: true,
      pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
      errorMessage: "El correo no es válido. No debe contener espacios y debe seguir el formato nombre@dominio.com",
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Contraseña1#",
      label: "Contraseña",
      required: true,
      pattern: ".{1,}",  // A pattern that matches any non-empty string
      errorMessage: "La contraseña no puede estar vacía",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your form submission logic here
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

    const input = inputs.find((input) => input.name === name);

    if (input) {
      let isValid;
      if (input.pattern) {
        isValid = input.pattern ? new RegExp(input.pattern).test(value) : true;
      } else {
        isValid = true;
      }
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: isValid ? "" : input.errorMessage,
      }));
    }
  };

  const isFormValid = Object.values(errors).every((error) => error === "") && inputs.every((input) => !input.required || (values[input.name] !== ""));

  return (
    <form className="log-in-form" onSubmit={handleSubmit}>
      <h1>Log in</h1>
      {inputs.map((input) => (
        <FormInput
          {...input}
          key={input.id}
          value={values[input.name]}
          onChange={onChange}
          className={`LogInForm ${input.name}`}
          errorMessage={errors[input.name]}
          show="show"
        />
      ))}
      <div className="sign-up-span">
        <div className="text1">¿No tienes una cuenta?</div>
        <a className="log-in-reference" href="/sign-up">Crea una cuenta</a>
      </div>
      <button className="boton-2 submitLogInForm" type="submit" disabled={!isFormValid}>Iniciar sesión</button>
    </form>
  );
};

export default LogInForm;