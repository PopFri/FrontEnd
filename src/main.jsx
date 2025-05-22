import React from "react"; // React 임포트 추가
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // BrowserRouter 임포트 추가
import App from "./App.jsx";
import '../src/styles/common.css'
import '../src/styles/fonts/fonts.css'
import Header from "./components/Header.jsx";

createRoot(document.getElementById('root')).render(
      <App />
)
