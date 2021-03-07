import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { client } from "../ApolloClient";
import App from "../App";
import { ApolloProvider } from "@apollo/client";
import { setupServer } from "../test-utils/serverSetup";

const setup = () => {
  render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

describe("App component", () => {
  setupServer();
  it("renders App component", async () => {
    setup();
    const text = await screen.findByText("facebook/react");
    expect(text).toBeTruthy();
  });

  it("adds and removes star", async () => {
    setup();
    const addStarButton = await screen.findByRole("button", {
      name: "Add Star",
    });
    await waitFor(() => userEvent.click(addStarButton));
    const removeStarButton = await screen.findByRole("button", {
      name: "Remove Star",
    });
    expect(removeStarButton).toBeTruthy();
    const noOfStars = await screen.queryByText("164615");
    expect(noOfStars).toBeTruthy();
    await waitFor(() => userEvent.click(removeStarButton));
    const addStarButton1 = await screen.findByRole("button", {
      name: "Add Star",
    });
    expect(addStarButton1).toBeTruthy();
    const noOfStars1 = await screen.queryByText("164614");
    expect(noOfStars1).toBeTruthy();
  });
});
