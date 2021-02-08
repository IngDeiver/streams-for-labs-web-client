import react from "react";
import WithMessage from "../hocs/withMessage";
import {msalInstance, scopes} from '../util/auth'


// Buttom for login with office
const LoginButtom = ({showMessage, disabled}) => {

  // Login user with UPB credentials
  const login = async () => {
    try {
      const acces_token = await msalInstance.loginPopup({scopes});
      console.log(acces_token)
      window.location.replace("/");
    } catch (err) {
      console.log(err)
      showMessage("Error al iniciar sesión", "error")
    }
  };

  return (
    <>
      <button disabled={disabled} onClick={login}>Login with office</button>
    </>
  );
};

export default WithMessage(LoginButtom);
