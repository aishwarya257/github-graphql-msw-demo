import { ApolloProvider } from "@apollo/client";
import { render, screen } from "@testing-library/react";
import { client } from "../ApolloClient";
import { Repository } from "../Repository";

describe("Repository component", () => {
  it("renders Repository component", async () => {
    const props = {
      nameWithOwner: "facebook/react",
      forkCount: 33018,
      description:
        "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
      stargazerCount: 164614,
      id: "MDEwOlJlcG9zaXRvcnkxMDI3MDI1MA==",
    };
    render(
      <ApolloProvider client={client}>
        <Repository {...props} />
      </ApolloProvider>
    );
    const reactRepo = await screen.findByText("facebook/react");
    expect(reactRepo).toBeTruthy();
    const mswRepo = await screen.queryByText("mswjs/msw");
    expect(mswRepo).toBeFalsy();
  });
});
