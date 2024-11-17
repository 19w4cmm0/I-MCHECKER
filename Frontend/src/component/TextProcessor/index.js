import "./TextProcessor.scss";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { PlusOutlined, CloseOutlined, DeleteOutlined, CopyOutlined } from "@ant-design/icons";
import { message } from "antd";
import  getCookie  from "../../component/GetCookie/index";

function TextProcessor(props) {
  const { title , apiget, apiType, apiSave, type, buttonLabel, targetLanguage } = props;
  const textareaRef = useRef(null); // Create a single ref for all textareas
  const [textAreas, setTextAreas] = useState([{ id: Date.now(), text: "", result: null, status: "normal" }]);
  const [user, setUser] = useState();
  const [grammar, setGrammar] = useState();
 

  const tokenUser = getCookie('tokenUser');
  useEffect(() => {
    const fetchApi = async () => {
      const response = await axios.post("http://localhost:5000/api/user", {
        tokenUser: tokenUser,
      });
      setUser(response);
    }
    if(tokenUser) {
      
      fetchApi();
      
      
    }
  }, [tokenUser])
  useEffect(() => {
    const fetchApiGrammar = async () => {
      const response = await axios.post(`http://localhost:5000/api/${apiget}`, {
        userId: user.data._id,
      });
      setGrammar(response);
    }
    if(user) {
      fetchApiGrammar();
    }
  }, [user])

  useEffect(() => {
    if (grammar && grammar.data.length > 0) {
      const formattedGrammar = grammar.data.map((item) => ({
        id: item._id,
        text: item.content,
        result: item.result,
        status: "success"
      }));
      setTextAreas((prevTextAreas) => [...formattedGrammar, ...prevTextAreas]);
    }
  }, [grammar]);

  const handleGrammar = async (id) => {
    setTextAreas((prevTextAreas) =>
      prevTextAreas.map((area) =>
        area.id === id
          ? { ...area, status: "load" }
          : area
      )
    );
    try {
      const response = await axios.post(`http://localhost:5000/api/text/${apiType}`, {
        text: textAreas.find((area) => area.id === id).text,
        ...(targetLanguage && { targetLanguage: "English" })
      });
      if (response) {
        const result = response.data.result; 
        setTextAreas((prevTextAreas) =>
          prevTextAreas.map((area) =>
            area.id === id
              ? { ...area, result: response.data.result, status: "success" }
              : area
          )
        );
        if (tokenUser) {
        await axios.post(`http://localhost:5000/api/${apiSave}`, {
          _id: textAreas.find((area) => area.id === id).id,
          content: textAreas.find((area) => area.id === id).text,
          result:  result,
          userId: user.data._id
        });
      }
      }
      
    } catch (error) {
      console.error(error);
    }
  };

  const handleDismiss = (id) => {
    setTextAreas((prevTextAreas) =>
      prevTextAreas.map((area) =>
        area.id === id
          ? { ...area, text: "", result: "", status: "normal" }
          : area
      )
    );

  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    message.success("Copy success!");
  };

  const handleChange = (id) => {
    setTextAreas((prevTextAreas) =>
      prevTextAreas.map((area) =>
        area.id === id
          ? { ...area, text: area.result.replace(/^"(.*)"$/, "$1"), result: "", status: "normal" }
          : area
      )
    );
  };

  const addMainwork = () => {
    setTextAreas((prevTextAreas) => [
      ...prevTextAreas,
      { id: Date.now(), text: "", result: null, status: "normal" },
    ]);
  };

  const deleteMainwork = async (id) => {
    if (textAreas.length > 1) {
    setTextAreas((prevTextAreas) => prevTextAreas.filter((area) => area.id !== id));
    }
    await axios.delete(`http://localhost:5000/api/${type}/delete${type}/${id}`);
  };

  const handleTextChange = (id, newText) => {
    setTextAreas((prevTextAreas) =>
      prevTextAreas.map((area) =>
        area.id === id ? { ...area, text: newText } : area
      )
    );
  };

  return (
    <div className="container">
      <div className="check">
        <div className="check__logo">
          <h1>{title}</h1>
        </div>
        <div className="check__introduce">
          Cải thiện văn bản của bạn với công cụ miễn phí tiên tiến này.
        </div>
        {textAreas.map((area) => (
          <div key={area.id} className="check__mainwork">
            <div className="check__left">
              <div className="check__top">
                <div className="check__input">
                  <textarea
                    ref={textareaRef} // Use the single ref here
                    className="check__textarea"
                    placeholder="Gõ hoặc dán văn bản của bạn vào đây"
                    value={area.text}
                    onChange={(e) => handleTextChange(area.id, e.target.value)}
                  ></textarea>
                  {area.result && <p className="check__result">{area.result}</p>}
                </div>
                <div className="check__delete"></div>
              </div>
              <div className="check__bottom">
                <button
                  className="check__button-one"
                  onClick={
                    area.status === "normal"
                      ? () => handleGrammar(area.id)
                      : () => handleChange(area.id)
                  }
                >
                  {area.status === "normal"
                    ? buttonLabel
                    : area.status === "success" && "Chấp nhận"}
                </button>
                {area.status === "success" && (
                  <span
                    onClick={() => handleDismiss(area.id)}
                    className="check__dismiss"
                  >
                    Dismiss
                  </span>
                )}
                {area.status === "load" && (
                  <span>Khai thác sức mạnh của trí tuệ nhân tạo...</span>
                )}
              </div>
            </div>
            <div className="check__right">
              <div className="check__button-top">
                {area.text ? (
                  <div>
                    <button
                      className="check__button-delete button-right"
                      onClick={() => handleDismiss(area.id)}
                    >
                      <DeleteOutlined />
                    </button>
                    <button
                      className="check__button-delete button-right"
                      onClick={() => handleCopy(area.text)}
                    >
                      <CopyOutlined />
                    </button>
                  </div>
                ) : (
                  <button
                    className="check__button-delete button-right"
                    onClick={() => deleteMainwork(area.id)}
                  >
                    <CloseOutlined />
                  </button>
                )}
              </div>
              <div className="check__button-bottom">
                <button
                  className="check__button-add button-right"
                  onClick={addMainwork}
                >
                  <PlusOutlined />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TextProcessor;
