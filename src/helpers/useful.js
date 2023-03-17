export const checkInputs = (e, credenciales, setCredencialesError, setIsEmailValid, setIsPasswordValid) => {
    switch (e.target.name) {     
      case "email":
        const regExpEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (regExpEmail.test(credenciales.email)) {
          setCredencialesError((preveState) => ({...preveState,emailError: ""}));
          setIsEmailValid(true);
        } else {
          setCredencialesError((preveState) => ({...preveState,emailError: "Debes introducir un formato válido de email"}));
          setIsEmailValid(false);
        }
        break;
      case "password":
        if (credenciales.password.length < 8) {
          setCredencialesError((preveState) => ({...preveState,passwordError: "Debes introducir mínimio 8 caracteres"}))
          setIsPasswordValid(false);
        } else {
          setCredencialesError((preveState) => ({...preveState,passwordError: ""}))
          setIsPasswordValid(true);
        }
        break;
    }
  };