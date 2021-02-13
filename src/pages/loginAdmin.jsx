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
      <div className="my-5 d-flex flex-column align-items-center">
        <div className="border mx-5">
          <div className="d-flex flex-column align-items-center">
            <i
              class="fas fa-database mt-5"
              style={{ color: "#48dbfb", fontSize: 150 }}
            ></i>
            <h1>Streams For</h1>
            <h1>Lab</h1>
            <AdminLoginButtom disabled={isHuman ? false : true} />
          </div>
          
          <div className="d-flex flex-row justify-content-md-center my-3 mx-2">
            <ReCAPTCHA
              sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY}
              onChange={onChange}
              onExpired={() => setIsHuman(false)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginAdmin;
