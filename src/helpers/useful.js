export const checkInputs = (name, data, required) => {
  switch (name) {
    case "name":
    case "surname":

      if (data === "" && required === true) {      
        return {message: "El campo no puede estar vacío", validated: false};
      } else if (!/[a-z]/gi.test(data)) {
        return {message: "El valor introducido no es correcto", validated: false};
      }
      return {message: "", validated: true};

    case "email":
      if (data === "" && required === true) {
        return {message: "El campo no puede estar vacío", validated: false};
      } else if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data)
      ) {
        return {message: "Formato de email inválido", validated: false};
      }
      return {message: "", validated: true};

    case "password":
      if (data === "" && required === true) {
        return {message: "El campo no puede estar vacío", validated: false};
      } else if (data.length < 6) {
        return {message: "La contraseña debe tener al menos 6 dígitos", validated: false};
      }
      return {message: "", validated: true};

    case "phone":
    case "tfno":
    case "telefono":
    case "phonenumber":
      break;

    case "dni":
    case "document":
    case "nif":
      break;

    default:
      console.log("Campo de entrada no reconocido");
  }
};