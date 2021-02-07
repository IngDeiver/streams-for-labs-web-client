import react, { useState } from "react";
import LoginButtom from "../components/loginButtom";
import WithMessage from "../hocs/withMessage";
import ReCAPTCHA from "react-google-recaptcha";

// Login page
const Login = (props) => {
  const [isHuman, setIsHuman] = useState(false);

  const onChange = (value) => {
    if (value) setIsHuman(true);
  };
  
  return (
    <>
      <LoginButtom disabled={isHuman ? false : true}/>
      <ReCAPTCHA
        sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY}
        onChange={onChange}
      />
    </>
  );
};

export default WithMessage(Login);
