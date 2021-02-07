import react from "react";
import WithMessage from "../hocs/withMessage";
import {msalInstance, logout, scopes} from '../util/auth'


// Buttom for login with office
const LoginButtom = (props) => {
  const {showMessage} = props

  // Login user with UPB credentials
  const login = async () => {
    try {
      await msalInstance.loginPopup({scopes});
      showMessage("Welcome")
    } catch (err) {
      showMessage("Error al iniciar sesión", "error")
    }
  };

  return (
    <>
      <button onClick={login}>Login with office</button>
      {/* <button onClick={logout}>Logout with office</button> */}
    </>
  );
};

export default WithMessage(LoginButtom);
