import {Outlet } from "react-router-dom";
import { Col, Input, Row } from "antd";
import "./layoutDefault.scss";
import { useNavigate } from "react-router-dom";
import deleteCookie from "../component/GetCookie/deleteCookie";
import getCookie from "../component/GetCookie/index";
import {useState, useEffect} from "react";
import { LogoutOutlined } from "@ant-design/icons";
import axios from "axios";

function LayoutDefault() {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);


  useEffect(() => {
    const tokenUser = getCookie("tokenUser");
    setToken(tokenUser);
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await axios.post("http://localhost:5000/api/user", {
        tokenUser: token,
      });
      setUser(response);
    }
      
      fetchApi();
  }, [token])

  const handleCategoryClick = (type) => {
    navigate(`/${type}`);
};
const handleLogout = () => {
  deleteCookie("tokenUser")
  setToken(null);
  navigate(`/login`);
  setUser(null);
}
if (!user || user.length === 0) {
  return null; // Hoặc hiển thị một loader, hoặc một thông báo lỗi
}

  return (
    <div className="layout-default">
      <header>
        <Row>
          <Col offset={16}></Col>
          <Col span={8}>
            <div className="header">
              <div className="header__invite">
              {user && user.data && user.data.email ? user.data.email : "Lưu công việc của bạn. Miễn phí!"}
              </div>
              {token ? (

        <button className="header__logout" onClick={handleLogout}>
          <LogoutOutlined /><span>Đăng xuất</span>
        </button>
      ) : (
   
        <>
          <button className="header__login" onClick={() => handleCategoryClick("login")}>
            Đăng nhập
          </button>
          <button className="header__register" onClick={() => handleCategoryClick("register")}>Đăng ký</button>
        </>
      )}
            </div>
          </Col>
        </Row>
      </header>
      <main>
        <Outlet/>
      </main>
      <footer>
      <div className="categorywrap">
       
          <a  className="categoryitem"><div onClick={() => handleCategoryClick("summarize")} ></div>Tóm tắt</a>
          <a  className="categoryitem"><div onClick={() => handleCategoryClick("translate")} ></div>Dịch</a>
          <a  className="categoryitem"><div onClick={() => handleCategoryClick("")} ></div>Ngữ pháp</a>
        </div>
      </footer>
    </div>
  );
}
export default LayoutDefault;
