import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "antd/dist/antd.min.css";
import GameBasic from "./components/GameBasic"

ReactDOM.render(
  // StrictMode: 严格模式
  <React.StrictMode>
    <GameBasic />
  </React.StrictMode>,
  document.getElementById('root')
);
