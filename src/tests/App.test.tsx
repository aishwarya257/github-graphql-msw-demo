import { render, screen } from "@testing-library/react";
import { client } from "../ApolloClient";
import App from "../App";
import { ApolloProvider } from "@apollo/client";
import { server } from "../mocks/server";
describe("Test app component", () => {
  beforeAll(() => {
    process.env.NODE_ENV = "test";
    server.listen({
      onUnhandledRequest: "warn",
    });
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("renders App component", async () => {
    render(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    );
    const text = await screen.findByText("facebook/react");
    expect(text).toBeTruthy();
  });
});
