import react, { useState } from "react";
import AzureLoginButtom from "../components/azureLoginButtom";
import WithMessage from "../hocs/withMessage";
import ReCAPTCHA from "react-google-recaptcha";
import AdminLoginButtom from '../components/adminLoginButtom'

// Login page
const Login = (props) => {
  const [isHuman, setIsHuman] = useState(false);

  const onChange = (value) => {
    if (value) setIsHuman(true);
  };
  
  return (
    <>
      <AzureLoginButtom disabled={isHuman ? false : true}/>
      <AdminLoginButtom disabled={isHuman ? false : true}/>
      <ReCAPTCHA
        sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY}
        onChange={onChange}
        onExpired={() => setIsHuman(false)}
      />
    </>
  );
};

export default WithMessage(Login);
