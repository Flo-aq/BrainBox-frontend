import FormInput from "../FormInput/FormInput";
import { useState } from "react";
import "./SignUpForm.css";

const SignUpForm = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Juanito",
      errorMessage:
        "El nombre de usuario debe tener entre 3 y 16 números y/o letras",
      label: "Nombre de usuario",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: false,
    },
    {
      id: 2,
      name: "email",
      type: "text",
      placeholder: "juanito@correo.com",
      errorMessage: "El correo no es válido. No debe contener espacios y debe seguir el formato nombre@dominio.com",
      label: "Correo",
      pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Contraseña1#",
      errorMessage:
        "La contraseña debe tener de 8 a 20 caracteres y debe contener al menos una letra, un número y un carácter especial.",
      label: "Contraseña",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Contraseña",
      errorMessage: "La contraseña no coincide",
      label: "Confirmar contraseña",
      pattern: values.password,
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your form submission logic here
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  
    // Validate input value
    const input = inputs.find((input) => input.name === name);
    if (input) {
      let isValid;
      if (name === "confirmPassword") {
        isValid = value === values.password;
      } else {
        isValid = input.pattern ? new RegExp(input.pattern).test(value) : true;
      }
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: isValid ? "" : input.errorMessage,
      }));
    }
  
    // Revalidate confirmPassword if password changes
    if (name === "password") {
      const confirmPasswordInput = inputs.find((input) => input.name === "confirmPassword");
      if (confirmPasswordInput) {
        const isConfirmPasswordValid = values.confirmPassword === value;
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: isConfirmPasswordValid ? "" : confirmPasswordInput.errorMessage,
        }));
      }
    }
  };
  // Check if there are any errors
  const isFormValid = Object.values(errors).every((error) => error === "") &&
  inputs.every((input) => !input.required || (values[input.name] !== ""));

  return (
    <form className="sign-up-form" onSubmit={handleSubmit}>
      <h1>Register</h1>
      {inputs.map((input) => (
        <FormInput
        {...input}
        key={input.id}
        value={values[input.name]}
        onChange={onChange}
        errorMessage={errors[input.name]} // Pass error message here
        className={`SignUpForm ${input.name}`}
        show="show"
        />
      ))}
      <div className="log-in-span">
        <div className="text1">¿Ya tienes una cuenta?</div>
        <a className="log-in-reference" href="/log-in">Inicia sesión</a>
      </div>
      <button className="boton-2 submitSignUpForm" type="submit" disabled={!isFormValid}>Submit</button>
    </form>
  );
};

export default SignUpForm;
