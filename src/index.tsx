import { render } from "react-dom";
import React, { StrictMode } from "react";
import { ApolloProvider } from "@apollo/client";
import App from "./App";
import { client } from "./ApolloClient";
const renderApp = () => {
  if (process.env.NODE_ENV === "development") {
    console.log(process.env.NODE_ENV);
    const { worker } = require("./mocks/browser");
    worker.start();
  }

  const rootElement = document.getElementById("root");
  render(
    <StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </StrictMode>,
    rootElement
  );
};
renderApp();
