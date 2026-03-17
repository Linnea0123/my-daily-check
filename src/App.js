import React, { useState, useEffect } from "react";
import "./App.css";

const defaultDepartments = {
  finance: 50,
  health: 50,
  learning: 50,
  social: 50,
  hobby: 50,
};

function App() {
  const [departments, setDepartments] = useState(() => {
    // 尝试从 localStorage 读取数据
    const saved = localStorage.getItem("departments");
    return saved ? JSON.parse(saved) : defaultDepartments;
  });

  useEffect(() => {
    localStorage.setItem("departments", JSON.stringify(departments));
  }, [departments]);

  const increase = (key) => {
    setDepartments((prev) => ({
      ...prev,
      [key]: Math.min(prev[key] + 10, 100),
    }));
  };

  const decrease = (key) => {
    setDepartments((prev) => ({
      ...prev,
      [key]: Math.max(prev[key] - 10, 0),
    }));
  };

  return (
    <div className="App">
      <h1>🏛️ 我的个人国家</h1>
      <div className="departments">
        {Object.entries(departments).map(([key, value]) => (
          <div className="dept" key={key}>
            <h2>{{
              finance: "财政部",
              health: "国防部",
              learning: "教育部",
              social: "外交部",
              hobby: "文化部"
            }[key]}</h2>
            <div className="progress">
              <div
                className="bar"
                style={{ width: `${value}%` }}
              >{value}%</div>
            </div>
            <div className="buttons">
              <button onClick={() => increase(key)}>+10</button>
              <button onClick={() => decrease(key)}>-10</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
