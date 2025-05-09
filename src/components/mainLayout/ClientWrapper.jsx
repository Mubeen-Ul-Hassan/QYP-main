// components/ClientWrapper.js
"use client"; // This is a client-side component

import { Provider } from "react-redux";
import { store } from "@/components/Redux/Store";
import MainLayout from "@/components/mainLayout/mainLayout";
import { I18nextProvider } from "react-i18next";
import i18n from "../language-change/i18n";

const ClientWrapper = ({ children }) => {
  return (
    <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <MainLayout>{children}</MainLayout>
    </Provider>
    </I18nextProvider>
  );
};

export default ClientWrapper;
