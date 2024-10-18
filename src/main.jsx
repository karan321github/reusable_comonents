import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Store/store.js";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GoogleOAuthProvider
      clientId="
281396633569-5icnf3337mbcs20kv55lmqahbfk1u96c.apps.googleusercontent.com"
    >
      <StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </StrictMode>
    </GoogleOAuthProvider>
  </BrowserRouter>
);
