import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import configureStore from "./redux/store/configure-store";
import "./assets/scss/indexStyle.scss";
import { BreakpointProvider, setDefaultBreakpoints } from "react-socks";
import { CookiesProvider } from "react-cookie";
import { PersistGate } from "redux-persist/integration/react";

setDefaultBreakpoints([
  { xsmall: 0 }, // all mobile devices
  { small: 576 }, // mobile devices (not sure which one's this big)
  { medium: 768 }, // ipad, ipad pro, ipad mini, etc
  { large: 992 }, // smaller laptops
  { xlarge: 1200 } // laptops and desktops
]);

const { store, persistor } = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <CookiesProvider>
        <BreakpointProvider>
          <App />
        </BreakpointProvider>
      </CookiesProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
