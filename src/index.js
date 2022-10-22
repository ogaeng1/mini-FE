import React from "react";
import ReactDOM from "react-dom/client";
import GlobalStyles from "./components/global/GlobalStyle";
import { Provider } from "react-redux";
import store from "./redux/modules/configStore";
import App from "./App";
import { CookiesProvider } from "react-cookie";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <CookiesProvider>
      <App />
      <GlobalStyles />
    </CookiesProvider>
  </Provider>
);