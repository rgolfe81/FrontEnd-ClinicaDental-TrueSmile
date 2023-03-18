import React from "react";
import "./InputText.css";

export const InputText = ({
    className,
    type,
    placeholder,
    required,
    name,
    changeFunction,
    blurValidateFunction
}) => {
    return (
    <>
    <input
        className={className}
        type={type}
        placeholder={placeholder}
        required={required}
        name={name}
        // Se ejecuta cuando vamos cambiando el valor del input
        onChange={(e) => changeFunction(e)}
        // Se ejecuta cuando hacemos click fuera del input
        onBlur={(e) => blurValidateFunction(e)}
    />
    </>
    )
};