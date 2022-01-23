import React from "react";
import "../styles/App.css";
import { Provider } from "react-redux";
import Layout from "./Layout";
import StoreDataInit from "./StoreDataInit";
import store from "../store/store";
import CreateClientFormInModal from "../containers/CreateClientForm/FormInModal";
import CreatePaymentFormInModal from "../containers/Register/CreatePaymentForm/CreatePaymentFormInModal";

const App = () => {
  return (
    <Provider store={store}>
      <StoreDataInit>
        <CreateClientFormInModal />
        <CreatePaymentFormInModal />
        <Layout />
      </StoreDataInit>
    </Provider>
  );
};

export default App;
