import React from "react";
import "./InputText.css";

export const InputText = ({
    type,
    placeholder,
    name,
    changeFunction,
    validateFunction
}) => {
    return (
    <>
    <input className="inputTextDesign"
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={(e) => changeFunction(e)}
        onBlur={(e) => validateFunction(e)}
    />
    </>
    )
};