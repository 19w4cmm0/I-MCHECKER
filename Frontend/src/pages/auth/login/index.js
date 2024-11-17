import { Form } from "antd";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./index.scss";
import logo from "../../../images/logo.png";
import { checkLogin } from "../../../services/userServices";
import { useNavigate } from 'react-router-dom';
import { CloseOutlined } from "@ant-design/icons";

function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleFinish = async (values) => {

    try {
      const resUser = await checkLogin(values);
      
      if (resUser.code === 200) {

          navigate("/");
        } 
       else if(resUser.code === 401) {
          // Hiển thị lỗi mật khẩu không đúng
          form.setFields([
            {
              name: 'password',
              errors: ['Sai mật khẩu!'],
            },
          ]);
        }
       else {
        // Hiển thị lỗi không tìm thấy tài khoản
        form.setFields([
          {
            name: 'email',
            errors: ['Không tìm thấy tài khoản!'],
          },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = () => {
      navigate("/");
  }

  return (
    <div className="login">
      <div className="login__close" onClick={handleClose}><CloseOutlined /></div>
      <div className="login__logo">
        <img src={logo} alt="Logo" />
        <h1>Behance</h1>
      </div>
      <div className="login__form">
        <Form form={form} onFinish={handleFinish}>
          <div className="login__title">
            <div>
              <h2>Đăng nhập</h2>
              <span>
                Tài khoản mới?<NavLink to="#">Create an account</NavLink>
              </span>
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
                <input
                  type="email"
                  placeholder="Enter your email"
                />
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
                <input
                  type="password"
                  placeholder="Enter your password"
                />
              </Form.Item>
            </>
          </div>
          <button type="submit">Đăng nhập</button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
