import { graphql } from "msw";

const github = graphql.link("https://api.github.com/graphql");

export const handlers = [
  github.query("Repository", (req, res, ctx) => {
    const { repository, owner } = req.variables;
    if (repository === "msw" && owner === "mswjs") {
      return res(
        ctx.data({
          repository: {
            nameWithOwner: "mswjs/msw",
            forkCount: 132,
            description:
              "Seamless REST/GraphQL API mocking library for browser and Node.js.",
            stargazerCount: 5124,
            id: "MDEwOlJlcG9zaXRvcnkxNTczOTc1ODM",
          },
        })
      );
    } else if (repository === "react" && owner === "facebook") {
      return res(
        ctx.data({
          repository: {
            nameWithOwner: "facebook/react",
            forkCount: 33018,
            description:
              "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
            stargazerCount: 164614,
            id: "MDEwOlJlcG9zaXRvcnkxMDI3MDI1MA==",
          },
        })
      );
    }

    return res(
      ctx.data({
        repository: {
          nameWithOwner: "Not available",
          forkCount: 0,
          description: "Not available",
          stargazerCount: 0,
          id: 0,
        },
      })
    );
  }),
  github.mutation("AddStar", (req, res, ctx) => {
    return res(
      ctx.data({
        addStar: {
          id: req.variables.input.starrableId,
          starrable: {
            stargazerCount:
              req.variables.input.starrableId ===
              "MDEwOlJlcG9zaXRvcnkxNTczOTc1ODM"
                ? 5125
                : 164615,
          },
        },
      })
    );
  }),
  github.mutation("RemoveStar", (req, res, ctx) => {
    return res(
      ctx.data({
        removeStar: {
          id: req.variables.input.starrableId,
          starrable: {
            stargazerCount:
              req.variables.input.starrableId ===
              "MDEwOlJlcG9zaXRvcnkxNTczOTc1ODM"
                ? 5124
                : 164614,
          },
        },
      })
    );
  }),
];
