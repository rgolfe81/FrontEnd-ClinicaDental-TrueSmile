export const checkInputs = (name, data, required) => {
  switch (name) {
    case "name":
    case "surname":
    case "city":
      if (data === "" && required === true) {
        return {message: "El campo no puede estar vacío", validated: false};
      } else if (!/^[a-zA-ZáéíóúüñÑÁÉÍÓÚ ]*-?$/.test(data)) {
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
        return {message: "La contraseña debe tener al menos 6 caracteres", validated: false};
      }
      return {message: "", validated: true};

    case "phone":
      if (data === "" && required === true){
        return {message: "El campo no puede estar vacío", validated: false};
      } else if (!/^(?:\d{9})?$/.test(data)){
        return {message: "El formato del teléfono debe tener 9 dígitos"}
      }
      return {message: "", validated: true};
      break;

    case "dni":
      if (data === "" && required === true){
        return {message: "El campo no puede estar vacío", validated: false};
      } else if (!/^\d{8}[A-Z]$/.test(data) && !/^[XYZ]\d{7}[A-Z]$/.test(data)){
        return {message: "Formato DNI incorrecto", validated: false};
      }
      return {message: "", validated: true};
      break;

    case "dental_intervention_id":
      if (data === "" && required === true){
        return {message: "El campo no puede estar vacío", validated: false};
      } else if (!/^[1-8]$/.test(data)){
        return {message: "Tramientos 1-8 Indicados en Home", validated: false};
      }
      return {message: "", validated: true};

      case "doctor_id":
        if (data === "" && required === true){
          return {message: "El campo no puede estar vacío", validated: false};
        } else if (!/^(1|2)?$/.test(data)){
          return {message: "Dentista 1-2", validated: false};
        }
        return {message: "", validated: true};
      break;

    default:
      console.log("Campo de entrada no reconocido");
  }
};