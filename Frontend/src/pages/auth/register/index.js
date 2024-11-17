import { Form, Input } from "antd";
import logo from "../../../images/logo.png";
import { Link } from "react-router-dom";
import "./index.scss";
import { useNavigate } from 'react-router-dom';
import { CloseOutlined } from "@ant-design/icons";
function Register() {
    const navigate = useNavigate();
    const handleClose = () => {
        navigate("/");
    }
  return (
    
    <div className="register">
        <div className="register__close" onClick={handleClose}><CloseOutlined /></div>
      <div className="register__logo">
        <img src={logo} alt="Logo" />
        <h1>Behance</h1>
      </div>
      <div className="register__form">
        <Form>
          <div className="register__title">
            <div>
              <h2>Tạo tài khoản</h2>
            </div>
            <div className="register__wwe23n">Or</div>
          </div>
          <div className="register__intro">
            <div className="register__ownhr0">Đăng ký với email</div>
            <div className="register__jons0d82">
              <span>Bạn đã có tài khoản?</span>
              <Link to="login" className="register__spectrum-link"> Đăng nhập</Link>
            </div>
          </div>
          <div className="login__input">
            <>
              <label>Email address</label>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please enter your email!" },
                  { type: "email", message: "The input is not valid E-mail!" },
                ]}
              >
                <Input type="email" placeholder="Enter your email" />
              </Form.Item>
            </>

            <>
              <label>Password</label>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please enter your password!" },
                ]}
              >
                <Input type="password" placeholder="Enter your password" />
              </Form.Item>
            </>
          </div>
          <button type="submit">Đăng ký</button>
        </Form>
      </div>
    </div>
  );
}
export default Register;
