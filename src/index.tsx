import { render } from "react-dom";
import { StrictMode } from "react";
import { ApolloProvider } from "@apollo/client";
import App from "./App";
import { client } from "./ApolloClient";

function prepareWorker() {
  if (process.env.NODE_ENV === "development") {
    const { worker } = require("./test-utils/browser");
    return worker.start();
  }
  return Promise.resolve();
}

const renderApp = () => {
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

prepareWorker().then(() => renderApp());
