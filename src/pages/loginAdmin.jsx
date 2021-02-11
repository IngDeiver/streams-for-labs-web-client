import react, { useState } from "react";
import AdminLoginButtom from "../components/adminLoginButtom";
import ReCAPTCHA from "react-google-recaptcha";

const LoginAdmin = () => {
  const [isHuman, setIsHuman] = useState(false);

  const onChange = (value) => {
    if (value) setIsHuman(true);
  };

  return (
    <>
      <AdminLoginButtom disabled={isHuman ? false : true} />
      <ReCAPTCHA
        sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY}
        onChange={onChange}
        onExpired={() => setIsHuman(false)}
      />
    </>
  );
};

export default LoginAdmin;
