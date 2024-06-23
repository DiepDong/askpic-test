import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
// Mantine styles
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css"
import "./index.css";
import '@mantine/dropzone/styles.css'
import "@mantine/tiptap/styles.css"
import 'react-image-crop/dist/ReactCrop.css';
import '@mantine/notifications/styles.css';
import "react-image-crop/dist/ReactCrop.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
