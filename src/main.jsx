import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import configureStore from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={configureStore()}>
        <App />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
